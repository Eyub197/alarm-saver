import Bun from "bun";
import config from "./utils";
import path from "node:path";
import process from "node:process";
import { authenticate } from "@google-cloud/local-auth";
import { getWakeUpTime, getBedTime } from "./utils";
import { google } from "googleapis";
import type { calendar_v3 } from "googleapis";
import type { OAuth2Client } from "googleapis-common";

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function getAuthToken(): Promise<OAuth2Client> {
	const credentails = await Bun.file("credentials.json").json();
	const clientId = credentails.installed.client_id;
	const clinetSecret = credentails.installed.client_secret;

	if (!(await Bun.file("token.json").exists())) {
		const auth = await authenticate({
			scopes: SCOPES,
			keyfilePath: CREDENTIALS_PATH,
		});

		const savedAuth = {
			refresh_token: auth.credentials.refresh_token,
			client_id: clientId,
			client_secret: clinetSecret,
			type: "authorized_user",
		};

		await Bun.write("token.json", JSON.stringify(savedAuth));
		return auth;
	}

	return google.auth.fromJSON(
		await Bun.file("token.json").json(),
	) as OAuth2Client;
}

export async function getEvents(): Promise<
	calendar_v3.Schema$Event[] | undefined
> {
	const calendar = google.calendar({
		version: "v3",
		auth: await getAuthToken(),
	});

	const result = await calendar.events.list({
		calendarId: config.CALENDAR_ID,
		timeMin: getWakeUpTime().toISOString(),
		timeMax: getBedTime().toISOString(),
		maxResults: 5,
		singleEvents: true,
		orderBy: "startTime",
	});

	return result.data.items;
}

export function getEventsEndTime(events: calendar_v3.Schema$Event[]): string[] {
	if (!events) throw new Error("No events found");

	return events
		.map((event) => event.end?.dateTime)
		.filter((time): time is string => time !== null && time !== undefined);
}

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

async function getEvents(): Promise<calendar_v3.Schema$Event[] | undefined> {
	const auth : OAuth2Client = await authenticate({
		scopes: SCOPES,
		keyfilePath: CREDENTIALS_PATH,
	});

	const calendar = google.calendar({
		version: "v3",
		auth,
	});

	const result = await calendar.events.list({
		calendarId: config.CALENDAR_ID,
		timeMin: getWakeUpTime().toISOString(),
		timeMax: getBedTime().toISOString(),
		maxResults: 5,
		singleEvents: true,
		orderBy: "startTime",
	})

	return result.data.items;
}

async function getEventsEndTime(events: calendar_v3.Schema$Event[]) : Promise<string[] | Error>{
  if (!events) throw new Error("No events found")
  return events.map((event) => event.end?.dateTime).filter((time): time is string => time !== null);
}

async function sendAlarm(): Promise<void> {
	await Bun.$`notify-send -t 5000 'Hello alarm' 'this is an alarm'`;
	await Bun.$`paplay /usr/share/sounds/freedesktop/stereo/alarm-clock-elapsed.oga`;
}

async function scheduleAlarm(): Promise<void> {
	const events = await getEvents();
	const deepWorkEndTime = await getEventsEndTime(events)

	deepWorkEndTime.forEach((deepWorkEndTime) => {
		const endTime = new Date(deepWorkEndTime).getTime();
		const delta = endTime - new Date().getTime();
		setTimeout(sendAlarm, delta)
	});
}

scheduleAlarm();

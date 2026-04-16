import path from "node:path";
import process from "node:process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import Bun from "bun";
import type { LocalAuthOptions } from "./types";

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function listEvents() {
	const fileCredentials = await JSON.parse(await Bun.file("token.json").text());
	let auth;

	if (!fileCredentials) {
		auth = await authenticate({
			scopes: SCOPES,
			keyfilePath: CREDENTIALS_PATH,
		});

		await Bun.write("token.json", JSON.stringify(auth.credentials));
	}

	const calendar = google.calendar({
		version: "v3",
		auth: fileCredentials ? fileCredentials : auth,
	});

	console.log(calendar);

	// const result = await calendar.events.list({
	// 	calendarId:
	// 		"2497bce39c7c25d7218a6581db5675320dd07e3b0658f2502e609a4ca05df18c@group.calendar.google.com",
	// 	timeMax: new Date().toISOString(),
	// 	maxResults: 20,
	// 	singleEvents: false,
	// 	orderBy: "startTime",
	// });

	// const events = result.data.items;k
	// console.log(events);
}

listEvents();

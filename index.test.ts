import { expect, test, describe } from "bun:test";
import { calendars } from "./utils";
import { manageCalendarId } from "./utils";

describe("calendar maneger function", () => {
	test("Correcet friday and saturday calendar choice", () => {
		expect(manageCalendarId(5)).toBe(
			calendars.FIRDAY_AND_SATURDAY_CALENDAR_ID,
		);
	});

	test("Correct uni days calendar choice", () => {
		expect(manageCalendarId(1)).toBe(
			calendars.MONDAY_TO_THURSDAY_CALENDAR_ID,
		);
	});
});

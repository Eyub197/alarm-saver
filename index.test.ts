import { expect, test, describe } from "bun:test";
import { manageCalendarId } from "./utils";
import { calendars } from "./utils";
import type { calendar_v3 } from "googleapis";
import { getEventsEndTime } from "./calendarManger";

describe("calendar maneger function", () => {
	test("Correcet friday and saturday calendar choice", () => {
		expect(manageCalendarId(5)).toBe(calendars.FIRDAY_AND_SATURDAY_CALENDAR_ID);
	});

	test("Correct uni days calendar choice", () => {
		expect(manageCalendarId(1)).toBe(calendars.MONDAY_TO_THURSDAY_CALENDAR_ID);
	});
});

describe("Event end time function", () => {
  test("gets the correct end times of the working blocks", () => {
    const events = [
      {
        end: {
          dateTime: "2026-04-20T10:30:00+03:00",
        }
      }
    ]
    expect(getEventsEndTime(events)).toEqual(["2026-04-20T10:30:00+03:00"]);
  })

  test("logs a message for empty array (no events)", ()=> {
    const events: calendar_v3.Schema$Event[] = [];
    expect(getEventsEndTime(events)).toBe(undefined)
  })

})


// {
//     kind: "calendar#event",
//     etag: "\"3552804206917662\"",
//     id: "3lkkkh3evnasem0k3dfmfuq9ip_20260420T043000Z",
//     status: "confirmed",
//     htmlLink: "https://www.google.com/calendar/event?eid=M2xra2toM2V2bmFzZW0wazNkZm1mdXE5aXBfMjAyNjA0MjBUMDQzMDAwWiAyNDk3YmNlMzljN2MyNWQ3MjE4YTY1ODFkYjU2NzUzMjBkZDA3ZTNiMDY1OGYyNTAyZTYwOWE0Y2EwNWRmMThjQGc",
//     created: "2026-02-10T13:16:04.000Z",
//     updated: "2026-04-17T05:01:43.458Z",
//     summary: "Deep Work",
//     creator: {
//       email: "eyubmehmed122@gmail.com",
//     },
//     organizer: {
//       email: "2497bce39c7c25d7218a6581db5675320dd07e3b0658f2502e609a4ca05df18c@group.calendar.google.com",
//       displayName: "Deep Work",
//       self: true,
//     },
//     start: {
//       dateTime: "2026-04-20T07:30:00+03:00",
//       timeZone: "Europe/Sofia",
//     },
//     end: {
//       dateTime: "2026-04-20T10:30:00+03:00",
//       timeZone: "Europe/Sofia",
//     },
//     recurringEventId: "3lkkkh3evnasem0k3dfmfuq9ip_R20260413T043000",
//     originalStartTime: {
//       dateTime: "2026-04-20T07:30:00+03:00",
//       timeZone: "Europe/Sofia",
//     },
//     iCalUID: "3lkkkh3evnasem0k3dfmfuq9ip_R20260413T043000@google.com",
//     sequence: 1,
//     reminders: {
//       useDefault: false,
//     },
//     eventType: "default",
//   }

export const calendars = {
	FIRDAY_AND_SATURDAY_CALENDAR_ID:
		"ccfcc92917f41b1ebb15adebeaae505aa22e7b1deef965818c93becb420f209e@group.calendar.google.com",
	MONDAY_TO_THURSDAY_CALENDAR_ID:
		"2497bce39c7c25d7218a6581db5675320dd07e3b0658f2502e609a4ca05df18c@group.calendar.google.com",
};

const config = {
	WAKE_UP_TIME: 7,
	BEDTIME: 23,
	CALENDAR_ID: manageCalendarId(new Date().getDay()),
};

export function getWakeUpTime() {
	const now = new Date();
	const timeMin = new Date(now.setHours(config.WAKE_UP_TIME, 0, 0, 0));
	return timeMin;
}

export function getBedTime() {
	const now = new Date();
	const timeMax = new Date(now.setHours(config.BEDTIME, 0, 0, 0));
	return timeMax;
}

export function manageCalendarId(day: number): string {
	if (day === 5 || day === 6) {
		return calendars.FIRDAY_AND_SATURDAY_CALENDAR_ID;
	}

	return calendars.MONDAY_TO_THURSDAY_CALENDAR_ID;
}

export default config;

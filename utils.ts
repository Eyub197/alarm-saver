const config = {
	CALENDAR_ID: manageCalendarId(),
	WAKE_UP_TIME: 7,
	BEDTIME: 23,
};

export function manageCalendarId() {
	const frindayAndSatrudayCalendarId =
		"ccfcc92917f41b1ebb15adebeaae505aa22e7b1deef965818c93becb420f209e@group.calendar.google.com";
	const mondayToThursadyCalendarId =
		"2497bce39c7c25d7218a6581db5675320dd07e3b0658f2502e609a4ca05df18c@group.calendar.google.com";

	const day = new Date().getDay();

	if (day === 5 || day === 6) {
		return frindayAndSatrudayCalendarId;
	}

	return mondayToThursadyCalendarId;
}

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

export default config;

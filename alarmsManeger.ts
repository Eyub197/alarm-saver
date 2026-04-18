import { getEvents, getEventsEndTime } from "./calendarManger";

const alarms: ReturnType<typeof setTimeout>[] = [];

async function sendAlarm(): Promise<void> {
	await Bun.$`notify-send -t 5000 'end' 'get ready for your next activity'`;
	await Bun.$`paplay /usr/share/sounds/freedesktop/stereo/alarm-clock-elapsed.oga`;
}

async function scheduleAlarm(): Promise<void> {
	alarms.forEach((alarm) => {
		clearTimeout(alarm);
	});

	alarms.length = 0;
	const events = await getEvents();
	if (!events) return;

	const deepWorkEndTimes = getEventsEndTime(events);
	if (deepWorkEndTimes instanceof Error) return;

	deepWorkEndTimes.forEach((deepWorkEndTime) => {
		const endTime = new Date(deepWorkEndTime).getTime();
		const delta = endTime - Date.now();

		if (delta < 0) return;
		alarms.push(setTimeout(sendAlarm, delta));
	});
}

export default scheduleAlarm;

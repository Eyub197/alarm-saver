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

	if (!events) {
		console.log("There are no events for this date");
		return;
	}

	console.log("Your alarms for today: ");
	const deepWorkEndTimes = getEventsEndTime(events);
	if (deepWorkEndTimes === undefined) return;

	deepWorkEndTimes.forEach((deepWorkEndTime, index) => {
		const endTime = new Date(deepWorkEndTime).getTime();
		const delta = endTime - Date.now();
		console.log(
			`alarm ${index + 1} at ${new Date(deepWorkEndTime).toLocaleTimeString(undefined, { hour12: false })}`,
		);

		if (delta < 0) return;
		alarms.push(
			setTimeout(async () => {
				try {
					await sendAlarm();
				} catch (error) {
					console.error(error);
				}
			}, delta),
		);
	});
}

export default scheduleAlarm;

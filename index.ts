import scheduleAlarm from "./alarmsManeger";

try {
	await scheduleAlarm();
	setInterval(scheduleAlarm, 60000);
} catch (error) {
	console.error(error);
}

export const boot: EPR = async (info, data, send) => {
	console.log('pcb24.boot')
	console.log(JSON.stringify($(info)))
	console.log(JSON.stringify($(data)))
	console.log('')
	send.success()
};
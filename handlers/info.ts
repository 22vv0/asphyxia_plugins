export const common: EPR = async (info, data, send) => {
	console.log('info24.common')
    console.log(JSON.stringify($(info)))
    console.log(JSON.stringify($(data)))
    console.log('')
    send.success()
};
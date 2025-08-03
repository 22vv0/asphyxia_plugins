export const getList: EPR = async (info, data, send) => {
	console.log('lobby.getList')
    console.log(JSON.stringify($(info)))
    console.log(JSON.stringify($(data)))
    console.log('')
    send.success()
};
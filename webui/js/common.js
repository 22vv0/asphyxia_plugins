let flareMatrix = {
	"1": [145, 153, 162, 171, 179, 188, 197, 205, 214, 223, 232],
	"2": [155, 164, 182, 192, 201, 210, 220, 220, 229, 238, 248],
	"3": [170, 180, 190, 200, 210, 221, 231, 241, 251, 261, 272],
	"4": [185, 196, 207, 218, 229, 240, 251, 262, 273, 284, 296],
	"5": [205, 217, 229, 241, 254, 266, 278, 291, 303, 315, 328],
	"6": [230, 243, 257, 271, 285, 299, 312, 326, 340, 354, 368],
	"7": [255, 270, 285, 300, 316, 331, 346, 362, 377, 392, 408],
	"8": [290, 307, 324, 342, 359, 377, 394, 411, 429, 446, 464],
	"9": [335, 355, 375, 395, 415, 435, 455, 475, 495, 515, 536],
	"10": [400, 424, 448, 472, 496, 520, 544, 568, 592, 616, 640],
	"11": [465, 492, 520, 548, 576, 604, 632, 660, 688, 716, 744],
	"12": [510, 540, 571, 601, 632, 663, 693, 724, 754, 785, 816],
	"13": [545, 577, 610, 643, 675, 708, 741, 773, 806, 839, 872],
	"14": [575, 609, 644, 678, 713, 747, 782, 816, 851, 885, 920],
	"15": [600, 636, 672, 708, 744, 780, 816, 852, 888, 924, 960],
	"16": [620, 657, 694, 731, 768, 806, 843, 880, 917, 954, 992],
	"17": [635, 673, 711, 749, 787, 825, 863, 901, 939, 977, 1016],
	"18": [650, 689, 728, 767, 806, 845, 884, 923, 962, 1001, 1040],
	"19": [665, 704, 744, 784, 824, 864, 904, 944, 984, 1024, 1064]
}
let flareSkill = [
	["NONE", 0, 500, 1000, 1500],
	["MERCURY", 2000, 3000, 4000, 5000],
	["VENUS", 6000, 7000, 8000, 9000],
	["EARTH", 10000, 11500, 13000, 14500],
	["MARS", 16000, 18000, 20000, 22000],
	["JUPITER", 24000, 26500, 29000, 31500],
	["SATURN", 34000, 36750, 39500, 42250],
	["URANUS", 45000, 48750, 52500, 56250],
	["NEPTUNE", 60000, 63750, 67500, 71250],
	["SUN", 75000, 78750, 82500, 86250],
	["WORLD", 90000]
]
let area = ["Unknown", "Hokkaido", "Aomori", "Iwate", "Miyagi", "Akita", "Yamagata", "Fukushima", "Ibaraki", "Tochigi", "Gunma", "Saitama", "Chiba", "Tokyo", "Kanagawa", "Niigata", "Toyama", "Ishikawa", "Fukui", "Yamanashi", 
	"Nagano", "Gifu", "Shizuoka", "Aichi", "Mie", "Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama", "Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi", "Tokushima", "Kagawa", "Ehime", "Kochi", "Fukuoka", "Saga", 
	"Nagasaki", "Kumamoto", "Oita", "Miyazaki", "Kagoshima", "Okinawa", "Hong Kong", "Korea", "Taiwan", "USA", "Europe", "Overseas", "Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "Delaware", 
	"Florida", "Georgia", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "Nebraska", 
	"North Carolina", "North Dakota", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", 
	"Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming", "Washington D.C.", "Japan", "Canada", "Singapore", "Thailand", "Australia", "New Zealand", "UK", "Italy", "Spain", "Germany", "France", "Portugal", "Indonesia", 
	"Philippines"
]

async function getFlareInfo(scores) {
	let flareData = {}
	let mdbData = []

	let flareTopScores = {'sg': [], 'db': []}
	let totalSgFlare = 0
	let totalDbFlare = 0

	let classicSgTop30 = []
	let classicSgFlare = 0
	let classicDbTop30 = []
	let classicDbFlare = 0

	let whiteSgTop30 = []
	let whiteSgFlare = 0
	let whiteDbTop30 = []
	let whiteDbFlare = 0

	let goldSgTop30 = []
	let goldSgFlare = 0
	let goldDbTop30 = []
	let goldDbFlare = 0

	await emit('getMDB', {}).then(
		function(response) {
			mdbData = response.data.mdb
		}
	)
	if(mdbData !== undefined) {
		scores.forEach(score => {
			let songIndex = mdbData.findIndex(m => m.mcode === score.songId)
			if(songIndex > -1 && score.songId != 38707 && score.flareForce >= 0) {
				if(score.style === 0) {
					flareTopScores.sg.push({
						flare: flareMatrix[mdbData[songIndex]['diffLv'][score.difficulty]][score.flareForce],
						title: mdbData[songIndex]['title'],
						difficulty: mdbData[songIndex]['diffLv'][score.difficulty],
						series: mdbData[songIndex]['series']
					})
				} else {
					flareTopScores.db.push({
						flare: flareMatrix[mdbData[songIndex]['diffLv'][score.difficulty]][score.flareForce],
						title: mdbData[songIndex]['title'],
						difficulty: mdbData[songIndex]['diffLv'][score.difficulty + 5],
						series: mdbData[songIndex]['series']
					})
				}
			}
		})

		flareData.classicSgTop30 = flareTopScores.sg.filter(ft => ft.series <= 13).sort((a, b) => b.flare - a.flare)
		if(flareData.classicSgTop30.length > 30) flareData.classicSgTop30.slice(0, 30)
		flareData.classicSgFlare = flareData.classicSgTop30.reduce((n, {flare}) => n + flare, 0)

		flareData.whiteSgTop30 = flareTopScores.sg.filter(ft => ft.series >= 14 && ft.series <= 17).sort((a, b) => b.flare - a.flare)
		if(flareData.whiteSgTop30.length > 30) flareData.whiteSgTop30.slice(0, 30)
		flareData.whiteSgFlare = flareData.whiteSgTop30.reduce((n, {flare}) => n + flare, 0)

		flareData.goldSgTop30 = flareTopScores.sg.filter(ft => ft.series >= 18).sort((a, b) => b.flare - a.flare)
		if(flareData.goldSgTop30.length > 30) flareData.goldSgTop30.slice(0, 30)
		flareData.goldSgFlare = flareData.goldSgTop30.reduce((n, {flare}) => n + flare, 0)

		flareData.totalSgFlare = flareData.classicSgTop30.concat(flareData.whiteSgTop30, flareData.goldSgTop30).reduce((n, {flare}) => n + flare, 0)


		flareData.classicDbTop30 = flareTopScores.db.filter(ft => ft.series <= 13).sort((a, b) => b.flare - a.flare)
		if(flareData.classicDbTop30.length > 30) flareData.classicDbTop30.slice(0, 30)
		flareData.classicDbFlare = flareData.classicDbTop30.reduce((n, {flare}) => n + flare, 0)

		flareData.whiteDbTop30 = flareTopScores.db.filter(ft => ft.series >= 14 && ft.series <= 17).sort((a, b) => b.flare - a.flare)
		if(flareData.whiteDbTop30.length > 30) flareData.whiteDbTop30.slice(0, 30)
		flareData.whiteDbFlare = flareData.whiteDbTop30.reduce((n, {flare}) => n + flare, 0)

		flareData.goldDbTop30 = flareTopScores.db.filter(ft => ft.series >= 18).sort((a, b) => b.flare - a.flare)
		if(flareData.goldDbTop30.length > 30) flareData.goldDbTop30.slice(0, 30)
		flareData.goldDbFlare = flareData.goldDbTop30.reduce((n, {flare}) => n + flare, 0)

		flareData.totalDbFlare = flareData.classicDbTop30.concat(flareData.whiteDbTop30, flareData.goldDbTop30).reduce((n, {flare}) => n + flare, 0)

		return flareData
	}
}
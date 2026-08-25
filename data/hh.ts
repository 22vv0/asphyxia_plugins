import { POLICY_BREAK3, SERIAL3 } from "./gw"

export const POLICY_BREAK4 = POLICY_BREAK3.concat([
	{id: 24, titleJ: '', titleE: '', tgt: 6, rwrd: {type: 0, id: 1021, param: 23, point: 24000}, start: BigInt(Date.parse('17 Feb 2017 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 25, titleJ: '', titleE: '', tgt: 1, rwrd: {type: 0, id: 1052, param: 23, point: 24000}, start: BigInt(Date.parse('3 Mar 2017 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 26, titleJ: '', titleE: '', tgt: 2, rwrd: {type: 0, id: 1053, param: 23, point: 24000}, start: BigInt(Date.parse('9 Mar 2017 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 27, titleJ: '', titleE: '', tgt: 2, rwrd: {type: 0, id: 1055, param: 23, point: 24000}, start: BigInt(Date.parse('17 Mar 2017 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 28, titleJ: '', titleE: '', tgt: 3, rwrd: {type: 0, id: 1051, param: 23, point: 24000}, start: BigInt(Date.parse('26 Apr 2017 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 29, titleJ: '', titleE: '', tgt: 3, rwrd: {type: 0, id: 1098, param: 23, point: 24000}, start: BigInt(Date.parse('16 Aug 2017 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 30, titleJ: '', titleE: '', tgt: 1, rwrd: {type: 0, id: 1121, param: 23, point: 24000}, start: BigInt(Date.parse('07 Sep 2017 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 31, titleJ: '', titleE: '', tgt: 2, rwrd: {type: 0, id: 1151, param: 23, point: 24000}, start: BigInt(Date.parse('9 Jan 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 32, titleJ: '', titleE: '', tgt: 2, rwrd: {type: 0, id: 1152, param: 23, point: 24000}, start: BigInt(Date.parse('9 Jan 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 33, titleJ: '', titleE: '', tgt: 1, rwrd: {type: 0, id: 1224, param: 23, point: 24000}, start: BigInt(Date.parse('26 Apr 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 34, titleJ: '', titleE: '', tgt: 1, rwrd: {type: 0, id: 1225, param: 23, point: 24000}, start: BigInt(Date.parse('26 Apr 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 35, titleJ: '', titleE: '', tgt: 5, rwrd: {type: 0, id: 1260, param: 23, point: 24000}, start: BigInt(Date.parse('15 Jun 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 36, titleJ: '', titleE: '', tgt: 5, rwrd: {type: 0, id: 1261, param: 23, point: 24000}, start: BigInt(Date.parse('15 Jun 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 37, titleJ: '', titleE: '', tgt: 1, rwrd: {type: 0, id: 1331, param: 23, point: 24000}, start: BigInt(Date.parse('15 Nov 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 38, titleJ: '', titleE: '', tgt: 1, rwrd: {type: 0, id: 1332, param: 23, point: 24000}, start: BigInt(Date.parse('15 Nov 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 39, titleJ: '', titleE: '', tgt: 1, rwrd: {type: 0, id: 1333, param: 23, point: 24000}, start: BigInt(Date.parse('15 Nov 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 40, titleJ: '', titleE: '', tgt: 2, rwrd: {type: 0, id: 1336, param: 23, point: 24000}, start: BigInt(Date.parse('13 Dec 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 41, titleJ: '', titleE: '', tgt: 8, rwrd: {type: 0, id: 1335, param: 23, point: 24000}, start: BigInt(Date.parse('20 Dec 2018 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))},
	{id: 42, titleJ: '', titleE: '', tgt: 5, rwrd: {type: 0, id: 1349, param: 23, point: 24000}, start: BigInt(Date.parse('13 Feb 2019 00:00:00 GMT')), end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT'))}
])

export const FLAGS4 = [
	"SERIALCODE_JAPAN",
	"SERIALCODE_KOREA",
	"SERIALCODE_ASIA",
	"ACHIEVEMENT_ENABLE",
	"VOLFORCE_ENABLE",
	"EXTRACK_ENABLE",
	"OMEGA_ENABLE",
	"OMEGA_02_ENABLE",
	"OMEGA_03_ENABLE",
	"OMEGA_04_ENABLE",
	"OMEGA_05_ENABLE",
	"OMEGA_06_ENABLE",
	"OMEGA_ARS_ENABLE",
	"CONTINUATION",
	"REITAISAI2018",
	"FAVORITE_MUSIC_MAX\t100",
	"FAVORITE_APPEALCARD_MAX\t100",
	"DISABLE_MONITOR_ID_CHECK",
	"MATCHING_MODE",
	"MATCHING_MODE_FREE_IP",
	"LEVEL_LIMIT_EASING",
	"EVENT_IDS_SERIALCODE_TOHO_02",
	"CLOUD_LINK_ENABLE",
	'STANDARD_UNLOCK_ENABLE'
]

export const INFORMATION4 = [
	{ id: 1, version: 20190206, start: 0, str: '[img:ver04/info_psd.ifs:present_info_02]'},
	{ id: 2, version: 20190206, start: 0, str: '[img:ver04/info_psd.ifs:nemesys_entry_model]'},
	{ id: 3, version: 20190206, start: 0, str: '[img:ver04/info_psd.ifs:voltefactory2018]'},
	{ id: 4, version: 20190206, start: 0, str: '[img:ver04/info_psd.ifs:7thkac_omega3]'},
	{ id: 5, version: 20190206, start: 0, str: '[img:ver04/info_psd.ifs:8thkac_omega1]'} 
]

// reserving stamp sheet ids 251 - 2xx for HH
export const UNLOCK_EVENTS4 = {
	refillStamps: {
		'252': 5,
		'266': 5
	},
	hhchristmas2016: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 251,
						stps: 5,
						stprwrd: '1:b:100 2:p:200 3:b:300 4:p:400 5:a:3504'
				}
			]
		}
	},
	hhwinterbreak2016: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 252,
						stmpdaily: 10,
						stps: 5,
						stprwrd: '1:b:300 2:p:100 3:b:100 4:p:100 5:b:1000 5:p:1000'
				}
			]
		}
	},
	hhnewyear2017: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 253,
						stps: 1,
						stprwrd: '1:a:3505'
				}
			]
		}
	},
	hhanniv5th: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 254,
						stps: 5,
						stprwrd: '1:p:50 1:a:212 2:b:50 2:a:1544 3:p:500 3:a:2512 4:b:500 4:a:2576 5:a:3506'
				}
			]
		}
	},
	hhcoconatsu: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 255,
						stmpdaily: 1,
						stps: 5,
						stprwrd: '1:p:55 1:b:72 2:p:72 2:b:55 3:p:557 3:b:557 4:p:721 4:b:721 5:p:5572 5:b:5572'
				}
			]
		}
	},
	hhtouhou1: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 256,
						stmpdaily: 1,
						stps: 10,
						stprwrd: '1:a:1511 2:a:1556 3:c:25 4:a:1557 5:c:26 6:a:1558 7:c:27 8:a:1559 9:a:1560 10:c:24'
				}
			]
		}
	},
	hhtouhou2: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 257,
						stps: 30,
						stprwrd: '5:c:73 10:c:74 15:c:77 20:c:75 25:c:76 30:c:72 req:genre:4'
				}
			]
		}
	},
	hhmidsummer: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 258,
						stps: 30,
						stprwrd: '1:a:209 1:p:100 2:b:100 3:p:200 4:b:200 5:p:1000 6:a:210 6:b:100 7:p:100 8:b:200 9:p:200 10:b:1000 11:a:208 11:p:100 12:b:100 13:p:200 14:b:200 15:c:8 16:a:2613 17:b:100 18:p:200 19:b:200 20:p:2000 21:a:2614 21:b:100 22:p:100 23:b:200 24:p:200 25:b:2000 26:a:2615 26:p:100 27:b:100 28:p:200 29:b:200 30:c:52'
				}
			]
		}
	},
	hhlovefest: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 259,
						stmpdaily: 1,
						stps: 30,
						stprwrd: '1:p:100 2:b:100 3:p:200 4:b:200 5:p:1000 5:b:1000 6:p:100 7:b:100 8:p:200 9:b:200 10:p:1000 10:b:1000 11:p:200 12:b:200 13:p:300 14:b:300 15:p:1000 15:b:1000 16:p:200 17:b:200 18:p:300 19:b:300 20:p:1000 20:b:1000 21:p:300 22:b:300 23:p:400 24:b:400 25:p:1000 25:b:1000 26:p:500 27:b:500 28:p:500 29:b:500 30:c:80'
				}
			]
		}
	},
	hhhalloween2017: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 260,
						stmpdaily: 1,
						stps: 25,
						stprwrd: '1:p:100 2:b:100 3:p:200 4:b:200 5:p:1000 5:b:1000 6:p:100 7:b:100 8:p:200 9:b:200 10:p:1000 10:b:1000 11:p:200 12:b:200 13:p:300 14:b:300 15:p:1000 15:b:1000 16:p:200 17:b:200 18:p:300 19:b:300 20:p:1000 20:b:1000 21:p:500 22:b:500 23:p:500 24:b:500 25:c:82'
				}
			]
		}
	},
	hhchristmas2017: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 261,
						stmpdaily: 1,
						stps: 25,
						stprwrd: '1:p:100 2:b:100 3:p:200 4:b:200 5:p:1000 5:b:1000 6:p:100 7:b:100 8:p:200 9:b:200 10:p:1000 10:b:1000 11:p:200 12:b:200 13:p:300 14:b:300 15:p:1000 15:b:1000 16:p:200 17:b:200 18:p:300 19:b:300 20:p:1000 20:b:1000 21:p:500 22:b:500 23:p:500 24:b:500 25:c:83'
				}
			]
		}
	},
	hhchristmas20172: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 262,
						stmpdaily: 1,
						stps: 25,
						stprwrd: '1:p:100 2:b:100 3:p:200 4:b:200 5:p:1000 5:b:1000 6:p:100 7:b:100 8:p:200 9:b:200 10:p:1000 10:b:1000 11:p:100 12:b:100 13:p:200 14:b:200 15:p:1000 15:b:1000 16:p:100 17:b:100 18:p:200 19:b:200 20:p:1000 20:b:1000 21:p:100 22:b:100 23:p:200 24:b:200 25:p:1000 25:b:1000 26:p:100 27:b:100 28:p:200 29:b:200 30:c:29'
				}
			]
		}
	},
	hhnewyear2018: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 263,
						stps: 1,
						stprwrd: '1:a:3568'
				}
			]
		}
	},
	hhbstream1: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 264,
						stps: 20,
						stprwrd: '1:e:115923 3:e:116023 5:e:116123 7:e:116223 10:e:116323 13:e:116423 16:e:116523 20:e:116623'
				}
			]
		}
	},
	hhanniv6th: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 265,
						stps: 60,
						stprwrd: '2:p:390 5:b:390 5:a:212 7:p:390 10:b:390 10:a:1544 12:p:390 15:b:390 15:a:2512 17:p:390 20:b:390 20:a:2576 22:p:390 25:b:390 25:a:3506 27:p:390 30:b:390 30:a:3569 32:p:1009 35:b:1009 37:p:1009 40:b:1009 42:p:1009 45:b:1009 47:p:1009 50:b:1009 52:p:1009 55:b:1009 57:p:1009 57:b:1009 60:p:6666 60:b:6666'
				}
			]
		}
	},
	hhvalentines2018: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 266,
						stps: 5,
						stprwrd: '1:p:500 2:p:500 3:p:500 4:p:500 5:p:1000'
				}
			]
		}
	},
	hhbstream2: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]BisCoスペシャルスタンプ 第二弾！',
			stmpFt: '',
			data: [
				{
						stmpid: 267,
						stps: 25,
						stprwrd: '2:e:116823 4:e:116923 6:e:117023 9:e:117123 12:e:117223 15:e:117323 18:e:117423 21:e:117523 25:e:122123'
				}
			]
		}
	},
	hhtouhou3: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]東方Project スタンプボーナス(復刻)',
			stmpFt: '',
			data: [
				{
						stmpid: 268,
						stps: 30,
						stprwrd: '1:a:1511 2:a:1556 3:c:25 4:a:1557 5:c:26 6:a:1558 7:c:27 8:a:1559 9:a:1560 10:c:24 13:c:73 16:c:74 19:c:77 22:c:75 25:c:76 30:c:72 req:genre:4'
				}
			]
		}
	},
	hhtouhou4: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]東方御朱印スタンプ',
			stmpFt: '',
			data: [
				{
						stmpid: 269,
						stps: 10,
						stprwrd: '1:c:89 3:c:90 5:c:91 7:c:92 10:c:88'
				}
			]
		}
	},
	hhmuseca: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:15][c:BF243E][ol:3][olc:FFFFFF]～MÚSECA地方～',
			stmpFt: '[sz:13][c:395839][ol:3][olc:FFFFFF]YOU CAN HARVEST A CROP BY PLAYING SDVX!![br:5]THE LIFE TO HARVEST A CROP INCREASES[br:5]BY ONE PER DAY.[posx:215][posy:35][sz:13][c:B0404F][ol:3][olc:FFFFFF]TERM: 6/7～7/8',
			data: [
				{
						stmpid: 270,
						stps: 20,
						stprwrd: '2:e:125623 4:p:831 6:e:125523 9:b:831 12:e:125723 15:p:831 18:b:831 20:e:125823'
				}
			]
		}
	},
	hhmidsummer2018: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 271,
						stmpdaily: 5,
						stps: 30,
						stprwrd: '1:a:2551 2:p:100 2:b:100 3:p:200 3:b:200 4:a:2552 5:p:1000 5:b:1000 6:p:300 6:b:300 7:a:2553 8:p:400 8:b:400 9:p:500 9:b:500 10:c:8 11:a:2613 12:p:100 12:b:100 13:p:200 13:b:200 14:a:2614 15:p:1000 15:b:1000 16:p:300 16:b:300 17:a:2615 18:p:400 18:b:400 19:p:500 19:b:500 20:c:52 21:p:500 22:b:500 23:p:500 24:b:500 25:p:1000 25:b:1000 26:p:500 27:b:500 28:p:500 29:b:500 30:c:80'
				}
			]
		}
	},
	hhmidsummer20182: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 272,
						stmpdaily: 1,
						stps: 30,
						stprwrd: '1:a:3589 2:p:100 2:b:100 3:p:100 3:b:100 4:p:100 4:b:100 5:p:1000 5:b:1000 6:p:200 6:b:200 7:p:200 7:b:200 8:p:200 8:b:200 9:p:200 9:b:200 10:a:3590 11:p:100 11:b:100 12:p:100 12:b:100 13:p:100 13:b:100 14:b:200 14:b:200 15:p:2000 15:b:2000 16:p:200 16:b:200 17:p:200 17:b:200 18:p:200 18:b:200 19:p:300 19:b:300 20:p:3591 21:p:100 21:b:100 22:p:100 22:b:100 23:p:100 23:b:100 24:p:200 24:b:200 25:p:3000 25:b:3000 26:p:200 26:b:200 27:p:200 27:b:200 28:p:300 28:b:300 29:p:300 29:b:300 30:c:93'
				}
			]
		}
	},
	hhsummergreetings: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:13][c:52C7DC][ol:3][olc:FFFFFF]BEMANI SUMMER GREETINGS',
			stmpFt: '[sz:13][c:395839][ol:3][olc:FFFFFF]YOU CAN HARVEST A CROP BY PLAYING SDVX!![br:5]THE LIFE TO HARVEST A CROP INCREASES[br:5]BY ONE PER DAY.[posx:190][posy:35][sz:13][c:B0404F][ol:3][olc:FFFFFF]TERM: 8/23～9/30',
			data: [
				{
						stmpid: 273,
						stps: 20,
						stprwrd: '1:e:126623 4:e:126223 7:e:126423 10:e:126823 13:e:126523 16:e:126323 20:e:126723'
				}
			]
		}
	},
	hhacademy: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 274,
						stps: 30,
						stprwrd: '1:e:131723 3:e:131823 5:e:132423 8:e:132023 11:e:132323 14:e:132223 17:e:132123 21:e:132523 25:e:131923 30:e:131623'
				}
			]
		}
	},
	hhchristmas2018: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 275,
						stmpdaily: 1,
						stps: 5,
						stprwrd: '1:b:100 2:p:200 3:b:300 4:p:400 5:a:3592'
				}
			]
		}
	},
	hhnewyear2019: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 276,
						stps: 5,
						stprwrd: '1:b:100 2:p:200 3:b:300 4:p:400 5:a:3593'
				}
			]
		}
	},
	hhanniv7th: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 277,
						stps: 1,
						stprwrd: '1:a:3594'
				}
			]
		}
	},
	hhrasisvw: {
		type: 'main',
		info: {
			id: 0,
			stmpHd: '[sz:20]SPECIAL STAMP BONUS',
			stmpFt: '',
			data: [
				{
						stmpid: 278,
						stps: 15,
						stprwrd: ''
				}
			]
		}
	},
}

export const EVENT_ITEMS4 = {
	pbmedley: ['1058'],
}

export const SERIAL4 = SERIAL3.concat([
	{
		version: 20190206,
		onetime: true,
		code: 4001,
		items: [
			{ type: 1, id: 2616, param: 1 },
			{ type: 1, id: 2617, param: 1 },
			{ type: 1, id: 2618, param: 1 },
			{ type: 1, id: 2619, param: 1 }
		],
		pc: 0, 
		blc: 0, 
		energy: 0
	}
])

export const EXTENDS4 = [
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,21,0,1,0,
			"SDVX IVスタート記念 ★エピソード振り返り★[br:5]ジェネレーター 第一弾",
			"flame_orange",
			"100:781-822",
			"30,30,25,10,4,1",
			"i:illust_sdvx4 p:3130 g:3,10"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,22,0,1,0,
			"SDVX IVスタート記念 ★エピソード振り返り★[br:5]ジェネレーター 第二弾",
			"flame_orange",
			"100:883-886,823-852",
			"30,30,25,10,4,1",
			"i:illust_illust_sdvx4_reigure p:3140 g:3,10"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,23,0,1,0,
			"The6th KAC＆IV着荷記念[br:5]ジェネシスカードコンテスト(第一弾)",
			"flame_orange",
			"100:926-956",
			"30,30,25,10,4,1",
			"i:illust_kac6th_1 p:3150 g:3,10"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,24,0,1,0,
			"ひなビタ♪ジェネレーター 第四弾",
			"flame_orange",
			"100:896-925",
			"30,30,25,10,4,1",
			"i:illust_hinabita_4 p:3160 g:3,10"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,25,0,1,0,
			"ひなビタ♪ジェネレーター 第四弾",
			"flame_orange",
			"100:959-990",
			"30,30,25,10,4,1",
			"i:illust_kac6th_2 p:3170 g:3,10"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,26,0,1,0,
			"ひなビタ♪ジェネレーター 第五弾",
			"flame_orange",
			"100:992-1024",
			"30,30,25,10,4,1",
			"i:illust_hinabita_5 p:3180 g:3,10"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,27,0,1,0,
			"ときめきボルテ学園 バレンタイン[br:5]スペシャル ジェネレーター 2017",
			"flame_orange",
			"100:888-894",
			"30,30,25,10,4,1",
			"i:illust_valentine_2017 p:3190 g:3,10"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,28,0,2,0,
			"SUPER STAR ONLY ONE ジェネレーター",
			"flame_orange",
			"100:599",
			"30,30,25,10,4,1",
			"i:illust_onlyone p:3200 g:0,1000"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,29,0,1,0,
			"ひなビタ♪サマーフェスティバル[br:5]ジェネシスカード",
			"flame_orange",
			"100:1079-1090",
			"30,30,25,10,4,1",
			"i:illust_hinabita_ssh p:3210 g:3,10"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,30,0,2,0,
			"ビートストリーム スペシャルジェネレーター",
			"flame_orange",
			"100:209-218,642-652",
			"30,30,25,10,4,1",
			"i:illust_beast p:3220 g:3,10"
		]
	},
	{
		version: 20190206,
		type: 7,
		id: 1,
		params: [
			0,31,0,1,0,
			"6周年記念ジェネレーター",
			"flame_orange",
			"100:1091-1095",
			"30,30,25,10,4,1",
			"i:illust_6anniversary p:3230 g:3,10"
		]
	}
]

export const COURSES4 = [
	{
	    id: 1,
	    version: 20190206,
	    name: '第1回 Aコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 653, mty: 0, }, 
		        	{ no: 1, mid: 846, mty: 1, }, 
		        	{ no: 2, mid: 23, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 6, mty: 1, }, 
		        	{ no: 1, mid: 222, mty: 1, }, 
		        	{ no: 2, mid: 48, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 775, mty: 1, }, 
		        	{ no: 1, mid: 684, mty: 1, }, 
		        	{ no: 2, mid: 778, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 757, mty: 1, }, 
		        	{ no: 1, mid: 480, mty: 2, }, 
		        	{ no: 2, mid: 758, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 871, mty: 1, },
		        	{ no: 1, mid: 327, mty: 2, }, 
		        	{ no: 2, mid: 66, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 713, mty: 2, },
		        	{ no: 1, mid: 40, mty: 2, },
		        	{ no: 2, mid: 33, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 349, mty: 2, },
		        	{ no: 1, mid: 896, mty: 2, },
		        	{ no: 2, mid: 246, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 690, mty: 2, },
		        	{ no: 1, mid: 380, mty: 2, },
		        	{ no: 2, mid: 492, mty: 3, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 396, mty: 2, },
		        	{ no: 1, mid: 244, mty: 2, },
		        	{ no: 2, mid: 359, mty: 2, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 833, mty: 2, },
		        	{ no: 1, mid: 858, mty: 2, },
		        	{ no: 2, mid: 229, mty: 2, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 2,
	    version: 20190206,
	    name: '第1回 Bコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 60, mty: 0, }, 
		        	{ no: 1, mid: 770, mty: 1, }, 
		        	{ no: 2, mid: 16, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 566, mty: 1, }, 
		        	{ no: 1, mid: 748, mty: 1, }, 
		        	{ no: 2, mid: 19, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 523, mty: 1, }, 
		        	{ no: 1, mid: 921, mty: 1, }, 
		        	{ no: 2, mid: 218, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 467, mty: 1, }, 
		        	{ no: 1, mid: 456, mty: 1, }, 
		        	{ no: 2, mid: 107, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 435, mty: 2, },
		        	{ no: 1, mid: 750, mty: 2, }, 
		        	{ no: 2, mid: 700, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 230, mty: 2, },
		        	{ no: 1, mid: 827, mty: 2, },
		        	{ no: 2, mid: 146, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 210, mty: 2, },
		        	{ no: 1, mid: 558, mty: 2, },
		        	{ no: 2, mid: 368, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 603, mty: 2, },
		        	{ no: 1, mid: 278, mty: 3, },
		        	{ no: 2, mid: 557, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 295, mty: 2, },
		        	{ no: 1, mid: 742, mty: 2, },
		        	{ no: 2, mid: 302, mty: 2, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 333, mty: 2, },
		        	{ no: 1, mid: 871, mty: 2, },
		        	{ no: 2, mid: 259, mty: 2, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 3,
	    version: 20190206,
	    name: '第1回 Cコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 17, mty: 1, }, 
		        	{ no: 1, mid: 922, mty: 0, }, 
		        	{ no: 2, mid: 76, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 22, mty: 1, }, 
		        	{ no: 1, mid: 40, mty: 1, }, 
		        	{ no: 2, mid: 275, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 813, mty: 1, }, 
		        	{ no: 1, mid: 410, mty: 1, }, 
		        	{ no: 2, mid: 53, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 67, mty: 1, }, 
		        	{ no: 1, mid: 544, mty: 1, }, 
		        	{ no: 2, mid: 9, mty: 2, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 318, mty: 2, },
		        	{ no: 1, mid: 157, mty: 2, }, 
		        	{ no: 2, mid: 567, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 239, mty: 2, },
		        	{ no: 1, mid: 375, mty: 2, },
		        	{ no: 2, mid: 94, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 769, mty: 2, },
		        	{ no: 1, mid: 710, mty: 2, },
		        	{ no: 2, mid: 609, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 357, mty: 2, },
		        	{ no: 1, mid: 562, mty: 2, },
		        	{ no: 2, mid: 612, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 322, mty: 2, },
		        	{ no: 1, mid: 759, mty: 2, },
		        	{ no: 2, mid: 607, mty: 2, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 779, mty: 2, },
		        	{ no: 1, mid: 817, mty: 2, },
		        	{ no: 2, mid: 362, mty: 2, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 4,
	    version: 20190206,
	    name: '第2回 Aコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 201, mty: 1, }, 
		        	{ no: 1, mid: 182, mty: 1, }, 
		        	{ no: 2, mid: 766, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 171, mty: 1, }, 
		        	{ no: 1, mid: 950, mty: 1, }, 
		        	{ no: 2, mid: 513, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 90, mty: 1, }, 
		        	{ no: 1, mid: 557, mty: 1, }, 
		        	{ no: 2, mid: 843, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 449, mty: 1, }, 
		        	{ no: 1, mid: 506, mty: 1, }, 
		        	{ no: 2, mid: 962, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 760, mty: 1, },
		        	{ no: 1, mid: 1020, mty: 2, }, 
		        	{ no: 2, mid: 923, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 80, mty: 2, },
		        	{ no: 1, mid: 678, mty: 2, },
		        	{ no: 2, mid: 928, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 967, mty: 2, },
		        	{ no: 1, mid: 711, mty: 2, },
		        	{ no: 2, mid: 594, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 26, mty: 3, },
		        	{ no: 1, mid: 22, mty: 3, },
		        	{ no: 2, mid: 503, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 599, mty: 2, },
		        	{ no: 1, mid: 122, mty: 2, },
		        	{ no: 2, mid: 946, mty: 4, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 961, mty: 4, },
		        	{ no: 1, mid: 967, mty: 4, },
		        	{ no: 2, mid: 993, mty: 4, },
		        ],
		    },
		    {
		        id: 11,
		        type: 1,
		        name: 'Skill LEVEL 11 或帝滅斗',
		        level: 11,
		        nameID: 11,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 941, mty: 4, },
		        	{ no: 1, mid: 718, mty: 2, },
		        	{ no: 2, mid: 816, mty: 2, },
		        ],
		    },
		    {
		        id: 12,
		        type: 5,
		        name: 'Skill LEVEL ∞（12） 暴龍天',
		        level: 12,
		        nameID: 12,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 654, mty: 2, },
		        	{ no: 1, mid: 360, mty: 3, },
		        	{ no: 2, mid: 1028, mty: 4, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 5,
	    version: 20190206,
	    name: '第2回 Bコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 106, mty: 1, }, 
		        	{ no: 1, mid: 568, mty: 1, }, 
		        	{ no: 2, mid: 768, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 185, mty: 1, }, 
		        	{ no: 1, mid: 700, mty: 1, }, 
		        	{ no: 2, mid: 923, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 317, mty: 1, }, 
		        	{ no: 1, mid: 882, mty: 1, }, 
		        	{ no: 2, mid: 531, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 136, mty: 1, }, 
		        	{ no: 1, mid: 534, mty: 1, }, 
		        	{ no: 2, mid: 640, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 65, mty: 2, },
		        	{ no: 1, mid: 966, mty: 2, }, 
		        	{ no: 2, mid: 874, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 856, mty: 2, },
		        	{ no: 1, mid: 488, mty: 2, },
		        	{ no: 2, mid: 968, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 738, mty: 2, },
		        	{ no: 1, mid: 264, mty: 2, },
		        	{ no: 2, mid: 834, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 945, mty: 4, },
		        	{ no: 1, mid: 639, mty: 2, },
		        	{ no: 2, mid: 644, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 394, mty: 2, },
		        	{ no: 1, mid: 228, mty: 2, },
		        	{ no: 2, mid: 124, mty: 2, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 625, mty: 3, },
		        	{ no: 1, mid: 214, mty: 2, },
		        	{ no: 2, mid: 365, mty: 2, },
		        ],
		    },
		    {
		        id: 11,
		        type: 1,
		        name: 'Skill LEVEL 11 或帝滅斗',
		        level: 11,
		        nameID: 11,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 30, mty: 3, },
		        	{ no: 1, mid: 2, mty: 3, },
		        	{ no: 2, mid: 540, mty: 3, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 6,
	    version: 20190206,
	    name: '第3回',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 795, mty: 0, }, 
		        	{ no: 1, mid: 110, mty: 1, }, 
		        	{ no: 2, mid: 51, mty: 2, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 219, mty: 1, }, 
		        	{ no: 1, mid: 528, mty: 1, }, 
		        	{ no: 2, mid: 996, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 161, mty: 1, }, 
		        	{ no: 1, mid: 291, mty: 1, }, 
		        	{ no: 2, mid: 970, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 630, mty: 1, }, 
		        	{ no: 1, mid: 647, mty: 1, }, 
		        	{ no: 2, mid: 785, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 645, mty: 1, },
		        	{ no: 1, mid: 335, mty: 2, }, 
		        	{ no: 2, mid: 961, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 172, mty: 2, },
		        	{ no: 1, mid: 262, mty: 2, },
		        	{ no: 2, mid: 781, mty: 4, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 762, mty: 2, },
		        	{ no: 1, mid: 544, mty: 2, },
		        	{ no: 2, mid: 898, mty: 4, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 521, mty: 2, },
		        	{ no: 1, mid: 572, mty: 2, },
		        	{ no: 2, mid: 173, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 456, mty: 2, },
		        	{ no: 1, mid: 852, mty: 4, },
		        	{ no: 2, mid: 252, mty: 2, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 966, mty: 4, },
		        	{ no: 1, mid: 876, mty: 2, },
		        	{ no: 2, mid: 506, mty: 2, },
		        ],
		    },
		    {
		        id: 11,
		        type: 1,
		        name: 'Skill LEVEL 11 或帝滅斗',
		        level: 11,
		        nameID: 11,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 931, mty: 4, },
		        	{ no: 1, mid: 818, mty: 2, },
		        	{ no: 2, mid: 810, mty: 2, },
		        ],
		    },
		    {
		        id: 12,
		        type: 1,
		        name: 'Skill LEVEL ∞（12）暴龍天',
		        level: 12,
		        nameID: 12,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 709, mty: 3, },
		        	{ no: 1, mid: 374, mty: 3, },
		        	{ no: 2, mid: 1036, mty: 4, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 7,
	    version: 20190206,
	    name: '第4回 Aコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 258, mty: 0, }, 
		        	{ no: 1, mid: 913, mty: 0, }, 
		        	{ no: 2, mid: 189, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 87, mty: 1, }, 
		        	{ no: 1, mid: 486, mty: 1, }, 
		        	{ no: 2, mid: 66, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 674, mty: 1, }, 
		        	{ no: 1, mid: 216, mty: 1, }, 
		        	{ no: 2, mid: 434, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 781, mty: 2, }, 
		        	{ no: 1, mid: 623, mty: 1, }, 
		        	{ no: 2, mid: 540, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 695, mty: 1, },
		        	{ no: 1, mid: 276, mty: 2, }, 
		        	{ no: 2, mid: 870, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 998, mty: 2, },
		        	{ no: 1, mid: 885, mty: 2, },
		        	{ no: 2, mid: 400, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 211, mty: 2, },
		        	{ no: 1, mid: 14, mty: 2, },
		        	{ no: 2, mid: 183, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 659, mty: 2, },
		        	{ no: 1, mid: 749, mty: 2, },
		        	{ no: 2, mid: 251, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 918, mty: 2, },
		        	{ no: 1, mid: 63, mty: 2, },
		        	{ no: 2, mid: 47, mty: 2, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 641, mty: 2, },
		        	{ no: 1, mid: 463, mty: 2, },
		        	{ no: 2, mid: 712, mty: 2, },
		        ],
		    },
		    {
		        id: 11,
		        type: 1,
		        name: 'Skill LEVEL 11 或帝滅斗',
		        level: 11,
		        nameID: 11,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 789, mty: 2, },
		        	{ no: 1, mid: 634, mty: 2, },
		        	{ no: 2, mid: 532, mty: 2, },
		        ],
		    },
		    {
		        id: 12,
		        type: 1,
		        name: 'Skill LEVEL ∞（12）暴龍天',
		        level: 12,
		        nameID: 12,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 551, mty: 2, },
		        	{ no: 1, mid: 1032, mty: 4, },
		        	{ no: 2, mid: 1099, mty: 4, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 8,
	    version: 20190206,
	    name: '第4回 Bコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1025, mty: 0, }, 
		        	{ no: 1, mid: 914, mty: 0, }, 
		        	{ no: 2, mid: 186, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 93, mty: 1, }, 
		        	{ no: 1, mid: 664, mty: 1, }, 
		        	{ no: 2, mid: 3, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 590, mty: 1, }, 
		        	{ no: 1, mid: 898, mty: 1, }, 
		        	{ no: 2, mid: 152, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 104, mty: 1, }, 
		        	{ no: 1, mid: 521, mty: 1, }, 
		        	{ no: 2, mid: 342, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 743, mty: 1, },
		        	{ no: 1, mid: 958, mty: 2, }, 
		        	{ no: 2, mid: 441, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 301, mty: 2, },
		        	{ no: 1, mid: 879, mty: 2, },
		        	{ no: 2, mid: 62, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 666, mty: 2, },
		        	{ no: 1, mid: 54, mty: 2, },
		        	{ no: 2, mid: 763, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 361, mty: 2, },
		        	{ no: 1, mid: 744, mty: 2, },
		        	{ no: 2, mid: 831, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 917, mty: 2, },
		        	{ no: 1, mid: 959, mty: 4, },
		        	{ no: 2, mid: 912, mty: 2, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 390, mty: 2, },
		        	{ no: 1, mid: 655, mty: 2, },
		        	{ no: 2, mid: 707, mty: 2, },
		        ],
		    },
		    {
		        id: 11,
		        type: 1,
		        name: 'Skill LEVEL 11 或帝滅斗',
		        level: 11,
		        nameID: 11,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 808, mty: 2, },
		        	{ no: 1, mid: 965, mty: 4, },
		        	{ no: 2, mid: 909, mty: 3, },
		        ],
		    },
		    {
		        id: 12,
		        type: 1,
		        name: 'Skill LEVEL ∞（12）暴龍天',
		        level: 12,
		        nameID: 12,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 927, mty: 3, },
		        	{ no: 1, mid: 525, mty: 3, },
		        	{ no: 2, mid: 1100, mty: 4, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 9,
	    version: 20190206,
	    name: '第4回 Cコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 600, mty: 0, }, 
		        	{ no: 1, mid: 915, mty: 0, }, 
		        	{ no: 2, mid: 671, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 191, mty: 1, }, 
		        	{ no: 1, mid: 771, mty: 1, }, 
		        	{ no: 2, mid: 8, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 353, mty: 1, }, 
		        	{ no: 1, mid: 896, mty: 1, }, 
		        	{ no: 2, mid: 39, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 485, mty: 1, }, 
		        	{ no: 1, mid: 359, mty: 1, }, 
		        	{ no: 2, mid: 834, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 790, mty: 1, },
		        	{ no: 1, mid: 277, mty: 2, }, 
		        	{ no: 2, mid: 944, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 897, mty: 2, },
		        	{ no: 1, mid: 2, mty: 2, },
		        	{ no: 2, mid: 986, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 145, mty: 2, },
		        	{ no: 1, mid: 99, mty: 2, },
		        	{ no: 2, mid: 90, mty: 3, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 372, mty: 2, },
		        	{ no: 1, mid: 747, mty: 2, },
		        	{ no: 2, mid: 872, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 576, mty: 2, },
		        	{ no: 1, mid: 943, mty: 4, },
		        	{ no: 2, mid: 359, mty: 2, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 922, mty: 2, },
		        	{ no: 1, mid: 166, mty: 2, },
		        	{ no: 2, mid: 670, mty: 2, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 10,
	    version: 20190206,
	    name: '第5回',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1035, mty: 0, }, 
		        	{ no: 1, mid: 1014, mty: 1, }, 
		        	{ no: 2, mid: 1033, mty: 0, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 405, mty: 1, }, 
		        	{ no: 1, mid: 451, mty: 1, }, 
		        	{ no: 2, mid: 173, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1008, mty: 1, }, 
		        	{ no: 1, mid: 608, mty: 1, }, 
		        	{ no: 2, mid: 815, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 966, mty: 1, }, 
		        	{ no: 1, mid: 983, mty: 1, }, 
		        	{ no: 2, mid: 967, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 964, mty: 1, },
		        	{ no: 1, mid: 58, mty: 2, }, 
		        	{ no: 2, mid: 1025, mty: 1, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 898, mty: 2, },
		        	{ no: 1, mid: 962, mty: 2, },
		        	{ no: 2, mid: 1032, mty: 1, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 490, mty: 2, },
		        	{ no: 1, mid: 889, mty: 2, },
		        	{ no: 2, mid: 1042, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 971, mty: 2, },
		        	{ no: 1, mid: 752, mty: 2, },
		        	{ no: 2, mid: 1062, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 497, mty: 2, },
		        	{ no: 1, mid: 948, mty: 4, },
		        	{ no: 2, mid: 954, mty: 4, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1126, mty: 4, },
		        	{ no: 1, mid: 1034, mty: 4, },
		        	{ no: 2, mid: 834, mty: 4, },
		        ],
		    },
		    {
		        id: 11,
		        type: 1,
		        name: 'Skill LEVEL 11 或帝滅斗',
		        level: 11,
		        nameID: 11,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1013, mty: 4, },
		        	{ no: 1, mid: 1035, mty: 4, },
		        	{ no: 2, mid: 1107, mty: 4, },
		        ],
		    },
		    {
		        id: 12,
		        type: 1,
		        name: 'Skill LEVEL ∞（12）暴龍天',
		        level: 12,
		        nameID: 12,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1102, mty: 4, },
		        	{ no: 1, mid: 1148, mty: 4, },
		        	{ no: 2, mid: 1185, mty: 4, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 11,
	    version: 20190206,
	    name: '第6回 Aコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1044, mty: 0, }, 
		        	{ no: 1, mid: 1176, mty: 0, }, 
		        	{ no: 2, mid: 1083, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1074, mty: 1, }, 
		        	{ no: 1, mid: 1095, mty: 1, }, 
		        	{ no: 2, mid: 930, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1086, mty: 1, }, 
		        	{ no: 1, mid: 1122, mty: 1, }, 
		        	{ no: 2, mid: 1026, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1070, mty: 1, }, 
		        	{ no: 1, mid: 1073, mty: 1, }, 
		        	{ no: 2, mid: 1022, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1040, mty: 1, },
		        	{ no: 1, mid: 1200, mty: 1, }, 
		        	{ no: 2, mid: 895, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1115, mty: 2, },
		        	{ no: 1, mid: 1184, mty: 2, },
		        	{ no: 2, mid: 1230, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1156, mty: 2, },
		        	{ no: 1, mid: 1138, mty: 2, },
		        	{ no: 2, mid: 1091, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 336, mty: 2, },
		        	{ no: 1, mid: 1199, mty: 2, },
		        	{ no: 2, mid: 1197, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 841, mty: 2, },
		        	{ no: 1, mid: 1087, mty: 4, },
		        	{ no: 2, mid: 1112, mty: 4, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1217, mty: 4, },
		        	{ no: 1, mid: 1041, mty: 4, },
		        	{ no: 2, mid: 1078, mty: 4, },
		        ],
		    },
		    {
		        id: 11,
		        type: 1,
		        name: 'Skill LEVEL 11 或帝滅斗',
		        level: 11,
		        nameID: 11,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 173, mty: 3, },
		        	{ no: 1, mid: 151, mty: 3, },
		        	{ no: 2, mid: 362, mty: 3, },
		        ],
		    },
		    {
		        id: 12,
		        type: 1,
		        name: 'Skill LEVEL ∞（12）暴龍天',
		        isNew: 1,
		        level: 12,
		        nameID: 12,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 679, mty: 2, },
		        	{ no: 1, mid: 1178, mty: 4, },
		        	{ no: 2, mid: 1270, mty: 4, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 12,
	    version: 20190206,
	    name: '第6回 Bコース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1049, mty: 0, }, 
		        	{ no: 1, mid: 367, mty: 0, }, 
		        	{ no: 2, mid: 1005, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1057, mty: 1, }, 
		        	{ no: 1, mid: 1081, mty: 1, }, 
		        	{ no: 2, mid: 868, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1001, mty: 1, }, 
		        	{ no: 1, mid: 1092, mty: 1, }, 
		        	{ no: 2, mid: 1113, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1075, mty: 1, }, 
		        	{ no: 1, mid: 1123, mty: 1, }, 
		        	{ no: 2, mid: 1029, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1024, mty: 1, },
		        	{ no: 1, mid: 1201, mty: 1, }, 
		        	{ no: 2, mid: 1124, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1154, mty: 2, },
		        	{ no: 1, mid: 1114, mty: 2, },
		        	{ no: 2, mid: 891, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1012, mty: 2, },
		        	{ no: 1, mid: 1248, mty: 2, },
		        	{ no: 2, mid: 926, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 955, mty: 4, },
		        	{ no: 1, mid: 1037, mty: 2, },
		        	{ no: 2, mid: 812, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 761, mty: 2, },
		        	{ no: 1, mid: 765, mty: 4, },
		        	{ no: 2, mid: 1006, mty: 4, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1237, mty: 4, },
		        	{ no: 1, mid: 1157, mty: 4, },
		        	{ no: 2, mid: 907, mty: 2, },
		        ],
		    },
		    {
		        id: 11,
		        type: 1,
		        name: 'Skill LEVEL 11 或帝滅斗',
		        isNew: 1,
		        level: 11,
		        nameID: 11,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1060, mty: 4, },
		        	{ no: 1, mid: 1062, mty: 4, },
		        	{ no: 2, mid: 1222, mty: 4, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 13,
	    version: 20190206,
	    name: '第6回 Cコース',
	    isNew: 1, 
	    courses: [
	    	{
		        id: 1,
		        type: 0,
		        name: 'Skill LEVEL 01 岳翔',
		        level: 1,
		        nameID: 1,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1190, mty: 0, }, 
		        	{ no: 1, mid: 636, mty: 0, }, 
		        	{ no: 2, mid: 1054, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 0,
		        name: 'Skill LEVEL 02 流星',
		        level: 2,
		        nameID: 2,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1076, mty: 1, }, 
		        	{ no: 1, mid: 1002, mty: 1, }, 
		        	{ no: 2, mid: 916, mty: 1, },
		        ],
		    },
		    {
		        id: 3,
		        type: 0,
		        name: 'Skill LEVEL 03 月衝',
		        level: 3,
		        nameID: 3,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1004, mty: 1, }, 
		        	{ no: 1, mid: 1111, mty: 1, }, 
		        	{ no: 2, mid: 1090, mty: 1, },
		        ],
		    },
		    {
		        id: 4,
		        type: 0,
		        name: 'Skill LEVEL 04 瞬光',
		        level: 4,
		        nameID: 4,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1094, mty: 1, }, 
		        	{ no: 1, mid: 1128, mty: 1, }, 
		        	{ no: 2, mid: 1027, mty: 1, },
		        ],
		    },
		    {
		        id: 5,
		        type: 0,
		        name: 'Skill LEVEL 05 天極',
		        level: 5,
		        nameID: 5,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1007, mty: 1, },
		        	{ no: 1, mid: 1220, mty: 1, }, 
		        	{ no: 2, mid: 1067, mty: 2, },
		        ],
		    },
		    {
		        id: 6,
		        type: 0,
		        name: 'Skill LEVEL 06 烈風',
		        level: 6,
		        nameID: 6,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1139, mty: 2, },
		        	{ no: 1, mid: 864, mty: 2, },
		        	{ no: 2, mid: 1010, mty: 2, },
		        ],
		    },
		    {
		        id: 7,
		        type: 0,
		        name: 'Skill LEVEL 07 雷電',
		        level: 7,
		        nameID: 7,
		        assist: 1,
		        tracks: [
		        	{ no: 0, mid: 1134, mty: 2, },
		        	{ no: 1, mid: 919, mty: 2, },
		        	{ no: 2, mid: 1250, mty: 2, },
		        ],
		    },
		    {
		        id: 8,
		        type: 0,
		        name: 'Skill LEVEL 08 麗華',
		        level: 8,
		        nameID: 8,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 596, mty: 2, },
		        	{ no: 1, mid: 902, mty: 2, },
		        	{ no: 2, mid: 844, mty: 2, },
		        ],
		    },
		    {
		        id: 9,
		        type: 0,
		        name: 'Skill LEVEL 09 魔騎士',
		        level: 9,
		        nameID: 9,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 737, mty: 2, },
		        	{ no: 1, mid: 887, mty: 4, },
		        	{ no: 2, mid: 933, mty: 4, },
		        ],
		    },
		    {
		        id: 10,
		        type: 0,
		        name: 'Skill LEVEL 10 剛力羅',
		        level: 10,
		        nameID: 10,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1228, mty: 4, },
		        	{ no: 1, mid: 881, mty: 4, },
		        	{ no: 2, mid: 1135, mty: 4, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 14,
	    version: 20190206,
	    name: 'KAC挑戦コース (The 6th KAC)',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 2,
		        name: 'KAC挑戦コース【体】',
		        level: 0,
		        nameID: 13,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 806, mty: 2, }, 
		        	{ no: 1, mid: 971, mty: 4, }, 
		        	{ no: 2, mid: 913, mty: 3, },
		        ],
		    },
		    {
		        id: 2,
		        type: 2,
		        name: 'KAC挑戦コース【技】',
		        level: 0,
		        nameID: 14,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 758, mty: 2, }, 
		        	{ no: 1, mid: 965, mty: 4, }, 
		        	{ no: 2, mid: 914, mty: 3, },
		        ],
		    },
		    {
		        id: 3,
		        type: 2,
		        name: 'KAC挑戦コース【心】',
		        level: 0,
		        nameID: 15,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 814, mty: 2, }, 
		        	{ no: 1, mid: 964, mty: 4, }, 
		        	{ no: 2, mid: 915, mty: 3, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 15,
	    version: 20190206,
	    name: 'KAC練習コース (The 6th KAC)',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 2,
		        name: 'KAC練習コース【体】',
		        level: 0,
		        nameID: 13,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 806, mty: 1 }, 
		        	{ no: 1, mid: 971, mty: 1 }, 
		        	{ no: 2, mid: 913, mty: 1 },
		        ],
		    },
		    {
		        id: 2,
		        type: 2,
		        name: 'KAC練習コース【技】',
		        level: 0,
		        nameID: 14,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 758, mty: 1 }, 
		        	{ no: 1, mid: 965, mty: 1 }, 
		        	{ no: 2, mid: 914, mty: 1 },
		        ],
		    },
		    {
		        id: 3,
		        type: 2,
		        name: 'KAC練習コース【心】',
		        level: 0,
		        nameID: 15,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 814, mty: 1 }, 
		        	{ no: 1, mid: 964, mty: 1 }, 
		        	{ no: 2, mid: 915, mty: 1 },
		        ],
		    }
	    ]
  	},
  	{
	    id: 16,
	    version: 20190206,
	    name: '第2回天下一コース',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 3,
		        name: '天下一 (梅)',
		        level: 0,
		        nameID: 16,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 625, mty: 0 },
		        	{ no: 1, mid: 697, mty: 0 },
		        	{ no: 2, mid: 708, mty: 0 },
		        ],
		    },
		    {
		        id: 2,
		        type: 3,
		        name: '天下一 (竹)',
		        level: 0,
		        nameID: 16,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 625, mty: 1 },
		        	{ no: 1, mid: 697, mty: 1 },
		        	{ no: 2, mid: 708, mty: 1 },
		        ],
		    },
		    {
		        id: 3,
		        type: 3,
		        name: '天下一 (松)',
		        level: 0,
		        nameID: 16,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 625, mty: 2 },
		        	{ no: 1, mid: 697, mty: 2 },
		        	{ no: 2, mid: 708, mty: 2 },
		        ],
		    }
	    ]
  	},
  	{
	    id: 17,
	    version: 20190206,
	    name: '第3回天下一コース',
	    isNew: 0, 
	    courses: [
		    {
		        id: 1,
		        type: 3,
		        name: '天下一 (梅)',
		        level: 0,
		        nameID: 17,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 362, mty: 0 },
		        	{ no: 1, mid: 360, mty: 0 },
		        	{ no: 2, mid: 927, mty: 0 },
		        ],
		    },
		    {
		        id: 2,
		        type: 3,
		        name: '天下一 (竹)',
		        level: 0,
		        nameID: 17,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 362, mty: 1 },
		        	{ no: 1, mid: 360, mty: 1 },
		        	{ no: 2, mid: 927, mty: 1 },
		        ],
		    },
		    {
		        id: 3,
		        type: 3,
		        name: '天下一 (松)',
		        level: 0,
		        nameID: 17,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 362, mty: 2 },
		        	{ no: 1, mid: 360, mty: 2 },
		        	{ no: 2, mid: 927, mty: 2 },
		        ],
		    }
	    ]
  	},
  	{
	    id: 18,
	    version: 20190206,
	    name: 'BEMANI MASTER KOREA 2017',
	    isNew: 0, 
	    courses: [
		    {
		        id: 1,
		        type: 0,
		        name: 'BEMANI MASTER KOREA 2017',
		        level: 0,
		        nameID: 19,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 954, mty: 4 },
		        	{ no: 1, mid: 960, mty: 4 },
		        	{ no: 2, mid: 961, mty: 4 },
		        ],
		    }
	    ]
  	},
  	{
	    id: 19,
	    version: 20190206,
	    name: 'KACチャレンジコース (The 7th KAC)',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 4,
		        name: 'The 7th KACチャレンジコース【猛虎】',
		        level: 0,
		        nameID: 20,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1149, mty: 4, }, 
		        	{ no: 1, mid: 367, mty: 2, }, 
		        	{ no: 2, mid: 1102, mty: 4, },
		        ],
		    },
		    {
		        id: 2,
		        type: 4,
		        name: 'The 7th KACチャレンジコース【餓狼】',
		        level: 0,
		        nameID: 21,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1042, mty: 4, }, 
		        	{ no: 1, mid: 126, mty: 3, }, 
		        	{ no: 2, mid: 1101, mty: 4, },
		        ],
		    }
	    ]
  	},
  	{
	    id: 20,
	    version: 20190206,
	    name: 'KACエンジョイコース (The 7th KAC)',
	    isNew: 0, 
	    courses: [
	    	{
		        id: 1,
		        type: 4,
		        name: 'The 7th KACエンジョイコース【猛虎】',
		        level: 0,
		        nameID: 20,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1149, mty: 1, }, 
		        	{ no: 1, mid: 367, mty: 1, }, 
		        	{ no: 2, mid: 1102, mty: 1, },
		        ],
		    },
		    {
		        id: 2,
		        type: 4,
		        name: 'The 7th KACエンジョイコース【餓狼】',
		        level: 0,
		        nameID: 21,
		        assist: 0,
		        tracks: [
		        	{ no: 0, mid: 1042, mty: 1, }, 
		        	{ no: 1, mid: 126, mty: 1, }, 
		        	{ no: 2, mid: 1101, mty: 1, },
		        ],
		    }
	    ]
  	},
]
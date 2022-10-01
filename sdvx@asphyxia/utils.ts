import {Counter} from './models/counter';

export function IDToCode(id: number) {
  const padded = _.padStart(id.toString(), 8);
  return `${padded.slice(0, 4)}-${padded.slice(4)}`;
}

export async function GetCounter(key: string) {
  return (
    await DB.Upsert<Counter>(
      { collection: 'counter', key: 'mix' },
      { $inc: { value: 1 } }
    )
  ).docs[0].value;
}

export function getVersion(info: EamuseInfo) {
  const dateCode = parseInt(info.model.split(":")[4]);
  if (dateCode <= 2013052900) return 1;
  if (dateCode <= 2014112000) return 2;
  if (dateCode <= 2016121200) return 3;
  if (info.method.startsWith('sv4')) return 4;
  if (info.method.startsWith('sv5')) return 5;
  if (dateCode >= 2021083100) return -6;
  if (info.method.startsWith('sv6')) return 6;
  return 0;
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export const copyResourcesFromGame = async (data: {}) => {
  let resourceJsonData = JSON.parse(U.DecodeString(await IO.ReadFile('webui/asset/json/data.json'), 'utf8'))
  let newNemsysData = []
  let newAPCardData = []
  let newSubBGData = []
  let newBGMData = []

  // Copying new nemsys files from gamedata
  console.log("Copying new nemsys files from gamedata")
  let nemsysFiles = await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/game_nemsys")
  for await (const nemsys of nemsysFiles) {
    let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/game_nemsys/" + nemsys.name)
    if(!IO.Exists('webui/asset/nemsys/' + nemsys.name.substring(0, (nemsys.name.length - 4)) + ".png") && !IO.Exists('webui/asset/nemsys/' + nemsys.name.substring(0, (nemsys.name.length - 4)) + ".jpg")) {
      IO.WriteFile('webui/asset/nemsys/' + nemsys.name, fileToWrite)
      newNemsysData.push(nemsys.name)
    } else {
      console.log(nemsys.name + " exists")
    }
  }

  newNemsysData.forEach(fileName => {
    if(parseInt(fileName.substring(7, 11))) {
      resourceJsonData.nemsys.push({"value": parseInt(fileName.substring(7, 11)), "name": fileName + " (please rename)"})
    }
  })

  // Copying new appeal card files from gamedata
  console.log("Copying new appeal card files from gamedata")
  let apCardFiles = await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/ap_card")
  for await (const apCard of apCardFiles) {
    let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/ap_card/" + apCard.name)
    if(!IO.Exists('webui/asset/ap_card/' + apCard.name.substring(0, (apCard.name.length - 4)) + ".png") && !IO.Exists('webui/asset/ap_card/' + apCard.name.substring(0, (apCard.name.length - 4)) + ".jpg")) {
      IO.WriteFile('webui/asset/ap_card/' + apCard.name, fileToWrite)
      newAPCardData.push(apCard.name)
    } else {
      console.log(apCard.name + " exists")
    }
  }

  // Appeal card data registration to data.json not properly implemented yet, I don't quite understand how their IDs work
  // newAPCardData.forEach(fileName => {
  //   if(parseInt(fileName.substring(6, 10))) {
  //     resourceJsonData.apCard.push({"value": parseInt(fileName.substring(6, 10)), "name": fileName + " (please rename)"})
  //   }
  // })

  // Copying new subbg files from gamedata
  console.log("Copying new subbg files from gamedata")
  let subBGFiles = await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/submonitor_bg")
  for await (const subbg of subBGFiles) {
    if (subbg.name.substring(subbg.name.length-4, subbg.name.length).match(/(\.png|\.jpg)/g)) {
      let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/submonitor_bg/" + subbg.name)
      if(!IO.Exists('webui/asset/submonitor_bg/' + subbg.name.substring(0, (subbg.name.length - 4)) + ".png") && !IO.Exists('webui/asset/submonitor_bg/' + subbg.name.substring(0, (subbg.name.length - 4))  + ".jpg")) {
        IO.WriteFile('webui/asset/submonitor_bg/' + subbg.name, fileToWrite)
        newSubBGData.push(subbg.name)
      } else {
        console.log(subbg.name + " exists")
      }
    }
  }

  newSubBGData.forEach(fileName => {
    if(parseInt(fileName.substring(6, 10))) {
      resourceJsonData.subbg.push({"value": parseInt(fileName.substring(6, 10)), "name": fileName + " (please rename)"})
    }
  })

  // Copying new bgm files from gamedata
  console.log("Copying new bgm files from gamedata")
  let bgmFiles = await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/sound/custom")
  for await (const bgm of bgmFiles) {
    if (bgm.name.substring(bgm.name.length-4, bgm.name.length) == '.s3p') {
      let folderName = bgm.name.match(/(custom|special)_([0-9]*)/g)[0]
      if(folderName != '') {
        let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/sound/custom/" + bgm.name)
        if(!IO.Exists('webui/asset/audio/' + folderName)) {
          IO.WriteFile('webui/asset/audio/' + folderName + '/' + bgm.name, fileToWrite)
          newBGMData.push(bgm.name)
        } else {
          console.log(bgm.name + " exists")
        }
      }
    }
  }

  newBGMData.forEach(fileName => {
    let bgmId = fileName.match(/(?<=(custom|special)_)([0-9]*)/g)[0]
    if(parseInt(bgmId)) {
      resourceJsonData.bgm.push({"value": parseInt(bgmId), "name": fileName + " (please rename)"})
    }
  })

  await IO.WriteFile('webui/asset/json/data.json', JSON.stringify(resourceJsonData))
  await IO.WriteFile('webui/asset/logs/copyResourcesFromGame.json', JSON.stringify({
    nemsys: newNemsysData,
    apCard: newAPCardData,
    subbg: newSubBGData,
    bgm: newBGMData
  }))
}

export const generateLatestMusicDBFile = async (data: {}) => {
  var version = '';
  IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/prop/ea3-config.xml").then(
    function(value){
      let configJson = U.parseXML(U.DecodeString(value, "shift_jis"), false)
      version = configJson['ea3']['soft']['ext']['@content'];
    },
    function(error){
      console.log(error)
      return null;
    }
  );
  var mdbJson;
  var mdbJsonFix = [];
  var mdbJsonFixFinal;
  var mdb = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/others/music_db.xml").then(
    function(value){
      mdbJson = U.parseXML(U.DecodeString(value, "shift_jis"), false)
      try {
        mdbJson.mdb.music.forEach(musicValue => {
          if(parseInt(musicValue.info.distribution_date['@content'][0]) >= parseInt(version.substring(0,8))) {
            console.log("Found new song for version " + version + ": " + musicValue.info.title_name['@content'] + " (" + musicValue.info.distribution_date['@content'] + ")");
          }
          mdbJsonFix.push({
            '@id': musicValue['@attr'].id,
            'info': {
              'title_name': musicValue.info.title_name['@content'],
              'version': {
                '@__type': 'u8',
                '#text': musicValue.info.version['@content'][0].toString()
              },
              'inf_ver': {
                '@__type': 'u8',
                '#text': musicValue.info.inf_ver['@content'][0].toString()
              },
              'distribution_date' : {
                '#text': musicValue.info.distribution_date['@content'][0]
              }
            },
            'difficulty': {
              'novice': {
                'difnum': {
                  '@__type': 'u8',
                  '#text': musicValue.difficulty.novice.difnum['@content'][0].toString()
                }
              },
              'advanced': {
                'difnum': {
                  '@__type': 'u8',
                  '#text': musicValue.difficulty.advanced.difnum['@content'][0].toString()
                }
              },
              'exhaust': {
                'difnum': {
                  '@__type': 'u8',
                  '#text': musicValue.difficulty.exhaust.difnum['@content'][0].toString()
                }
              },
              'maximum': {
                'difnum': {
                  '@__type': 'u8',
                  '#text': musicValue.difficulty.maximum != undefined ? musicValue.difficulty.maximum.difnum['@content'][0].toString() : '0'
                }
              },
              'infinite': {
                'difnum': {
                  '@__type': 'u8',
                  '#text': musicValue.difficulty.infinite != undefined ? musicValue.difficulty.infinite.difnum['@content'][0].toString() : '0'
                }
              }
            }
          });  
        })
      } catch (err) {
        console.log(err)
      }

      try{
        mdbJsonFixFinal = {
          'mdb': {
            'version': version,
            'music': mdbJsonFix
          }
        };
        IO.WriteFile('webui/asset/json/music_db.json', JSON.stringify(mdbJsonFixFinal));
        if(!IO.Exists('webui/asset/json/music_db_' + version + '.json')){
          IO.WriteFile('webui/asset/json/music_db_' + version + '.json', JSON.stringify(mdbJsonFixFinal));
        }
      } catch(err) {
        console.log(err)
      }

      return mdbJsonFixFinal;
    },
    function(error){ 
      console.log(error);
      return null;
    } 
  );
  console.log(mdb.mdb.version)
  return mdb;
}
import { Profile } from '../models/profile';
import { MusicRecord } from '../models/music_record';
import { getVersion, IDToCode, GetCounter } from '../utils';
import { Mix } from '../models/mix';
import { PREGENE } from '../data/exg';

export const updateProfile = async (data: {
  refid: string;
  name?: string;
  appeal?: string;
  akaname?: string;
  nemsys?: string;
  bgm?: string;
  subbg?: string;
  stampA?: string;
  stampB?: string;
  stampC?: string;
  stampD?: string;
}) => {
  if (data.refid == null) return;

  const update: Update<Profile>['$set'] = {};

  if (data.name && data.name.length > 0) {
    const validName = data.name
      .toUpperCase()
      .replace(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#$&*\-\.\ ]/g, '')
      .slice(0, 8);
    if (validName.length > 0) update.name = validName;
  }

  if (data.appeal && data.appeal.length > 0) {
    const validAppeal = parseInt(data.appeal);
    if (!_.isNaN(validAppeal)) update.appeal = validAppeal;
  }

  if (data.akaname && data.akaname.length > 0) {
    const validAka = parseInt(data.akaname);
    if (!_.isNaN(validAka)) update.akaname = validAka;
  }

  if (data.nemsys && data.nemsys.length > 0) {
    const validNemsys = parseInt(data.nemsys);
    if (!_.isNaN(validNemsys)) update.nemsys = validNemsys;
  }

  if (data.subbg && data.subbg.length > 0) {
    const validSubbg = parseInt(data.subbg);
    if (!_.isNaN(validSubbg)) update.subbg = validSubbg;
  }

  if (data.bgm && data.bgm.length > 0) {
    const validBGM = parseInt(data.bgm);
    if (!_.isNaN(validBGM)) update.bgm = validBGM;
  }

  if (data.stampA && data.stampA.length > 0) {
    const validStampA = parseInt(data.stampA);
    if (!_.isNaN(validStampA)) update.stampA = validStampA;
  }

  if (data.stampB && data.stampB.length > 0) {
    const validStampB = parseInt(data.stampB);
    if (!_.isNaN(validStampB)) update.stampB = validStampB;
  }

  if (data.stampC && data.stampC.length > 0) {
    const validStampC = parseInt(data.stampC);
    if (!_.isNaN(validStampC)) update.stampC = validStampC;
  }

  if (data.stampD && data.stampD.length > 0) {
    const validStampD = parseInt(data.stampD);
    if (!_.isNaN(validStampD)) update.stampD = validStampD;
  }

  await DB.Update<Profile>(
    data.refid,
    { collection: 'profile' },
    { $set: update }
  );
};

export const updateMix = async (data: {
  code: string;
  name?: string;
  creator?: string;
}) => {
  const update: Update<Mix>['$set'] = {};

  if (data.name && data.name.length > 0) {
    if (data.name.length > 0) update.name = data.name;
  }

  if (data.creator && data.creator.length > 0) {
    // const validCreator = data.creator
    //   .toUpperCase()
    //   .replace(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#$&*\-\.\ ]/g, '')
    //   .slice(0, 8);
    if (data.creator.length > 0) update.creator = data.creator;
  }

  await DB.Update<Mix>(
    { collection: 'mix', code: data.code },
    { $set: update }
  );
};

export const importMix = async (data: { json: string }) => {
  if (data.json.startsWith('`')) {
    data.json = data.json.slice(1);
  }

  if (data.json.endsWith('`')) {
    data.json = data.json.slice(0, data.json.length - 1);
  }

  const mix: any[] = JSON.parse(data.json);

  let code = mix[0];
  while (await DB.FindOne<Mix>({ collection: 'mix', code })) {
    code = _.padStart(_.random(0, 999999999999).toString(), 12, '0');
  }

  const id = await GetCounter('mix');
  const musics = mix.slice(9);

  if (musics.length % 2 !== 0) return;

  const mdata = [];

  for (let i = 0; i < musics.length; i += 2) {
    mdata.push({
      grade: musics[i + 1],
      id: musics[i],
    });
  }

  await DB.Insert<Mix>({
    collection: 'mix',
    code,
    id,
    name: mix[1],
    creator: mix[2],
    param: `{ "dbVer" : "${mix[3]
      }", "gene" : { "params" : "{ \\"minorVer\\" : \\"${mix[4]
      }\\", \\"seed\\" : ${mix[5]} }", "ver" : "${mix[6]
      }" }, "musics" : ${JSON.stringify(mdata)}, "voxdj" : { "params" : "${mix[7]
      }", "ver" : "${mix[8]}" } }`,
    jacket: 0,
    tag: 1,
  });
};

export const deleteMix = async (data: { code: string }) => {
  await DB.Remove<Mix>({ collection: 'mix', code: data.code });
};


export const copyResourcesFromGame = async (data: {}) => {
  let mdbJsonFix = [];
  let mdbJsonFixFinal;
  let newJsonSongs = [];
  let newVersionSongs = [];
  let newXCDSongs = [];
  let newNemsysData = []
  let newAPCardData = []
  let newSubBGData = []
  let newBGMData = []
  let newChatStampData = []
  let newValgeneItemFiles = []
  let newAkanames = []
  let runErrors = []
  let resourceJsonData = JSON.parse(U.DecodeString(await IO.ReadFile('webui/asset/json/data.json'), 'utf8'))
  let apCardJsonData = JSON.parse(U.DecodeString(await IO.ReadFile('webui/asset/json/appeal.json'), 'utf8'))

  // Get new music data from music_db.xml
  console.log('Getting new music_db info')
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/others/music_db.xml")) {
    let mdb = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/others/music_db.xml"), "shift_jis"), false)
    let ea3Config = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/prop/ea3-config.xml"), "shift_jis"), false)
    let version = ea3Config['ea3']['soft']['ext']['@content'];
    let prevAssetMdb = []
    if(IO.Exists('webui/asset/json/music_db.json')) {
      prevAssetMdb = JSON.parse(U.DecodeString(await IO.ReadFile('webui/asset/json/music_db.json'), 'utf8'))
    }
  
    mdb.mdb.music.forEach(musicValue => {
      if(Object.keys(prevAssetMdb).length > 0) {
        if(prevAssetMdb['mdb']['music'].find(item => parseInt(item['@id']) == parseInt(musicValue.info.label['@content'])) == undefined) {
          console.log("New song added to json: " + musicValue.info.title_name['@content'] + " (" + musicValue.info.distribution_date['@content'] + ")") 
          newJsonSongs.push([ musicValue['@attr'].id, '[' + musicValue.info.distribution_date['@content'] + ' | ' + musicValue['@attr'].id + '] ' + musicValue.info.title_name['@content']])
        }
      } else {
        console.log("New song added to json: " + musicValue.info.title_name['@content'] + " (" + musicValue.info.distribution_date['@content'] + ")") 
        newJsonSongs.push([ musicValue['@attr'].id, '[' + musicValue.info.distribution_date['@content'] + ' | ' + musicValue['@attr'].id + '] ' + musicValue.info.title_name['@content']])
      }

      if(musicValue.info.inf_ver['@content'] == '6') {
        console.log("New XCD difficulty song: " + musicValue.info.title_name['@content'] + " (" + musicValue.info.distribution_date['@content'] + ")") 
        newXCDSongs.push([ musicValue['@attr'].id, '[' + musicValue.info.distribution_date['@content'] + ' | ' + musicValue['@attr'].id + '] ' + musicValue.info.title_name['@content']])
      }

      if(parseInt(musicValue.info.distribution_date['@content'][0]) >= parseInt(version.substring(0,8))) {
        console.log("Found new song for version " + version + ": " + musicValue.info.title_name['@content'] + " (" + musicValue.info.distribution_date['@content'] + ")");
        newVersionSongs.push([ musicValue['@attr'].id, '[' + musicValue.info.distribution_date['@content'] + ' | ' + musicValue['@attr'].id + '] ' + musicValue.info.title_name['@content']])
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

  } else {
    console.log('Error reading music_db.xml. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[music_db] Error reading music_db.xml. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new nemsys files from gamedata
  console.log("Copying new nemsys files from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/game_nemsys")) {
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
      if(fileName.match(/([0-9]+)/g) != undefined) {
        let nemsysId = parseInt(fileName.match(/([0-9]+)/g)[0])
        if(nemsysId && resourceJsonData.nemsys.find(nem => nem.value == nemsysId) == undefined) {
          resourceJsonData.nemsys.push({"value": nemsysId, "name": fileName + " (please rename)"})
        }
      }
    })
  } else {
    console.log('Error reading nemsys directory. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[nemsys] Error reading nemsys directory. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new subbg files from gamedata
  console.log("Copying new subbg files from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/submonitor_bg")) {
    let subBGFiles = await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/submonitor_bg")
    for await (const subbg of subBGFiles) {
      if (subbg.name.match(/(\.png|\.jpg)/g)) {
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
      let subbgId = parseInt(fileName.match(/([0-9]+)/g)[0])
      if(subbgId) {
        let foundSubbg = resourceJsonData.subbg.find(subbg => subbg.value === subbgId)
        if(foundSubbg == undefined) {
          if(fileName.match(/(subbg_[0-9]+_[0-9]+)/g)) fileName = fileName.match(/(subbg_[0-9]+)/g)
          resourceJsonData.subbg.push({"value": subbgId, "name": fileName + " (please rename)"})
        }
      }
    })
  } else {
    console.log('Error reading submonitor_bg directory. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[submonitor_bg] Error reading submonitor_bg directory. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new bgm files from gamedata
  console.log("Copying new bgm files from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/sound/custom")) {
    let bgmFiles = await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/sound/custom")
    for await (const bgm of bgmFiles) {
      if (bgm.name.match(/(\.s3p)/g)) {
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
      let bgmId = parseInt(fileName.match(/(?<=(custom|special)_)([0-9]*)/g)[0])
      if(bgmId && resourceJsonData.bgm.find(bgm => bgm.value == bgmId) == undefined) {
        resourceJsonData.bgm.push({"value": bgmId, "name": fileName + " (please rename)"})
      }
    })
  } else {
    console.log('Error reading BGM directory. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[BGM] Error reading BGM directory. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new valgene_item files from gamedata
  console.log("Copying new valgene_item files from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/valgene_item")) {
    let valgeneItemFiles = await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/valgene_item")
    for await (const valgeneItem of valgeneItemFiles) {
      if (valgeneItem.name.substring(valgeneItem.name.length-4, valgeneItem.name.length).match(/(\.png|\.jpg)/g)) {
        let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/valgene_item/" + valgeneItem.name)
        if(!IO.Exists('webui/asset/valgene_item/' + valgeneItem.name.substring(0, (valgeneItem.name.length - 4)) + ".png") && !IO.Exists('webui/asset/valgene_item/' + valgeneItem.name.substring(0, (valgeneItem.name.length - 4))  + ".jpg")) {
          IO.WriteFile('webui/asset/valgene_item/' + valgeneItem.name, fileToWrite)
          newValgeneItemFiles.push(valgeneItem.name)
        } else {
          console.log(valgeneItem.name + " exists")
        }
      }
    }
  } else {
    console.log('Error reading valgene_item directory. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[valgene_item] Error reading valgene_item directory. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new akanames from gamedata
  console.log("Copying new akanames from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/others/akaname_parts.xml")) {
    let akanameData = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/others/akaname_parts.xml"), "shift_jis"), false)
    for(const akaname of akanameData.akaname_parts.part) {
      if(resourceJsonData.akaname.find(aka => aka.value === akaname['@attr'].id) == undefined) {
        resourceJsonData.akaname.push({"value": akaname['@attr'].id, "name": akaname.word['@content'] != undefined ? akaname.word['@content'] : '' })
        newAkanames.push(akaname['@attr'].id + ": " + akaname.word['@content'])
      } 
    }
    resourceJsonData.akaname.sort(function(a, b){return parseInt(a.value) - parseInt(b.value)})
  } else {
    console.log('Error reading akaname xml file. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[akaname] Error reading akaname xml file. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new appeal card data from gamedata
  console.log("Copying new appeal card data from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/others/appeal_card.xml")) {
    let apCardData = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/others/appeal_card.xml"), "shift_jis"), false)
    for(const apCard of apCardData.appeal_card_data.card) {
      if(apCardJsonData.appeal_card_data.card.find(ap => ap['@id'] === apCard['@attr'].id) == undefined) {
        apCardJsonData.appeal_card_data.card.push({"@id": apCard['@attr'].id, "info": {"texture": apCard.info['texture']['@content'], "title": apCard.info['title']['@content']}})
        newAPCardData.push(apCard['@attr'].id + ": " + apCard.info['texture']['@content'] + "(" + apCard.info['title']['@content'] + ")")
      }
      if(!IO.Exists('webui/asset/ap_card/' + apCard.info['texture']['@content'] + '.png') && !IO.Exists('webui/asset/ap_card/' + apCard.info['texture']['@content'] + '.jpg')) {
        let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/ap_card/" + apCard.info['texture']['@content'] + ".png")
        IO.WriteFile('webui/asset/ap_card/' + apCard.info['texture']['@content'] + '.png', fileToWrite)
      }
    }
    apCardJsonData.appeal_card_data.card.sort(function(a, b){return parseInt(a['@id']) - parseInt(b['@id'])})
  } else {
    console.log('Error reading appeal card xml file. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[appeal card] Error reading appeal card xml file. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new chat stamps from gamedata
  console.log("Copying new chat stamps from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/others/chat_stamp.xml")) {
    let chatStampData = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/others/chat_stamp.xml"), "shift_jis"), false)
    // console.log(JSON.stringify(chatStampData.chat_stamp_data))
    for(const chatStamp of chatStampData.chat_stamp_data.info) {
      if(resourceJsonData.stamp.find(stamp => stamp['value'] === chatStamp.id['@content'][0]) == undefined) {
        resourceJsonData.stamp.push({"value": chatStamp.id['@content'][0], "name": chatStamp.filename['@content']})
        newChatStampData.push(chatStamp.id['@content'][0] + ": " + chatStamp.filename['@content'])
      }
      if(!IO.Exists('webui/asset/chat_stamp/' + chatStamp.filename['@content'] + '.png') && !IO.Exists('webui/asset/chat_stamp/' + chatStamp.filename['@content'] + '.png')) {
        let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/chat_stamp/" + chatStamp.filename['@content'] + ".png")
        IO.WriteFile('webui/asset/chat_stamp/' + chatStamp.filename['@content'] + '.png', fileToWrite)
      }
    }
    resourceJsonData.stamp.sort(function(a, b){return a.value - b.value})
  } else {
    console.log('Error reading chat stamp xml file. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[chat stamp] Error reading chat stamp xml file. Check your "Exceed Gear Data Directory" config.')
  }

  await IO.WriteFile('webui/asset/json/data.json', JSON.stringify(resourceJsonData))
  await IO.WriteFile('webui/asset/json/appeal.json', JSON.stringify(apCardJsonData))
  await IO.WriteFile('webui/asset/logs/copyResourcesFromGame.json', JSON.stringify({
    akaname: newAkanames,
    nemsys: newNemsysData,
    apCard: newAPCardData,
    subbg: newSubBGData,
    bgm: newBGMData,
    chatStamp: newChatStampData,
    valgeneItemFiles: newValgeneItemFiles,
    versionSongs: newVersionSongs.sort((a, b) => a[0] - b[0]),
    jsonSongs: newJsonSongs.sort((a, b) => a[0] - b[0]),
    xcdSongs: newXCDSongs.sort((a, b) => a[0] - b[0]),
    errors: runErrors
  }))
}

export const preGeneRoll = async (data: {
  set: number,
  refid: string,
  items: []
}) => {
  // prem_items_crew: DB.Find(refid, {collection:"item",type:11})
  // prem_items_stamp: DB.Find(refid, { collection:"item",type:17 })
  // prem_items_subbg: DB.Find(refid, { collection:"item",type:18 })
  // prem_items_bgm: DB.Find(refid, { collection:"item",type:19 })
  // prem_items_nemsys: DB.Find(refid, { collection:"item",type:20 })

  let itemId = {
    'crew': 11,
    'stamp': 17,
    'subbg': 18,
    'bgm': 19,
    'nemsys': 20
  }
  let preGeneSet = PREGENE.find(itemSet => itemSet.id === data.set)
  let finishedRolling = false
  if(preGeneSet != undefined) {
    while(!finishedRolling) {
      let rollWhat = 0
      let probability = Math.random();
      console.log("Rolling Premium Generator")
      for(const probIndex in preGeneSet.probability) {
        if(probability <= preGeneSet.probability[probIndex]) {
          rollWhat = parseInt(probIndex);
          break;
        }
        if(parseInt(probIndex) === preGeneSet.probability.length - 1) rollWhat = parseInt(probIndex);
      }

      let unobtainedItems = preGeneSet.items[Object.keys(preGeneSet.items)[rollWhat]].map((x) => x)
      data.items.forEach(item => {
        if(item['type'] == itemId[Object.keys(preGeneSet.items)[rollWhat]] && preGeneSet.items[Object.keys(preGeneSet.items)[rollWhat]].includes(item['id'])) {
          unobtainedItems.splice(unobtainedItems.indexOf(item['id']), 1)
        }
      })
      if(unobtainedItems.length > 0) {
        let randomItemIndex = Math.floor(Math.random() * unobtainedItems.length);
        console.log("Rolled item id: " + unobtainedItems[randomItemIndex] + " | item type: " + itemId[Object.keys(preGeneSet.items)[rollWhat]])
        if(itemId[Object.keys(preGeneSet.items)[rollWhat]] == 17) {
          for(let stampID = (unobtainedItems[randomItemIndex] * 4) - 3; stampID <= (unobtainedItems[randomItemIndex] * 4); stampID++) {
            DB.Insert(data.refid, {
              "collection": "item", 
              "type": itemId[Object.keys(preGeneSet.items)[rollWhat]], 
              "id": stampID, 
              "param": 1 
            })
          }
        } else {
          DB.Insert(data.refid, {
            "collection": "item", 
            "type": itemId[Object.keys(preGeneSet.items)[rollWhat]], 
            "id": unobtainedItems[randomItemIndex], 
            "param": 1 
          })
        }
        let finalItemType = (Object.keys(preGeneSet.items)[rollWhat] === 'subbg') ? 'bg' : Object.keys(preGeneSet.items)[rollWhat]
        await IO.WriteFile('webui/asset/logs/preGeneRollResult.json', JSON.stringify({'id': unobtainedItems[randomItemIndex], 'type': finalItemType}))
        finishedRolling = true
      } else {
        console.log("No more " + Object.keys(preGeneSet.items)[rollWhat] + " items to get, will re-roll.")
      }
    }
  } else console.log('pregeneset none')
}

export const manageEvents = async (data: {
  eventConfig: {}
}) => {
  IO.WriteFile('webui/asset/config/events.json', JSON.stringify(data.eventConfig, null, 4));
}

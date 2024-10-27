import { Profile } from '../models/profile';
import { MusicRecord } from '../models/music_record';
import { ValgeneTicket } from '../models/valgene_ticket';
import { Skill } from '../models/skill';
import { getVersion, IDToCode, GetCounter } from '../utils';
import { Mix } from '../models/mix';
import { Rival } from '../models/rival';
import { Item } from '../models/item';
import { PREGENE, COURSES6} from '../data/exg';
import { textureslist } from '../data/webui'
import * as fs from 'fs';
import { PNG } from '../webui/asset/js/pngjs/png.js';

export const updateProfile = async (data: {
  refid: string;
  name?: string;
  appeal?: string;
  akaname?: string;
  bplSupport?: string;
  bplPro?: boolean;
  nemsys?: string;
  bgm?: string;
  subbg?: string;
  stampA?: string;
  stampB?: string;
  stampC?: string;
  stampD?: string;
  stampRA?: string;
  stampRB?: string;
  stampRC?: string;
  stampRD?: string;
  sysBG?: string;
  valgeneTicket?: string;
  skilltitle?: string;
  creatorItem?: string;
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

  if (data.bplSupport && data.bplSupport.length > 0) {
    const validBplSupport = data.bplPro ? parseInt(data.bplSupport) + 10 : parseInt(data.bplSupport);
    if (!_.isNaN(validBplSupport)) update.bplSupport = validBplSupport;
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

  if (data.stampRA && data.stampRA.length > 0) {
    const validStampRA = parseInt(data.stampRA);
    if (!_.isNaN(validStampRA)) update.stampRA = validStampRA;
  }

  if (data.stampRB && data.stampRB.length > 0) {
    const validStampRB = parseInt(data.stampRB);
    if (!_.isNaN(validStampRB)) update.stampRB = validStampRB;
  }

  if (data.stampRC && data.stampRC.length > 0) {
    const validStampRC = parseInt(data.stampRC);
    if (!_.isNaN(validStampRC)) update.stampRC = validStampRC;
  }

  if (data.stampRD && data.stampRD.length > 0) {
    const validStampRD = parseInt(data.stampRD);
    if (!_.isNaN(validStampRD)) update.stampRD = validStampRD;
  }

  if (data.sysBG && data.sysBG.length > 0) {
    const validSysBG = parseInt(data.sysBG);
    if (!_.isNaN(validSysBG)) update.sysBG = validSysBG;
  }

  if (data.creatorItem && data.creatorItem.length > 0) {
    const validCreatorItem = parseInt(data.creatorItem);
    if (!_.isNaN(validCreatorItem)) update.creatorItem = validCreatorItem;
  }

  await DB.Update<Profile>(
    data.refid,
    { collection: 'profile' },
    { $set: update }
  );

  if (parseInt(data.skilltitle) >= 0) {
    await DB.Update<Skill>(
      data.refid,
      { collection: 'skill' },
      { $set: {
          name: parseInt(data.skilltitle)
        } 
      }
    );
  }
  
  if (parseInt(data.valgeneTicket) >= 0) {
    await DB.Upsert<ValgeneTicket>(
      data.refid,
      { collection: 'valgene_ticket' },
      { $set: {
          ticketNum: parseInt(data.valgeneTicket),
          limitDate: Date.parse('31 Dec 2099 23:59:59 GMT')
        } 
      }
    );
  }
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

export const copyResourcesFromGame = async (data: {}, send: WebUISend) => {
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
    let ea3Config = []
    let version = ''
    let mdb = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/others/music_db.xml"), "shift_jis"), false)

    if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/prop/ea3-config.xml")) {
      console.log("Reading ea3-config.xml")
      ea3Config = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/prop/ea3-config.xml"), "shift_jis"), false)
      version = ea3Config['ea3']['soft']['ext']['@content'];
    } else if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/prop/ea3-ident.xml")) {
      console.log("Reading ea3-ident.xml")
      ea3Config = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/prop/ea3-ident.xml"), "shift_jis"), false)
      version = ea3Config['ea3_conf']['soft']['ext']['@content'];
    }
    let prevAssetMdb = []
    if(IO.Exists('webui/asset/json/music_db.json')) {
      prevAssetMdb = JSON.parse(U.DecodeString(await IO.ReadFile('webui/asset/json/music_db.json'), 'utf8'))
    }
  
    mdb.mdb.music.forEach(musicValue => {
      if(Object.keys(prevAssetMdb).length > 0) {
        if(prevAssetMdb['mdb']['music'].find(item => parseInt(item['@id']) == parseInt(musicValue['@attr'].id)) == undefined) {
          console.log("New song added to json: " + musicValue.info.title_name['@content'] + " (" + musicValue.info.distribution_date['@content'] + ")") 
          newJsonSongs.push([ musicValue['@attr'].id, '[' + musicValue.info.distribution_date['@content'] + ' | ' + musicValue['@attr'].id + '] ' + musicValue.info.title_name['@content']])
        }

        if(prevAssetMdb['mdb']['music'].find(item => (parseInt(item['@id']) == parseInt(musicValue['@attr'].id) && parseInt(item['info']['inf_ver']['#text']) === 0)) != undefined) {
          if(musicValue.info.inf_ver['@content'] == '6') {
            console.log("New XCD difficulty song: " + musicValue.info.title_name['@content'] + " (" + musicValue.info.distribution_date['@content'] + ")") 
            newXCDSongs.push([ musicValue['@attr'].id, '[' + musicValue.info.distribution_date['@content'] + ' | ' + musicValue['@attr'].id + '] ' + musicValue.info.title_name['@content']])
          }
        }
      } else {
        console.log("New song added to json: " + musicValue.info.title_name['@content'] + " (" + musicValue.info.distribution_date['@content'] + ")") 
        newJsonSongs.push([ musicValue['@attr'].id, '[' + musicValue.info.distribution_date['@content'] + ' | ' + musicValue['@attr'].id + '] ' + musicValue.info.title_name['@content']])
        
        if(musicValue.info.inf_ver['@content'] == '6') {
          console.log("New XCD difficulty song: " + musicValue.info.title_name['@content'] + " (" + musicValue.info.distribution_date['@content'] + ")") 
          newXCDSongs.push([ musicValue['@attr'].id, '[' + musicValue.info.distribution_date['@content'] + ' | ' + musicValue['@attr'].id + '] ' + musicValue.info.title_name['@content']])
        }
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
    IO.WriteFile('webui/asset/json/music_db.json', JSON.stringify(mdbJsonFixFinal, null, 4));
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
        console.log("[nemsys] copying " + nemsys.name)
        IO.WriteFile('webui/asset/nemsys/' + nemsys.name, fileToWrite)
        newNemsysData.push(nemsys.name)
      }

      if(nemsys.name.match(/([0-9]+)/g) != undefined) {
        let nemsysId = parseInt(nemsys.name.match(/([0-9]+)/g)[0])
        if(nemsysId && ![8, 9, 10, 11].includes(nemsysId) && resourceJsonData.nemsys.find(nem => nem.value == nemsysId) == undefined) {
          console.log("[nemsys] adding to json: " + nemsys.name)
          resourceJsonData.nemsys.push({"value": nemsysId, "name": nemsys.name})
        }
      }
    }
  } else {
    console.log('Error reading nemsys directory. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[nemsys] Error reading nemsys directory. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new subbg files from gamedata
  console.log("Copying new subbg files from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/submonitor_bg")) {
    let subBGFiles = await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/submonitor_bg")
    for await (const subbg of subBGFiles) {
      if (subbg.name.match(/^(subbg[_0-9]*)(\.png|\.jpg|\.mp4)/g)) {
        let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/submonitor_bg/" + subbg.name)
        if(!IO.Exists('webui/asset/submonitor_bg/' + subbg.name.substring(0, (subbg.name.length - 4)) + ".png") && !IO.Exists('webui/asset/submonitor_bg/' + subbg.name.substring(0, (subbg.name.length - 4))  + ".jpg") && !IO.Exists('webui/asset/submonitor_bg/' + subbg.name.substring(0, (subbg.name.length - 4))  + ".mp4")) {
          console.log("[subbg] copying " + subbg.name)
          IO.WriteFile('webui/asset/submonitor_bg/' + subbg.name, fileToWrite)
          newSubBGData.push(subbg.name)
        } 

        let subbgId = parseInt(subbg.name.match(/([0-9]+)/g)[0])
        if(subbgId) {
          let subbgName = subbg.name
          let subbgType = 'normal'
          let foundSubbg = resourceJsonData.subbg.findIndex(subbg => subbg.value === subbgId)
          
          if(subbg.name.match(/(subbg_[0-9]+_[0-9]+)/g)) {
            subbgName = subbg.name.match(/(subbg_[0-9]+)/g)[0]
            subbgType = 'slideshow'
          } else if(subbg.name.includes('.mp4')) subbgType = 'video'
          
          if(foundSubbg == -1) {
            console.log("[subbg] adding " + subbgId + " - " + subbgName + " (" + subbgType + ")")
            resourceJsonData.subbg.push({"value": subbgId, "type": subbgType, "name": subbgName})
          }
        }
      }
    }
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
          if(!IO.Exists('webui/asset/audio/' + folderName)) {
            console.log("[bgm] extracting audio files from " + bgm.name + ".")

            // Thanks to mon/s3p_extract on GitHub.
            let bufOffset = 4
            let s3pBuffer = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/sound/custom/" + bgm.name, {flag: 'r'})
            let fileMagic = s3pBuffer.toString('utf8', 0, 4)
            let fileEntries = s3pBuffer.readInt32LE(bufOffset)
            let entries = []
            bufOffset += 4
            for(let entryCtr = 0; entryCtr < fileEntries; entryCtr++) {
              entries.push(
                {
                  offset: s3pBuffer.readInt32LE(bufOffset),
                  length: s3pBuffer.readInt32LE(bufOffset + 4)
                }
              )
              bufOffset += 8
            }

            let filename = 0
            entries.forEach(entry => {
              let magic = s3pBuffer.toString('utf8', entry.offset, entry.offset + 4)
              let fileStart = s3pBuffer.readInt32LE(entry.offset + 4)
              let arrayBuffer = s3pBuffer.buffer.slice(entry.offset, entry.offset + entry.length)
              IO.WriteFile('webui/asset/audio/' + folderName + '/' + filename + '.wma', s3pBuffer.toString('binary', entry.offset + fileStart, entry.offset + entry.length), {encoding: 'binary'})
              filename++
            })
          } 

          let bgmId = parseInt(bgm.name.match(/(?<=(custom|special)_)([0-9]*)/g)[0])
          if(bgmId && resourceJsonData.bgm.find(bgm => bgm.value == bgmId) == undefined) {
            console.log("[bgm] adding to json: " + bgmId + " - " + bgm.name)
            newBGMData.push(bgm.name)
            resourceJsonData.bgm.push({"value": bgmId, "name": bgm.name})
          }
        }
      }
    }
  } else {
    console.log('Error reading BGM directory. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[BGM] Error reading BGM directory. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new chat stamps from gamedata
  console.log("Copying new chat stamps from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/others/chat_stamp.xml")) {
    let chatStampData = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/others/chat_stamp.xml"), "shift_jis"), false)
    // console.log(JSON.stringify(chatStampData.chat_stamp_data))
    for(const chatStamp of chatStampData.chat_stamp_data.info) {
      if(resourceJsonData.stamp.find(stamp => stamp['value'] === chatStamp.id['@content'][0]) == undefined) {
        let stampTitle = chatStamp.title['@content'] + " " + (parseInt(chatStamp.id['@content'][0]) % 4 !== 0 ? parseInt(chatStamp.id['@content'][0]) % 4 : 4)
        console.log("[chat_stamp] " + chatStamp.id['@content'][0] + " - " + stampTitle)
        resourceJsonData.stamp.push({"value": chatStamp.id['@content'][0], "name": stampTitle})
        newChatStampData.push(chatStamp.id['@content'][0] + ": " + chatStamp.filename['@content'])
      } 
      if(!IO.Exists('webui/asset/chat_stamp/' + chatStamp.filename['@content'] + '.png') && !IO.Exists('webui/asset/chat_stamp/' + chatStamp.filename['@content'] + '.png')) {
        console.log("[chat_stamp] copying " + chatStamp.filename['@content'] + '.png')
        let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/chat_stamp/" + chatStamp.filename['@content'] + ".png")
        IO.WriteFile('webui/asset/chat_stamp/' + chatStamp.filename['@content'] + '.png', fileToWrite)
      }
    }
    resourceJsonData.stamp.sort(function(a, b){return a.value - b.value})
  } else {
    console.log('Error reading chat stamp xml file. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[chat stamp] Error reading chat stamp xml file. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new valgene_item files from gamedata
  console.log("Copying new valgene_item files from gamedata")
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/valgene_item")) {
    let valgeneItemFiles = await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/valgene_item")
    for await (const valgeneItem of valgeneItemFiles) {
      if (valgeneItem.name.substring(valgeneItem.name.length-4, valgeneItem.name.length).match(/(\.png|\.jpg)/g)) {
        let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/valgene_item/" + valgeneItem.name)
        if(!IO.Exists('webui/asset/valgene_item/' + valgeneItem.name.substring(0, (valgeneItem.name.length - 4)) + ".png") && !IO.Exists('webui/asset/valgene_item/' + valgeneItem.name.substring(0, (valgeneItem.name.length - 4))  + ".jpg")) {
          console.log("[valgene_item] copying " + valgeneItem.name)
          IO.WriteFile('webui/asset/valgene_item/' + valgeneItem.name, fileToWrite)
          newValgeneItemFiles.push(valgeneItem.name)
        }

      }
    }
  } else {
    console.log('Error reading valgene_item directory. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[valgene_item] Error reading valgene_item directory. Check your "Exceed Gear Data Directory" config.')
  }

  // Copying new akanames from gamedata
  console.log("Copying new appeal titles from gamedata")
  // resourceJsonData.akaname = []
  if(IO.Exists(U.GetConfig('sdvx_eg_root_dir') + "/data/others/akaname_parts.xml")) {
    let akanameData = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/others/akaname_parts.xml"), "shift_jis"), false)
    for(const akaname of akanameData.akaname_parts.part) {
      if(resourceJsonData.akaname.find(aka => aka.value === akaname['@attr'].id) === undefined) {
        let akanameFmtd = ('@content' in akaname.word) ? akaname.word['@content'].replace(/(\[[A-z0-9:,\/\]]*)/g,'') : ''
        console.log("[appeal title] adding " + akaname['@attr'].id + " - " + akanameFmtd)
        resourceJsonData.akaname.push({"value": akaname['@attr'].id, "name": akanameFmtd})
        newAkanames.push(akaname['@attr'].id + ": " + akanameFmtd )
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
        console.log("[ap_card] adding to json: " + apCard['@attr'].id + " - " + apCard.info['title']['@content'])
        apCardJsonData.appeal_card_data.card.push({"@id": apCard['@attr'].id, "info": {"texture": apCard.info['texture']['@content'], "title": apCard.info['title']['@content']}})
        newAPCardData.push(apCard['@attr'].id + ": " + apCard.info['texture']['@content'] + "(" + apCard.info['title']['@content'] + ")")
      }
      if(!IO.Exists('webui/asset/ap_card/' + apCard.info['texture']['@content'] + '.png') && !IO.Exists('webui/asset/ap_card/' + apCard.info['texture']['@content'] + '.jpg')) {
        console.log("[ap_card] copying " + apCard.info['texture']['@content'] + '.png')
        let fileToWrite = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/graphics/ap_card/" + apCard.info['texture']['@content'] + ".png")
        IO.WriteFile('webui/asset/ap_card/' + apCard.info['texture']['@content'] + '.png', fileToWrite)
      }
    }
    apCardJsonData.appeal_card_data.card.sort(function(a, b){return parseInt(a['@id']) - parseInt(b['@id'])})
  } else {
    console.log('Error reading appeal card xml file. Check your "Exceed Gear Data Directory" config.')
    runErrors.push('[appeal card] Error reading appeal card xml file. Check your "Exceed Gear Data Directory" config.')
  }

  await IO.WriteFile('webui/asset/json/data.json', JSON.stringify(resourceJsonData, null, 4))
  await IO.WriteFile('webui/asset/json/appeal.json', JSON.stringify(apCardJsonData, null, 4))

  // Extract textures from ifs files using pngjs. Massive thanks to https://github.com/mon/ifstools
  console.log("Extracting textures from IFS files")
  let ifsSuccess = []
  for(let listIter = 0; listIter < textureslist.length; listIter++) {
    let manifestJson = {}
    let bufOffset = 0
    let magic = '6CAD8F89'
    console.log(textureslist[listIter]['file'] + ":")
    let ifsBuffer = await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + textureslist[listIter].file, {flag: 'r'})
    if(!fs.existsSync('plugins/sdvx@asphyxia/webui/asset/' + textureslist[listIter].asset_folder)) {
      fs.mkdirSync('plugins/sdvx@asphyxia/webui/asset/' + textureslist[listIter].asset_folder)
    }
    let header = Buffer.from(ifsBuffer.buffer.slice(0, 36))
    let sig = header.readUInt32BE().toString(16).toUpperCase()
    bufOffset += 4
    if(sig === magic) {
      bufOffset += 12
      let manifest_end = ifsBuffer.readUInt32BE(bufOffset)
      bufOffset += 4
      let md5_hash = ifsBuffer.toString('hex', bufOffset, bufOffset + 16)
      bufOffset += 16
      if(md5_hash === textureslist[listIter].md5) {
        for(let texIter = 0; texIter < textureslist[listIter]['textures'].length; texIter++) {
          let tdFileName = textureslist[listIter]['textures'][texIter][0]
          let tdOffset = parseInt(textureslist[listIter]['textures'][texIter][1].toString())
          let tdSize = parseInt(textureslist[listIter]['textures'][texIter][2].toString())
          let tdUvrect = textureslist[listIter]['textures'][texIter][3]
          let tdImgRect = textureslist[listIter]['textures'][texIter][4]

          let imgBufferHead = Buffer.from(ifsBuffer.buffer.slice(manifest_end + tdOffset, manifest_end + tdOffset + 8))
          let imgBufferHeadOff = 0
          let imgBuffer = Buffer.from(ifsBuffer.buffer.slice(manifest_end + tdOffset + 8, manifest_end + tdOffset + tdSize))
          let imgBufferOff = 0
          let imgUncompressedSize = imgBufferHead.readUInt32BE(imgBufferHeadOff)
          imgBufferHeadOff += 4
          let imgCompressedSize = imgBufferHead.readUInt32BE(imgBufferHeadOff)
          imgBufferHeadOff += 4

          // Decompression algorithm & code from ifstools/handlers/lz77.py
          let decompressed = []
          let contLoop = true
          let diff, flag, w, position, length
          while(contLoop) {
            flag = imgBuffer.readUInt8(imgBufferOff)
            imgBufferOff++
            for(let i = 0; i < 8; i++){
              if (((flag >> i) & 1) === 1) {
                decompressed.push(imgBuffer.readUInt8(imgBufferOff))
                imgBufferOff++
              }
              else {
                w = imgBuffer.readUInt16BE(imgBufferOff)
                imgBufferOff+=2
                position = (w >> 4)
                length = (w & 0x0F) + 3
                if(position === 0) {
                  contLoop = false
                  break;
                }
                if(position > decompressed.length) {
                  diff = 0
                  diff = position - decompressed.length
                  diff = Math.min(diff, length)
                  for(let e2p = 0; e2p < diff; e2p++) {
                    decompressed.push(0)
                  }
                  length -= diff
                }
                if (-position+length < 0) {
                  decompressed.push(...decompressed.slice(decompressed.length + (-position), decompressed.length + (-position+length)))
                }
                else {
                  for(let loop = 0; loop < length; loop++) {
                    decompressed.push(decompressed[decompressed.length + (-position)])
                  }
                }
              }
            }
          }

          // Swap red and blue data (RGBA -> BGRA)
          if(decompressed.length === imgUncompressedSize) {
            for(let decCtr = 0; decCtr < decompressed.length; decCtr += 4) {
              decompressed[decCtr + 2] = [decompressed[decCtr], decompressed[decCtr] = decompressed[decCtr + 2]][0];
            }

            let pngf = new PNG({
              width: Math.floor(tdImgRect[1]/2) - Math.floor(tdImgRect[0]/2),
              height: Math.floor(tdImgRect[3]/2) - Math.floor(tdImgRect[2]/2),
              bitDepth: 8,
              colorType: 6,
              inputHasAlpha: true
            })

            pngf.data = Buffer.from(decompressed)
            const outputStream = await fs.createWriteStream('plugins/sdvx@asphyxia/webui/asset/' + textureslist[listIter].asset_folder + '/' + tdFileName);
            await pngf.pack().pipe(outputStream);
            console.log(' - ' + tdFileName + ' created successfully.');
            ifsSuccess.push(textureslist[listIter].file + ' - ' + tdFileName)
          } else {
            console.log("Decompression mismatch.")
            runErrors.push('[ifs] decompression mismatch for ' + textureslist[listIter]['file'] + '/' + tdFileName)
          }
        }
      } else {
        console.log('MD5 mismatch.')
        runErrors.push('[ifs] MD5 mismatch - ' + textureslist[listIter].file)
      }
       
    } else {
      console.log('IFS file unsupported/invalid.')
      runErrors.push('[ifs] IFS file "' + textureslist[listIter].file + '" unsupported/invalid.')
    }
  }

  console.log("Updating course_data.json")
  let courseDataUpdateSuccess = false
  let courseData = JSON.parse(U.DecodeString(await IO.ReadFile('webui/asset/json/course_data.json'), 'utf8'))
  for(let cIter = 0; cIter < courseData.courseData.length; cIter++) {
    if(courseData.courseData[cIter].version === 6) {
      courseData.courseData[cIter].info = COURSES6
      courseDataUpdateSuccess = true
    }
  }
  if(courseDataUpdateSuccess === false) runErrors.push('[course_data] Update unsuccessful.')

  await IO.WriteFile('webui/asset/json/course_data.json', JSON.stringify(courseData, null, 4))
  
  send.json(
    {
      status: 'ok',
      course: courseDataUpdateSuccess,
      ifs: ifsSuccess,
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
    }
  )
}

export const getRivalScores = async (data: { rivalId: string; refid: string; }, send: WebUISend) => {
  let rival = await DB.FindOne<Rival>(data.refid, {collection: 'rival', refid: data.rivalId})
  send.json({
    rival: await DB.FindOne<Profile>(data.rivalId, {collection: 'profile'}),
    yourScores: await DB.Find<MusicRecord>(data.refid, { collection: 'music' }),
    rivalScores: await DB.Find<MusicRecord>(rival.refid, { collection: 'music' })
  })
}

export const addRival = async (data: { rivalId: string; refid: string; }, send: WebUISend) => {
  let you = await DB.FindOne<Profile>(data.refid, {collection: 'profile'})
  let rival = await DB.FindOne<Profile>(data.rivalId, {collection: 'profile'})

  let checkMutual = (await DB.Count<Rival>(data.rivalId, {collection: 'rival', refid: data.refid}) > 0)
  if(await DB.Count<Rival>(data.refid, {collection: 'rival', refid: data.rivalId}) === 0) {
    if(checkMutual) {
      DB.Upsert(data.rivalId, {"collection": "rival", "sdvxID": you.id, "refid": data.refid, "name": you.name}, {$set: {"mutual": checkMutual}})
    }
    DB.Insert(data.refid, {"collection": "rival", "sdvxID": rival.id, "refid": data.rivalId, "name": rival.name, "mutual": checkMutual})
    send.json({
      "msg": "Successfully added profile to rival. In order for your rivals to appear in-game, they need to add you as their rival as well."
    })
  } else {
    if(checkMutual) {
      DB.Upsert(data.rivalId, {"collection": "rival", "sdvxID": you.id, "refid": data.refid, "name": you.name}, {$set: {"mutual": false}})
    }
    DB.Remove(data.refid, {"collection": "rival", "sdvxID": rival.id, "refid": data.rivalId, "name": rival.name})
    send.json({
      "msg": "Successfully removed profile from rival."
    })
  }
}

export const preGeneRoll = async (data: { set: number, refid: string, items: [] }, send: WebUISend) => {

  let itemId = {
    'crew': 11,
    'stamp': 17,
    'subbg': 18,
    'bgm': 19,
    'nemsys': 20,
    'sysbg': 21
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
        let checkId = 0;
        checkId = item['id']
        if(item['type'] == 17) checkId = (item['id'] / 4)
        if(item['type'] == itemId[Object.keys(preGeneSet.items)[rollWhat]] && preGeneSet.items[Object.keys(preGeneSet.items)[rollWhat]].includes(checkId)) {
          unobtainedItems.splice(unobtainedItems.indexOf(checkId), 1)
        }
      })
      if(unobtainedItems.length > 0) {
        let randomItemIndex = Math.floor(Math.random() * unobtainedItems.length);
        console.log("Rolled item id: " + unobtainedItems[randomItemIndex] + " | item type: " + itemId[Object.keys(preGeneSet.items)[rollWhat]])
        if(itemId[Object.keys(preGeneSet.items)[rollWhat]] == 17) {
          for(let stampID = (unobtainedItems[randomItemIndex] * 4) - 3; stampID <= (unobtainedItems[randomItemIndex] * 4); stampID++) {
            DB.Upsert(data.refid, {
              "collection": "item", 
              "type": itemId[Object.keys(preGeneSet.items)[rollWhat]], 
              "id": stampID },
              {$set: {"param": 1}}
            )
          }
        } else {
          DB.Upsert(data.refid, {
            "collection": "item", 
            "type": itemId[Object.keys(preGeneSet.items)[rollWhat]], 
            "id": unobtainedItems[randomItemIndex] },
            {$set: {"param": 1}}   
          )
        }
        let finalItemType = (Object.keys(preGeneSet.items)[rollWhat] === 'subbg') ? 'bg' : Object.keys(preGeneSet.items)[rollWhat]
        finishedRolling = true
        send.json(
          {
            status: 'ok',
            id: unobtainedItems[randomItemIndex],
            type: finalItemType
          }
        )
      } else {
        console.log("No more " + Object.keys(preGeneSet.items)[rollWhat] + " items to get, will re-roll.")
      }
    }
  } else console.log('pregeneset none')
}

export const preGeneReward = async (data: { reward: [], refid: string }, send: WebUISend) => {
  let reward = Object.values(data.reward)
  let rewardItem = await DB.Find<Item>(data.refid, {collection: 'item', type: reward[0], id: reward[1], param: reward[2]})
  if(rewardItem.length === 0) {
    DB.Upsert(data.refid, { collection: "item", type: reward[0], id: reward[1] }, { $set: { param: reward[2] } })
    send.json({
      received: true,
      reward: reward
    })
  } else {
    send.json({
      received: false,
      reward: reward
    })
  }
}


export const manageEvents = async (data: { eventConfig: {} }) => {
  IO.WriteFile('webui/asset/config/events.json', JSON.stringify(data.eventConfig, null, 4));
}

export const manageStartupFlags = async (data: { flagConfig: {} }) => {
  IO.WriteFile('webui/asset/config/flags.json', JSON.stringify(data.flagConfig, null, 4));
}
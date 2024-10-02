import { convcardnumber, eventLog } from "./handlers/common";
import { usergamedata } from "./handlers/usergamedata";
import { usergamedata_recv } from "./handlers/usergamedata_recv";
import { usergamedata_send } from "./handlers/usergamedata_send";
import { musicdataload, playerdatanew, playerdatasave, playerdataload, rivaldataload, ghostdataload, taboowordcheck, minidump } from "./handlers/ddrworld";
import { CommonOffset, OptionOffset, Profile } from "./models/profile";
import { ProfileWorld } from "./models/ddrworld";
import { SONGS_WORLD, SONGS_OVERRIDE_WORLD } from "./data/world"

export function register() {
  R.GameCode("MDX");

  R.Unhandled(undefined);

  R.Config("save_option", {
    name: "Save option",
    desc: "Gets the previously set options as they are.",
    default: true,
    type: "boolean"
  });
  R.Config("mdb_limited", {
    name: "musicdb.xml for musicdata_load",
    desc: "musicdb.xml file to use for importing limited and diffLv info. Put this xml file in the 'data' directory of the plugin.",
    type: "string",
    default: ""
  });
  R.Config("mdb_title", {
    name: "musicdb.xml for WebUI",
    desc: "musicdb.xml file to retrieve song titles from, for use in WebUI. Put this xml file in the 'data' directory of the plugin, or keep this blank if you want to use the same file as above.",
    type: "string",
    default: ""
  });

  const RoutePlayerData = (method: string, handler: EPR | boolean) => {
    R.Route(`playerdata.${method}`, handler);
  };

  const RoutePlayData = (method: string, handler: EPR | boolean) => {
    R.Route(`playdata_3.${method}`, handler);

  };

  const WordCheck = (method: string, handler: EPR | boolean) => {
    R.Route(`wordcheck_3.${method}`, handler);
  }

  const RouteSystem = (method: string, handler: EPR | boolean) => {
    R.Route(`system.${method}`, handler);
    R.Route(`system_3.${method}`, handler);
  };

  const RouteEventLog = (method: string, handler: EPR | boolean) => {
    R.Route(`eventlog.${method}`, handler);
    R.Route(`eventlog_3.${method}`, handler);
  };

  RoutePlayerData('usergamedata_advanced', usergamedata);
  RoutePlayerData('usergamedata_recv', usergamedata_recv);
  RoutePlayerData('usergamedata_send', usergamedata_send);
  RoutePlayData('musicdata_load', musicdataload);
  RoutePlayData('playerdata_new', playerdatanew);
  RoutePlayData('playerdata_load', playerdataload);
  RoutePlayData('playerdata_save', playerdatasave);
  RoutePlayData('rivaldata_load', rivaldataload);
  RoutePlayData('ghostdata_load', ghostdataload);
  RouteSystem("convcardnumber", convcardnumber);
  RouteSystem("minidump", minidump);
  RouteEventLog("write", eventLog);
  WordCheck('tabooword_check', taboowordcheck)

  R.WebUIEvent("updateName", async ({ refid, name }) => {
    let strdata: Profile | string[] = await DB.FindOne<Profile>(refid, { collection: "profile" });

    if (strdata) {
      strdata = strdata.usergamedata.COMMON.strdata.split(",");
      strdata[CommonOffset.NAME] = name;
      await DB.Update<Profile>(refid, { collection: "profile" }, {
        $set: {
          "usergamedata.COMMON.strdata": strdata.join(",")
        }
      });
    }
  });

  R.WebUIEvent("updateWeight", async ({ refid, weight }) => {
    let strdata: Profile | string[] = await DB.FindOne<Profile>(refid, { collection: "profile" });

    if (strdata) {
      strdata = strdata.usergamedata.COMMON.strdata.split(",");
      strdata[CommonOffset.WEIGHT] = weight;
      await DB.Update<Profile>(refid, { collection: "profile" }, {
        $set: {
          "usergamedata.COMMON.strdata": strdata.join(",")
        }
      });
    }
  });

  R.WebUIEvent("updateDisplayCalories", async ({ refid, selected }) => {
    let strdata: Profile | string[] = await DB.FindOne<Profile>(refid, { collection: "profile" });

    if (strdata) {
      strdata = strdata.usergamedata.COMMON.strdata.split(",");
      strdata[CommonOffset.WEIGHT_DISPLAY] = selected;
      await DB.Update<Profile>(refid, { collection: "profile" }, {
        $set: {
          "usergamedata.COMMON.strdata": strdata.join(",")
        }
      });
    }
  });

  R.WebUIEvent("updateArrowSkin", async ({ refid, selected }) => {
    let strdata: Profile | string[] = await DB.FindOne<Profile>(refid, { collection: "profile" });

    if (strdata) {
      strdata = strdata.usergamedata.OPTION.strdata.split(",");
      strdata[OptionOffset.ARROW_SKIN] = selected;
      await DB.Update<Profile>(refid, { collection: "profile" }, {
        $set: {
          "usergamedata.OPTION.strdata": strdata.join(",")
        }
      });
    }
  });

  R.WebUIEvent("updateGuideline", async ({ refid, selected }) => {
    let strdata: Profile | string[] = await DB.FindOne<Profile>(refid, { collection: "profile" });

    if (strdata) {
      strdata = strdata.usergamedata.OPTION.strdata.split(",");
      strdata[OptionOffset.GUIDELINE] = selected;
      await DB.Update<Profile>(refid, { collection: "profile" }, {
        $set: {
          "usergamedata.OPTION.strdata": strdata.join(",")
        }
      });
    }
  });

  R.WebUIEvent("updateFilter", async ({ refid, selected }) => {
    let strdata: Profile | string[] = await DB.FindOne<Profile>(refid, { collection: "profile" });

    if (strdata) {
      strdata = strdata.usergamedata.OPTION.strdata.split(",");
      strdata[OptionOffset.FILTER] = selected;
      await DB.Update<Profile>(refid, { collection: "profile" }, {
        $set: {
          "usergamedata.OPTION.strdata": strdata.join(",")
        }
      });
    }
  });

  R.WebUIEvent("updateJudgmentPriority", async ({ refid, selected }) => {
    let strdata: Profile | string[] = await DB.FindOne<Profile>(refid, { collection: "profile" });

    if (strdata) {
      strdata = strdata.usergamedata.OPTION.strdata.split(",");
      strdata[OptionOffset.COMBO_POSITION] = selected;
      await DB.Update<Profile>(refid, { collection: "profile" }, {
        $set: {
          "usergamedata.OPTION.strdata": strdata.join(",")
        }
      });
    }
  });

  R.WebUIEvent("updateDisplayTiming", async ({ refid, selected }) => {
    let strdata: Profile | string[] = await DB.FindOne<Profile>(refid, { collection: "profile" });

    if (strdata) {
      strdata = strdata.usergamedata.OPTION.strdata.split(",");
      strdata[OptionOffset.FAST_SLOW] = selected;
      await DB.Update<Profile>(refid, { collection: "profile" }, {
        $set: {
          "usergamedata.OPTION.strdata": strdata.join(",")
        }
      });
    }
  });

  R.WebUIEvent("updateName3", async ({ refid, name }) => {
    await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, {
      $set: {
        dancerName: name
      }
    });
  });

  R.WebUIEvent("updateWeight3", async ({ refid, weight }) => {
    await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, {
      $set: {
        weight: weight
      }
    });
  });

  R.WebUIEvent("updateDisplayCalories3", async ({ refid, selected }) => {
    await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, {
      $set: {
        isDispWeight: selected
      }
    });
  });

  R.WebUIEvent("getMDB", async (data: {}, send: WebUISend) => {
    let mdbData = []
    let mdbLimName = U.GetConfig('mdb_limited')
    let mdbTitleName = U.GetConfig('mdb_title')

    if(mdbLimName !== '') {
      if(IO.Exists('data/' + mdbLimName)) { 
        let mdbLim = U.parseXML(U.DecodeString(await IO.ReadFile('data/' + mdbLimName), "utf8"), false)
        
        mdbLim['mdb']['music'].forEach(music => {
          if(SONGS_WORLD.concat(SONGS_OVERRIDE_WORLD).findIndex(so => so.mcode === $(music).number('mcode')) < 0) {
            mdbData.push({
              mcode: $(music).number('mcode'),
              title: $(music).str('title'),
              diffLv: $(music).numbers('diffLv'),
              series: $(music).number('series')
            })
          }
        })
        let mdbTitle = (mdbTitleName === mdbLimName || mdbTitleName === '') ? mdbLim : U.parseXML(U.DecodeString(await IO.ReadFile('data/' + mdbTitleName), "utf8"), false)
        SONGS_WORLD.concat(SONGS_OVERRIDE_WORLD).forEach(sw => {
          let musicInfo = mdbTitle['mdb']['music'].find(m => $(m).number('mcode') === sw.mcode)
          let songTitle = 'ID ' + sw.mcode
          let series = 0
          if(musicInfo) {
            songTitle = $(musicInfo).str('title')
            series = $(musicInfo).number('series')
          }
          mdbData.push({
            mcode: sw.mcode,
            title: songTitle,
            diffLv: sw.diffLv,
            series: series
          })
        })
      } 
    }
    send.json({mdb: mdbData})
  })
}

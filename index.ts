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

  R.WebUIEvent("getMDB", async (data: {}, send: WebUISend) => {
    let mdbData = []
    if(IO.Exists('data/musicdb.xml')) { 
      let mdb = U.parseXML(U.DecodeString(await IO.ReadFile('data/musicdb.xml'), "shift_jis"), false)
      mdb['mdb']['music'].forEach(music => {
        if(SONGS_OVERRIDE_WORLD.findIndex(so => so.mcode === $(music).number('mcode')) < 0) {
          let diffLv = music.diffLv
          mdbData.push({
            mcode: $(music).number('mcode'),
            diffLv: $(music).numbers('diffLv')
          })
        }
      })
      SONGS_WORLD.concat(SONGS_OVERRIDE_WORLD).forEach(sw => {
        let mIndex = mdbData.findIndex(m => m.mcode === sw.mcode)
        if(mIndex > -1) mdbData[mIndex]['diffLv'] = sw.diffLv
        else {
          mdbData.push({
            mcode: sw.mcode,
            diffLv: sw.diffLv
          })
        }
      })
    } 
    send.json({mdb: mdbData})
  })
}

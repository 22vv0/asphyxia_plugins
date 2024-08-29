import { convcardnumber, eventLog } from "./handlers/common";
import { usergamedata } from "./handlers/usergamedata";
import { usergamedata_recv } from "./handlers/usergamedata_recv";
import { usergamedata_send } from "./handlers/usergamedata_send";
import { musicdataload, playerdatanew, playerdatasave, playerdataload, rivaldataload, ghostdataload, taboowordcheck, minidump } from "./handlers/ddrworld";
import { ProfileWorld } from "./models/profile3";  // Make sure this is the correct import path

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
  WordCheck('tabooword_check', taboowordcheck);

  R.WebUIEvent("updateName", async ({ refid, name }) => {
    console.log("We did it")
    let profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });

    if (profile) {
      profile.dancerName = name;
      await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, { $set: { dancerName: name } });
    }
  });

  R.WebUIEvent("updateWeight", async ({ refid, weight }) => {
    let profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });

    if (profile) {
      profile.weight = parseFloat(weight);
      await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, { $set: { weight: parseFloat(weight) } });
    }
  });

  R.WebUIEvent("updateDisplayCalories", async ({ refid, selected }) => {
    console.log("Received Display Calories Update:", refid, selected); // Debugging

    let profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });

    if (profile) {
      const isDispWeight = selected === '1';  // Convert to boolean
      console.log("Updating isDispWeight to:", isDispWeight); // Debugging

      await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, { $set: { isDispWeight } });

      // Verify that the update was successful
      const updatedProfile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });
      console.log("Updated Profile isDispWeight:", updatedProfile?.isDispWeight); // Debugging
    }
  });

  R.WebUIEvent("resetTodayCal", async ({ refid }) => {
  console.log("Resetting today's calories for:", refid);  // Debugging

  let profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });

  if (profile) {
    profile.todayCal = 0;  // Reset the todayCal field to 0
    await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, { $set: { todayCal: 0 } });
    console.log("Today's calories reset to 0 for profile:", refid);  // Debugging
  }
});


  R.WebUIEvent("updateArrowSkin", async ({ refid, selected }) => {
    let profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });
    console.log("WTF")

    if (profile) {
      profile.opArrowDesign = parseInt(selected);
      console.log(profile.opArrowDesign)
      await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, { $set: { opArrowDesign: parseInt(selected) } });
    }
  });

  R.WebUIEvent("updateGuideline", async ({ refid, selected }) => {
    let profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });

    if (profile) {
      profile.opGuideline = parseInt(selected);
      await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, { $set: { opGuideline: parseInt(selected) } });
    }
  });

  R.WebUIEvent("updateFilter", async ({ refid, selected }) => {
    let profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });

    if (profile) {
      profile.opLaneFilter = parseInt(selected);
      await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, { $set: { opLaneFilter: parseInt(selected) } });
    }
  });

  R.WebUIEvent("updateJudgmentPriority", async ({ refid, selected }) => {
    let profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });

    if (profile) {
      profile.opArrowPriority = parseInt(selected);
      await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, { $set: { opArrowPriority: parseInt(selected) } });
    }
  });

  R.WebUIEvent("updateDisplayTiming", async ({ refid, selected }) => {
    let profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });

    if (profile) {
      profile.opTimingDisp = parseInt(selected);
      await DB.Update<ProfileWorld>(refid, { collection: "profile3" }, { $set: { opTimingDisp: parseInt(selected) } });
    }
  });
}

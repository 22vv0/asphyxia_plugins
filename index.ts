import {common, log} from './handlers/common';
import {hiscore, rival, globalMatch, lounge, entryE} from './handlers/features';
import {
  updateProfile,
  copyResourcesFromGame,
  getRivalScores,
  addRival,
  preGeneRoll,
  preGeneReward,
  manageEvents,
  manageStartupFlags,
  addWeekly,
  getWeekRankList
} from './handlers/webui';
import {
  load,
  create,
  loadScore,
  save,
  saveScore,
  saveCourse,
  buy,
  print,
  saveValgene,
  saveE
} from './handlers/profiles';
import { ARENA } from './data/exg';
import { dataUpdate } from './handlers/migrate'

export function register() {

  R.Contributor("LatoWolf#1170");
  R.Contributor("22vv0");
  R.GameCode('KFC');

  R.Config('sdvx_eg_root_dir', { type: 'string', needRestart: true, default: '', name: 'Exceed Gear Data Directory', desc: 'The root directory of your SDVX Exceed Gear game files (for asset copying)'});
  R.Config('arena_szn',{ type: 'string', options: Object.keys(ARENA), default: 'None', name: 'Ranked Match Season', desc: 'Current ARENA/SINGLE BATTLE ranked season. Also sets ARENA STATION catalog corresponding to that season.'});
  R.Config('use_blasterpass',{ type: 'boolean', default: true, name:'Use Blaster Pass', desc:'Enable Blaster Pass for VW and EG'});
  R.Config('unlock_all_valk_items', { type: 'boolean', default: false, name:'Unlock All Valkyrie and Premium Items', desc: 'Unlock Nemsys, BGM, Submonitor BG, System BG and Stamp Items (Valk crews not included; check \'unlock all navigators\' option)'});
  R.Config('unlock_all_songs', { type: 'boolean', default: false, name:'Unlock All Songs'});
  R.Config('unlock_all_navigators', { type: 'boolean', default: false, name:'Unlock All Navigators'} );
  R.Config('unlock_all_appeal_cards', { type: 'boolean', default: false, name:'Unlock All Appeal Cards'});
  // R.Config('april_fools',{ type: 'boolean', default: false, name:'April Fools', desc:'Enable April Fools Event (toggles Grace crew + April Fools songs)'});
  // R.Config('new_year_special',{ type: 'boolean', default: false, name:'Use New Year Special', desc:'Enable New Year Special BGM for login.'});

  R.WebUIEvent('copyResourcesFromGame', copyResourcesFromGame);
  R.WebUIEvent('getRivalScores', getRivalScores);
  R.WebUIEvent('addRival', addRival);
  R.WebUIEvent('preGeneRoll', preGeneRoll);
  R.WebUIEvent('preGeneReward', preGeneReward);
  R.WebUIEvent('manageEvents', manageEvents);
  R.WebUIEvent('manageStartupFlags', manageStartupFlags);
  R.WebUIEvent('updateProfile', updateProfile);
  R.WebUIEvent('addWeekly', addWeekly);
  R.WebUIEvent('getWeekRankList', getWeekRankList);

  const MultiRoute = (method: string, handler: EPR | boolean) => {
    // Helper for register multiple versions.
    R.Route(`game.sv6_${method}`, handler);
  };

  // Common
  MultiRoute('common', common);

  // Profile
  MultiRoute('new', create);
  MultiRoute('load', load);
  MultiRoute('load_m', loadScore);
  MultiRoute('save', save);
  MultiRoute('save_m', saveScore);
  MultiRoute('save_c', saveCourse);
  MultiRoute('save_valgene', saveValgene);
  MultiRoute('frozen', true);
  MultiRoute('buy', buy);
  MultiRoute('print',print);

  // Features
  MultiRoute('hiscore', hiscore);
  MultiRoute('load_r', rival);

  // Lazy
  MultiRoute('lounge', lounge);
  MultiRoute('shop', (_, __, send) => send.object({
    nxt_time: K.ITEM('u32', 1000 * 5 * 60)
  }));
  MultiRoute('save_e', saveE);
  MultiRoute('save_mega', true);
  MultiRoute('play_e', true);
  MultiRoute('play_s', true);
  MultiRoute('entry_s', globalMatch);
  MultiRoute('entry_e', entryE);
  MultiRoute('exception', true);
  MultiRoute('log',log);
 
  R.Route('eventlog.write', (_, __, send) => send.object({
    gamesession: K.ITEM('s64', BigInt(1)),
    logsendflg: K.ITEM('s32', 0),
    logerrlevel: K.ITEM('s32', 0),
    evtidnosendflg: K.ITEM('s32', 0)
  }));
  
  R.Route('package.list',(_,__,send)=>send.object({
      package:K.ATTR({expire:"1200"},{status:"1"})
  }));
  
  R.Route('ins.netlog', (_, __, send) => send.object({
    //gamesession: K.ITEM('s64', BigInt(1)),
    //logsendflg: K.ITEM('s32', 0),
    //logerrlevel: K.ITEM('s32', 0),
    //evtidnosendflg: K.ITEM('s32', 0)
  }));
  
  R.Unhandled(undefined)

  dataUpdate()
}

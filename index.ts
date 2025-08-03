import { boot } from './handlers/pcb';
import { common } from './handlers/info';
import { getList } from './handlers/lobby';
import { pnew, start, read, readOption, readScore, writeMusic, write, logout } from './handlers/player';

export function register() {
  /* Register game code */
  R.GameCode('M39');

  /* A plugin can have multiple contributors. */
  R.Contributor('22vv0', 'https://github.com/22vv0');

  /* Register plugin configuration */
  // R.Config('event', {
  //   type: 'string',
  //   default: 'EVENT_1',
  //   options: ['EVENT_1', 'EVENT_2'],
  // });

  /*
    Register user-provided datafile
    This will allow user to upload their own data to the root of your plugin
    This file, for example, will be uploaded to "plugins/example@identifier/uploaded/data.xml"
   */
  // R.DataFile('uploaded/data.xml');

  /* Register your routes */
  // R.Route('example.method', example);
  R.Route('pcb24.boot', boot);
  R.Route('player24.new', pnew);
  R.Route('player24.start', start);
  R.Route('player24.read', read);
  R.Route('player24.read_option', readOption);
  R.Route('player24.read_score', readScore);
  R.Route('player24.write_music', writeMusic);
  R.Route('player24.write', write);
  R.Route('player24.logout', logout);
  R.Route('info24.common', common);
  R.Route('lobby24.getList', getList);
  
  /*
    Register a unhandled handler that print all unhandled methods.
    You should remove it before you publish your plugin,
      unless you have specific reason not to.
   */
  R.Unhandled();

  /* Insert or clear a existing document in plugin space */
  // DB.Upsert({ clicked: { $exists: true } }, { $set: { clicked: 0 } });

  /* Register a event and increment the click counter */
  // R.WebUIEvent('click', async data => {
  //   console.log('WebUI Button Clicked');
  //   await DB.Update({ clicked: { $exists: true } }, { $inc: { clicked: 1 } });
  // });

  /* Register a event and increment the click counter */
  // R.WebUIEvent('change', changeName);

  /* Register a event that respond with a random number */
  // R.WebUIEvent('random', randomNumber);

  /* Use --dev argument to enable console output. */
  // console.log('Plugin Registered');

  /*
    You can check the version of CORE using CORE_VERSION_MAJOR and CORE_VERSION_MINOR
    Note: these value can be undefined, which means the CORE is version v1.18 and under
   */
  // console.log(`Core Version: v${CORE_VERSION_MAJOR}.${CORE_VERSION_MINOR}`);
}

# SOUND VOLTEX

**Plugin Version:** fork-6.1.1

**Supported game versions:** EXCEED GEAR (2025052700)

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes** 
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)

Changelog
===========
### 6.1.1
- Added to licensed songs list:
	- CO5M1C R4ILR0AD
	- ヒュブリスの頂に聳えるのは
- Added stamp event:
	- REFLEC BEATスタンプ(2025)
- Added ARENA season 19 (SINGLE BATTLE) and ARENA STATION season 19 items list.
- Enabled ULTIMATE MATCH (and ULTIMATE RANK MATCH for ranked matches)

### Other changes:
- Changed the way ARENA data is set:
	- ARENA will now occur at the specified duration (start and end date.) You can override this by toggling the **Keep ARENA running** option in the plugin settings; choose whether to keep the latest ARENA season running past the end date.
	- You can now select which specific set of ARENA STATION items will be available for purchase using the **ARENA STATION set** option in the plugin settings.
- Minor changes to the ARENA data section of the profile details WebUI.
- Switched startup flag toggle value to false when generating new flags.json config file. ([#35](https://github.com/22vv0/asphyxia_plugins/issues/35))

Report issues
===========
#### Run asphyxia in dev mode 
1. Make sure you have npm in your machine. [Installing Node.js](https://nodejs.org/en/download) should do it.
2. From the asphyxia-core zip file, extract these files to your plugins folder:
	- plugins/asphyxia-core.d.ts
	- plugins/package.json
	- plugins/tsconfig.json
3. Open a command prompt/terminal window, cd to your asphyxia plugins folder, then install node and lodash typings by run these two commands:
	- npm install --save @types/lodash
	- npm install --save @types/node
4. Now from the asphyxia root folder, run asphyxia in dev mode by adding "--dev" after the executable filename (eg: asphyxia-core-x64.exe --dev). This should run and provide more logs during game runtime.

#### Create Github Issue
[Add an issue](https://github.com/22vv0/asphyxia_plugins/issues) to the GitHub repository and make sure to provide the logs from Asphyxia dev mode so I could have a better idea on where to check for bugs and issues.

#### RE: Standard Start issue on 2025042202
This is not a plugin issue but I feel it is necessary to share. I did notice this while testing VARIANT GATE but I forgot to mention it so I apologize. As mentioned in issue [#34](https://github.com/22vv0/asphyxia_plugins/issues/34), if you're having trouble playing Standard Start, what fixed it for me was adding these lines to your ea3-config.xml file, in ea3->pos->coin. I personally put it just under _kfc\_game\_s\_standard_:
```xml
      <kfc_game_s_standard_plus>
        <type __type="str">consume</type>
        <event __type="str">KFC.game.s.standard_plus</event>
        <player_ref __type="str">/coin/player1/ref_slotid</player_ref>
        <credit_ref __type="str">/coin/event</credit_ref>
      </kfc_game_s_standard_plus>
```
Then [re]start your game. Saving your data and starting a new Standard Start credit should now work fine. Also it looks like playing Standard Start in Skill Analyzer will cause the same problem to occur. In that case, doing the ea3-config fix above (or something similar) should be enough to resolve this problem as well.

Todo:
==========
1. Proper handling of appeal title customization.
2. More work on online matchmaking (idk if this is possible)

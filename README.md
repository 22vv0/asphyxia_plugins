# SOUND VOLTEX

**Plugin Version:** 6.2.0a

**Supported game versions:** EXCEED GEAR (2025062401)

**Required Asphyxia Core version** [1.50d](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50d)

**Notes** 
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)

Changelog
===========
### 6.2.0a
- Fixes game crash when loading and creating new profile data.
	- For some reason the game does not like variant gauge over_radar to be null, will check at a later date.
- Fixes for main profile page not loading due to VOLFORCE best 50 function issues with certain song IDs not being found in the imported music_db.json (ie. omnimix songs)
	- This will cause omnimix scores to not be included in the best 50 list.

### 6.2.0

- Updated licensed songs list:
	- あおばの足音
	- 覚悟せよ！エンタンメ～ン ～より身の切り売り自暴自棄版～
	- ギャ・ギャ・ギャ・ギャラクシー！
	- 悲報！ワイ！ニート！
	- エクスプロウル
	- アイスクリームマジック
- Added PREMIUM GENERATOR sets:
	- Vol. 6 (Yumebuki Grace set)
	- Kaga Sumire set
- Added event data: VARIANT GATE (永遠の紋様)
	- extra note: there may be a bug in version 2025062401 where you could not challenge 神凪 (MXM) in the first VARIANT GATE set. ([Twitter](https://x.com/SOUNDVOLTEX573/status/1938133931607662963))
- Enabled OVER POWER for VARIANT GATE
- Updated and fixed STAMP\_IGNORE\_DISABLE and SUBBG\_IGNORE\_DISABLE params.
- Updates to song unlock info handler in common.ts
	- changes made to include sending ULTIMATE charts
	- changes made to reduce unnecessary data being sent (ie. non-existent charts)
- Updates to profile save/load to include OVER POWER radar data.
- Updates to WebUI asset update
	- changes made to include ULTIMATE charts in music_db.json saving
	- included ULTIMATE charts to log output
- DB updates
	- added 'overRadar' key to 'variantgate' collection
- WebUI updates:
	- Added new VOLFORCE best 50 list table in main profile page.
	- Added ULT column to songs list page.
	- Added ULT to difficulty labels in scores list page.
	- Added ULT row to score statistics.
	- Fixed clear medal and score grade sorting in scores list page.
	- Fixes to Generator page for loading valgene_item stamp image files (they padded an extra 0 in the file name starting from item id 475)
	- Fixes to VARIANT GATE event config saving where the setting for minimum difficulty and rank applies to both sets instead of individually
- Updated psd_level.ifs texture extract info.
- Updated data.json file.


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
2. More work on online matchmaking (?)

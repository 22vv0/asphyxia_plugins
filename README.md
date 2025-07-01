# SOUND VOLTEX

**Plugin Version:** fork-6.1.0b

**Supported game versions:** EXCEED GEAR (2025042202)

**Unsupported game versions:**
- BOOTH
- INFINITE INFECTION
- GRAVITY WARS
- HEAVENLY HAVEN
- VIVID WAVE

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

Notes:
===========
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)

Report issues:
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
Add an issue to the GitHub repository and make sure to provide the logs from Asphyxia dev mode so I could have a better idea on where to check for bugs and issues.

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

Changelog
===========
### 6.1.0b
- Added attract mode demo video (/data/movie/demo/250225\_pekora\_demo)
	- Fixed how demo videos extend data are handled.
- Reimplemented Card Entry Information popups (will spam but they will show up only once, sorry!)
- Removed DEMOLOOP_INFORMATION on Startup Flags settings and re-added it to EVENT6.
- Removed VARIANT GATE song IDs from VALKYRIE_SONGS.
- Fixes to setting of weekly song date periods.

### 6.1.0a
- handlers/profiles.ts
	- Fixed MAXXIVE clear lamp overwriting UC and PUC clear lamps.
- data/exg.ts
	- Updated Valkyrie exclusive songs list:
		- VARIANT GATE songs added (need to confirm if they are not playable on Nemsys after Valk unlock, but for now they aren't)
	- Updated error in ARENA season title
		- "Season 18 (MEGAMIX BATTLE 2024/10/31～2024/11/25)" -> "Season 18 (MEGAMIX BATTLE 2025/03/13～2025/04/07)"
		- If running into undefined arena_items error, set your ARENA season setting again.
	- Renamed MEGAMIX songs list varname
		- "SDVX_AUTOMATION_SONGS" -> "MEGAMIX_SONGS"
- handlers/webui.ts, webui/asset/js/updateResources.js
	- More error handling (some errors should now output to the textarea)
- webui/question and answer.pug
	- Removed as it is outdated. Will put back should there be a need to.

### 6.1.0
- 20250205
	- Updated TAMANEKO ADVENTURE missions list.
		- ネメシスメトロポリス / KAC開催決定記念！オリジナル楽曲コンテスト2023 #3
- 20250212
	- Added PREMIUM GENERATOR (Meto Meu) data.
	- Added to licensed songs list:
		- チョコレートスマイル
		- じもとっこスイーツ♪
		- ロマンシングエスケープ
- 20250218
	- Added PREMIUM GENERATOR (Usada Pekora) data.
	- Added stamp event data: hololive SUPER EXPO 2025出展記念!コラボスタンプ
	- Added to licensed songs list:
		- いいわけバニー
		- 全人類　兎化計画！
		- ララララビット！！
		- 最強女神†ウーサペコラ
- 20250225
	- Added ARENA Season 18 data - rank match: MEGAMIX BATTLE
		- Added ARENA STATION set 18
- 20250317
	- Updated TAMANEKO ADVENTURE missions list.
		- ネメシスギャラクシー / ブルーガーデン
	- Added VALKYRIE GENERATOR Vol. 16 data.
- 20250324
	- Added PREMIUM GENERATOR (Kurumi Noah) set.
	- Added to licensed songs list:
		- かくれんぼ (胡桃のあ Cover)
	- Added Yukkuri April Fools startup flag.
- 20250422
	- Added VARIANT GATE data.
		- configure OVER TRACK settings in the UI. 
		- VARIANT POWER only available when VARIANT GATE is enabled.
	- Added PREMIUM GENERATOR (Ichika) set.
		- Roll all items to unlock extra alternate outfit.
	- Added ぼる×りこ Cross Resonance event.

### Minor changes/fixes:
- **Important:** Removed support for BOOTH - VIVID WAVE code.
- handlers/profiles.ts: Removed blaster_count and earned_extrack_energy: 
	- These are attributes removed in the 0422 update: this caused save func issues.
- data/exg.ts: 
	- added ids 167 and 170 to CHARACTER\_IGNORE\_DISABLE.
	- changed STAMP\_EVENTS6 to UNLOCK\_EVENTS6
	- Remove songs from VALKYRIE_SONGS. Multiple songs have since become available for NEMSYS mode as well.
- data/webui.ts:
	- Updated psd_level.ifs texture offsets.
- Removed custom login information message and game over screen.
- WebUI:
	- Updated Achievements list.
	- MAXXIVE Clear
		- fixed VOLFORCE calculation to account for MAXXIVE clears
		- added MAXXIVE label to score page
	- Unlock Events
		- Moved TAMANEKO ADVENTURE to new "Unlock Events" dropdown menu, alongside VARIANT GATE.


### Todo:

1. Proper handling of appeal title customization.
2. More work on online matchmaking (idk if this is possible)

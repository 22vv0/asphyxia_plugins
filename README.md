# SOUND VOLTEX

**Plugin Version:** fork-6.1.0a

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

Changelog
===========
## fork-6.1.0


### Fixes (6.1.0a)
- handlers/profiles.ts
	- Fixed MAXXIVE clear lamp overwriting UC and PUC clear lamps.
- data/exg.ts
	- Updated Valkyrie exclusive songs list:
		- VARIANT GATE songs added (need to confirm if they are not playable on Nemsys after Valk unlock, but for now they are, because they probably are)
	- Updated error in ARENA season title
		- "Season 18 (MEGAMIX BATTLE 2024/10/31～2024/11/25)" -> "Season 18 (MEGAMIX BATTLE 2025/03/13～2025/04/07)"
		- If running into undefined arena_items error, set your ARENA season setting again.
	- Renamed MEGAMIX songs list varname
		- "SDVX_AUTOMATION_SONGS" -> "MEGAMIX_SONGS"
- handlers/webui.ts, webui/asset/js/updateResources.js
	- More error handling (some errors should now output to the textarea)
- webui/question and answer.pug
	- Removed as it is outdated. Will put back should there be a need to.

### New:
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
	- changed STAMP_EVENTS6 to UNLOCK_EVENTS6
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


## fork-6.0.6

### Minor changes/fixes:
- Cleaned up ARENA data in exg.ts to minimize size.
- Updated Achievements list.
- Renamed "Unlocking Events" page to "Unlock Events"

### New:
- Updated TAMANEKO ADVENTURE mission list.
	- ネメシスメトロポリス / KAC開催決定記念！オリジナル楽曲コンテスト2023 #2
- Added ARENA Season 17 data - rank match: ARENA BATTLE (point system)
	- Added ARENA STATION set 17
- Added unlock events:
	- 2025 U,R,B,R,,, YE-AR---!!!ｷｬ----!!!!!! スタンプボーナス
	- 13th Anniversary PCB Refill Stamp Event
	- 13th anniversary Tsubaki-chan appeal card gift
- Added songs to licensed songs list:
	- 強風オールバック
	- 人マニア	
	- メズマライザー
	- テトリス
- Added VALKYRIE GENERATOR Vol. 15 data.


## fork-6.0.5

### Minor additions/fixes:
- Added SKILL ANALYZER 9 course data.

### New:
- Weekly Score Attack feature
	- See Weekly Score Attack page in WebUI (queue your own weekly song challenges, added via Song ID)
	- Line up weekly songs in advance via song ID. Weekly song will start every Monday 01:00 UTC.
	- Check current rankings by clicking on the difficulty icons.
	- Check rankings from the past 3 completed weeks.
- Added 3 songs to licensed songs list (nora2r songs).
- Updated TAMANEKO ADVENTURE mission list.
	- Removed TRACK LIBERATION plugin setting, it should work as intended in TAMANEKO ADVENTURE.
- Added PRECIOUS UNIVERSAL CELEBRATE stamp event.
	- Toggle on Unlocking Events -> Stamp Events
- Added ability to select favorite crews (FAVORITE\_CREW\_ENABLE)
- Added region unlock for chat stamps and submonitor BGs for select Premium Generator sets (SUBBG\_IGNORE\_DISABLE, STAMP\_IGNORE\_DISABLE)
- Updated max songNum to 2300. (for use with "Unlock all songs")
- Added force lock to 幸せになれる隠しコマンドがあるらしい (XCD.) Unlock via the Konami code.
- Added ability to display attract mode video (currently set to Houshou Marine demo video -- /data/movie/538/)
- Added mini handler for refill stamp sheets.
- Added WebUI labels to Houshou Marine items.
- Fixed error in Skill Analyzer data migration.



### Todo:

1. Proper handling of appeal title customization.
2. Figure out how to use image (png) files to appear in information/news popup.
3. More work on online matchmaking (idk if this is possible)

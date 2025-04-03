# SOUND VOLTEX

**Plugin Version:** fork-6.0.5

**Supported game versions:** EXCEED GEAR (2024121000)

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
===========
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)

**Report issues:**
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
## fork-6.0.5

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


## fork-6.0.4

### New:
- Added PREMIUM GENERATOR sets
	- この素晴らしい世界に祝福を！3 (Konosuba 3)
	- 宝鐘マリン (Houshou Marine)
- Added HEXADIVER 11 (NEMSYS GAME EXPO)
- Added BEMANI PRO LEAGUE S4 -Triple Tribe- event.
	- Toggle on Unlocking Events page -> Cross Events
- Added ARENA Season 16
	- Rank match: MEGAMIX BATTLE
	- Added ARENA STATION set 16
- Added songs to licensed songs list: Konosuba, Houshou Marine
- Added a few date-related events (Onigo day, Gott day, etc.)
- Updated MEGAMIX BATTLE songs list (89 new songs)
- Updated Achievements list
- Updated data.json (will add labels for Houshou Marine subbg at a later date)


## fork-6.0.3.7

### New:

1. Main:
	- MYSTICAL Re:UNION added to events list. Toggle the individual songs to unlock them to your account.

2. Misc:
	- **Important**: EG Skill Analyzer course IDs have been updated. The plugin's new migrate.ts should update your course data to reflect these new IDs but if there are issues with your course data, please let me know. 
	- KAC 2023 Skill Analyzer courses now displayed as it did officially (uses KAC jacket)
	- BPL Pro Player badge: display this instead of the BPL Supporter badge. Check the "BPL Pro Player" option in the customization page.
	- Force locked the song "無意識レクイエム (cosmobsp rmx)" to allow for the secret unlock method to work. Still overridden by the unlock songs option.
	- Updated VALKYRIE GENERATOR 7 item data: removed ID 33 from appeal stamp list. 
	- Updated placeholder names in data.json.

3. Issues:
	- Game crashes on continue screen when a Stamp Select event is enabled. Unsure if this is a plugin issue, or just an isolated gamedata issue.


### Todo:

1. Figure out how to use image (png) files to appear in information/news popup.
2. More work on online matchmaking (idk if this is possible)

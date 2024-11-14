# SOUND VOLTEX

**Plugin Version:** fork-6.0.4

**Supported game versions:** EXCEED GEAR (2024110500)

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
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


## fork-6.0.3.6

### New:

1. Main:
	- ARENA Rank Season 15 (ARENA BATTLE, point system)
		- ARENA STATION 15: no new songs/charts
	- PREMIUM GENERATOR Vol. 5 (Near & Noah EG Set)
		- Complete the set to get alternate style for Near & Noah.

2. Misc:
	- Added missing licensed songs released prior to EXCEED GEAR.
		- [GitHub](https://github.com/22vv0/asphyxia_plugins/issues/4)
	- Misc WebUI fixes.


### Todo:

1. Figure out how to use image (png) files to appear in information/news popup.
2. More work on online matchmaking (idk if this is possible)
3. Implement pro_team_id setting.

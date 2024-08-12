# SOUND VOLTEX

**Plugin Version:** fork-6.0.3.5

**Supported game versions:** EXCEED GEAR (2024080500)

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
## fork-6.0.3.5

### New:

1. Main:
	- Reflec Beat song stamp event added (ARACHNE set)
		- Toggle on "Unlocking Events -> Stamp Events -> REFLEC BEAT Song Stamp Event (2024)"
	- Added the new maps to TAMANEKO Adventure (3 Touhou songs + 4 XCD charts)
	- Added VALKYRIE GENERATOR (Touhou Project)


## fork-6.0.3.4a

### New:

1. Misc:
	- Updated webui data.json asset file (renamed some placeholder labels)
	- Removed most of webui image and audio assets to minimize size.
		- Run asset update to pull webui assets from game files.


## fork-6.0.3.4

### New:

1. Main:
	- 2024070900 support
	- Added ARENA season 14 (rank match: MEGAMIX BATTLE)
		- ARENA STATION set 14 added.
	- Added TAMANEKO Adventure: new unlock system where you complete map missions and earn food for TAMANEKO. Completing maps unlocks new songs and new XCD charts.
		- Track Liberation map can be enabled/disabled in the main settings.
		- Check 'Unlocking Events -> Stamp Events -> TAMA猫アドベンチャー (TAMANEKO Adventure)' to toggle the event.

2. Misc:
	- Updated Achievements list.


### Todo:

1. Figure out how to use image (png) files to appear in information/news popup.
2. More work on online matchmaking (idk if this is possible)
3. Implement pro_team_id setting.

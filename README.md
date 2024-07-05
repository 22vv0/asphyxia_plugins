# SOUND VOLTEX

**Plugin Version:** fork-6.0.3.3

**Supported game versions:** EXCEED GEAR (2024060401)

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
## fork-6.0.3.3

### New:

1. Main:
	- 2024060401 support
	- Added PREMIUM GENERATOR (角巻わため､ / Tsunomaki Watame set)
		- Note: subbg files from this pregene set are missing on some leaked update data, you will not be able to use those until those files are in your data.
	- Added Watame songs to licensed songs list (exg.ts)
	- Watame crew usable (exg.ts)

2. Misc
	- Added option to hide/show serverside-removed music (enabled by default)
	

## fork-6.0.3.2

### New:

1. Main:
	- 2024043001 support
	- Added ARENA season 13 (rank match: ARENA BATTLE point system)
		- ARENA STATION set 13 added.
	- VALKYRIE GENERATOR 14 added.
	- Added BPL S3 Stamp Event (eXLIPXe)
		- Check "Unlocking Events -> Stamp Events -> BEMANI PRO LEAGUE -SEASON 3- Special Stamp" to toggle the event.
2. Misc:
	- Updated ARENA STATION pricing to reflect real game server prices (might miss some though)


## fork-6.0.3.1

### New:

1. Main:
	- 2024040200 support
	- Added BPL Season 3 Complete Stamp Event - collect stamps by clearing the BPL S3 songs to unlock NEMSYS ARENA World Hexathlon and 2 new songs.
		- Check "Unlocking Events -> Stamp Events -> BPL S3 Complete Stamp Event" to toggle the stamp event.
	- Added Mini Grace gift.
		- Check "Unlocking Events -> Gift Events -> Mini Grace NEMSYS Crew Gift" to toggle the gift.
2. Misc:
	- Added option to apply frames on the appeal card. Check out "Appeal Card Frame" in the customization page for the list of frames.
	- Rival implementation. Check "Rivals" page under your profile.
		- Originally this plugin will send all profiles as rivals. Users can now make their own list of rivals.
		- Added simple score comparison table with your rival/s.
	- Cleaned up stamp event code & data.


### Todo:

1. Figure out how to use image (png) files to appear in information/news popup.
2. More work on online matchmaking (idk if this is possible)
3. Implement pro_team_id setting.
4. Reminder to add new achievements (when it is released officially)

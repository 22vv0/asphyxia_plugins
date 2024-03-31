# SOUND VOLTEX

**Plugin Version:** fork-6.0.3.0

**Supported game versions:** EXCEED GEAR (2024031801)

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
## fork-6.0.3.0

### New:

1. Main:
	- Added Premium Generator Set 4 (BPL S3)
	- Updated events.json to add weeks 6 & 7 of BPL event songs
2. Misc:
	- Fixed ARENA Season 12 rule from 1 (point system) to 2 (voting system)
	- Added ARENA-related startup flags to exg.ts (arena room id input, online/local match rule voting system, etc.)
	- Updated system backgrounds list in customize\_data\_ext.json (forgot to update it as it's manual, sorry...)
	- Added new APRIL\_RAINBOW\_LINE\_ACTIVE to startup flags toggle list. Don't know what it does currently.
		- Edit: Enables April Fools 2024 Effect: Rainbow lasers. Type V-RAN on search bar to enable.
	- Added lounge code (checks for active matches to toggle 'matching' indicator in lounge)
	- Fixes to profile customization WebUI js where 1: subbg selection doesn't match the one previewed, and 2: it provides the incorrect subbg file format. 
	- Some online matchmaking experimentations (still can't make it work though)


## fork-6.0.2.9

### New:

1. Main:
	- Updated events.json to add weeks 4 & 5 of BPL event songs.
	- Added Premium Generator (Nekomata Okayu) set.
	- Updated licensed songs list (Okayu songs)
2. Misc:
	- Added crew id 149 to CHARACTER\_IGNORE\_DISABLE
	- Tweaked Premium Generator odds (1% chance for a crew is a bit unfair lol, changed to 5%)


## fork-6.0.2.8d

### New:

1. Main:
	- Updated events.json to add startup flags for Valentines Day 2024 and White Day 2024.


### Todo:

1. Figure out how to use image (png) files to appear in information/news popup.
2. More work on online matchmaking (idk if this is possible)

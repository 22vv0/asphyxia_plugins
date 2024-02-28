# SOUND VOLTEX

**Plugin Version:** fork-6.0.2.8d

**Supported game versions:** EXCEED GEAR (2024020600)

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
## fork-6.0.2.8d

### New:

1. Main:
	- Updated events.json to add startup flags for Valentines Day 2024 and White Day 2024.


## fork-6.0.2.8c

### New:

1. Main:
	- Updated events.json to enable this week's BPL S3 SDVX songs unlock event, and the Triple Tribe songs.


## fork-6.0.2.8b

### New:

1. Main:
	- 2024020600 support
	- Updated events.json to include and enable BPL S3 SDVX Week 2 songs unlock event.
		- Added info on future song unlock events but they are disabled for now (shhhh)

2. Fixes:
	- Fixed songs not appearing when songs' distribution date === current date. This is for when "unlock all songs" is disabled; unaffected otherwise.


### Todo:

1. Figure out how to use image (png) files to appear in information/news popup.
2. More work on online matchmaking (globalMatch.) I can't seem to make clients establish a connection.


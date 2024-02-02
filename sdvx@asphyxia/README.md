# SOUND VOLTEX

**Plugin Version:** fork-6.0.2.8

**Supported game versions:** EXCEED GEAR (2024013001)

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
## fork-6.0.2.8

### New:

1. Main:
	- 2024013001 support
	- Added Valkyrie Generator 13.
	- Added 12th Anniversary Appeal Card Stamp Event
	- Added BPL S3 SDVX songs unlock toggle (unlocking events page)
	- Updated LICENSED_SONGS.


## fork-6.0.2.7

### New:

1. Main:
	- 2023121900 support
	- Added Arena Season 12 (Arena Battle)
		- Arena Station set 12 added.
	- Added Premium Generator (Coconatsu set)
		- **Small note:** latest available data is missing Coconatsu submonitor BG files. You can roll for them in the Premium Generator page but they aren't selectable in the customization page.
	- Added New Year 2024 appeal card + PCB event.
	- Updated LICENSED_SONGS.
2. WebUI:
	- Added MERRY_CHRISTMAS_2023 to startup flags options.
	- Minor JS fixes.

### Todo:

1. Figure out how to use image (png) files to appear in information/news popup.
2. More work on online matchmaking (globalMatch.) I can't seem to make clients establish a connection.


## fork-6.0.2.6

### New:

1. Main:
	- 2023120500 support.
	- Enabled HEXA DIVER 10.
	- Enabled HEXA REVOLUTION features.
	- Added SKILL ANALYZER 8 courses.
2. WebUI:
	- Added "Startup Flags" page - for toggling a few select game flags/events on the fly without restarting core, such as USE_CUDA_VIDEO_PRESENTER, etc.
	- Updated game achievements list.

# SOUND VOLTEX

**Plugin Version:** fork-6.0.2.6

**Supported game versions:** EXCEED GEAR (2023120500)

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
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

### Todo:

1. Figure out how to use image (png) files to appear in information/news popup.
2. More work on online matchmaking (globalMatch.) I can't seem to make clients establish a connection.


## fork-6.0.2.5

### New:

1. Main:
	- Added the new Kinoshita songs to LICENSED_SONGS list.


## fork-6.0.2.4

### New:

1. Main:
	- Updated EG course data (isNew flags)
2. WebUI:
	- Profile details
		- Added display of skill frames (normal or god.) Asset update required. 
			- frame might misalign a bit depending on window size, sorry
		- Added display of arena rank image. Asset update required.
		- Added display of your currently selected skill title.
		- Changed how Megamix rate and Ultimate rate is displayed in arena stats.
	- Asset update
		- Added ability to extract images/textures from .ifs files, with file information provided (seen on data/webui.ts.) Used to extract arena/skill course-related textures. Will probably utilize more in the future. Only ifs files used in latest data are supported.
			- Massive thanks to [mon's ifstools](https://github.com/mon/ifstools), the code where this feature is largely based on.
			- Added [pngjs library files](https://github.com/pngjs/pngjs) to handle PNG file creation. Couldn't find a more elegant way but this will do for now.
		- Added course_data.json update using the course data in exg.ts.
3. Other:
	- Added bgm_convert.sh file for Linux
	- Updated bgm_convert.bat

### Fixes:

1. WebUI
	- Fixed Japan-exclusive warning not displaying for some Premium Generator sets.

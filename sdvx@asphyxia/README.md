# SOUND VOLTEX

**Plugin Version:** fork-6.0.2.5

**Supported game versions:** EXCEED GEAR (2023110700)

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.
- Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
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

### Todo:
1. Figure out how to use image (png) files to appear in information/news popup.
2. More work on online matchmaking (globalMatch.) I can't seem to make clients establish a connection.


## fork-6.0.2.3

### New:

1. Main:
	- Added ~~ARENA~~ MEGAMIX BATTLE ranked match season & ARENA STATION set 11.
	- Added PREMIUM GENERATOR Fubuki set.
	- Updated licensed songs list (Fubuki songs)
2. WebUI
	- Updated ARENA Season statistics display in detail page. Displays rank, rank point meter, megamix rate (for ranked megamix,) ultimate rate (for ultimate players,) and arena power.
	- Added achievements list page (work in progress)
	- Added ability to set how many Valkyrie Generator tickets you have. These tickets are used to purchase valkyrie generator items.
	- Added ability to change Skill Titles. Players can only switch to titles they own.
	- (Update webui resources) Added code to extract wma audio from .s3p files. Largely based on [mon's s3p_extract](https://github.com/mon/s3p_extract) code.
3. Others:
	- DEMOLOOP_INFORMATION implementation (attract mode announcements images)
	- Updated bgm\_convert batch script to remove the need for s3p\_extract.

### Fixes:

1. Game
	- Fixed gibberish on Asphyxia card entry information data.
2. WebUI
	- Fixed details page error for players with no skill course data.
	- Fixed sorting of Valgene/Pregene item images.
3. Misc:
	- Updated BPL Triple Tribe event category from 'gift' to 'event_online.'
	- Added missing matchmaker model file.

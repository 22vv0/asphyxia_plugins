# DanceDanceRevolution

**Plugin Version:** fork-mdx-3.0.0b

**Supported game versions:** WORLD (2024061300)

**Unsupported game versions:** Everything below A20 is unsupported. A20 untested. A3 unsupported.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- This is a highly experimental messily-written plugin for MDX-2024061300 and things **WILL** break, please do not use any of your personal save data on this plugin. Use this for experimental & development purposes only. I am not responsible for any problems with your savedata. 
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Please back up your save data to prevent unwanted issues, especially while using this experimental plugin.
- Please please please feel free to open PRs!


Changelog
===========
## fork-mdx-3.0.0b

### New:

1. Main:
	- Flare skill song unlock event.... on Doubles.
		- Fixes crashes on Flare Skill rank up.... on Doubles (again, just tested until Mercury.)
		- Event list updated
	- ghostdata saving and loading (WIP, idk what ghost is)


## fork-mdx-3.0.0a

### New:

1. Main:
	- Flare skill song unlock event
		- Added event data (ddr@asphyxia/data/world.ts:EVENTS_WORLD)
		- Fixes crashes on Flare Skill rank up (at least until Mercury, haven't tested higher than that yet.)
	- musicdata_load
		- Put your musicdb.xml on 'ddr@asphyxia/data' folder. Tested with A3 musicdb.xml
		- Added musicdata for new WORLD songs (ddr@asphyxia/data/world.ts:SONGS_WORLD)


## fork-mdx-3.0.0

### New:

1. Main:
	- 2024061300 support (DDR World)
	- DDR profile registration for new and existing Asphyxia profiles
		- For Asphyxia profiles with no prior DDR A20/A3 profiles registered.
		- Transfer from A3 not supported (yet?)
	- Profile saving and loading (probably incomplete)
	- Score saving and loading (probably incomplete)


### To do:

1. Look for more missing features (I don't play DDR so idk what's missing lol)
2. Check flare skill value consistency
3. Transfer old save data from A3 to World (?)
4. Update re-rated song difficulties
5. WebUI Profile page
6. More work on score_str
7. Rival load

# DanceDanceRevolution

**Plugin Version:** fork-mdx-3.0.1

**Supported game versions:** WORLD (2024091000)

**Unsupported game versions:** Everything below A20 is unsupported. A20 untested. A3 unsupported.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- This is a WIP plugin for DDR World and things might break so please use this at your own risk.
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Please back up your save data to prevent unwanted issues, especially while using this experimental plugin.
- Please please please feel free to open PRs!


Changelog
===========
## fork-mdx-3.0.1

### New:

1. Main:
	- Updated events list & event loading code: 
		- Galaxy Play
		- EXTRA SAVIOR
		- MYSTICAL Re:UNION (songs automatically unlocked on login atm)
	- Attempts to fix ghost data loading:
		- Added ghost id to score and ghost data
		- Ghost data gets created when there is no existing data; and it gets updated when getting a higher or the same score. Side effect of this is when you have set a high score prior to this update, the ghost data won't be updated unless you break or match that high score. 
		- Unfortunately I could not find a way to match the old scores to their respective ghost data, since the old ghost data only stored the song id and difficulty, and not the style (single/double.)
	- World, Area and Machine #1 high score saving/loading (WIP)
		- Area high score: uses locationid to search, save and load scores. 
		- Machine high score: uses locationid and pcbid.
		- Ghost data also gets created for each new high score (overwritten when high score is broken/matched)


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


### To do:

1. Look for more missing features
2. Refactor getLastScoreId
3. WebUI stuff
4. More work on score_str
5. Rival load

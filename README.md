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

musicdb.xml Usage Guide
===========
1. Put your musicdb.xml file(s) in the _ddr@asphyxia/data_ directory.
2. Configure plugin settings:
	- There are 2 related fields in the plugin settings:
		- **_musicdb.xml for musicdata\_load_**: mdb file where song difficulty and limited info will be retrieved. Set this config to the filename of the musicdb.xml file you copied. This file is required for other songs to appear.
		- **_musicdb.xml for WebUI_**: mdb file where song titles will be retrieved, this will be used for WebUI stuff. If you have a different xml file you want to use, set this config to the filename of that other musicdb.xml file, or keep it blank to use the same musicdb.xml as above.
	- **Sample setup 1**: I use a modified World musicdb with all difficulties and limited info defined for all songs. I do not need to use a separate musicdb.xml for WebUI (but I would also update this file to include upcoming songs.)
	- **Sample setup 2**: I use the last A3 musicdb for musicdata\_load. This will set difficulty and limited data for songs released up until A3. World songs info will be set using SONGS\_WORLD defined in _data/world.ts_. Then I use World musicdb for WebUI, so I could get all titles of songs released up until World (I would need to replace this file every time the game updates its song list.)



Changelog
===========
### fork-mdx-3.0.1

- Support for 2024091000.
- Added list of old songs' re-rates in _data/world.ts:SONGS\_OVERRIDE\_WORLD_.
- Updated events list & event loading code: 
	- Galaxy Play
	- EXTRA SAVIOR
	- MYSTICAL Re:UNION (songs automatically unlocked on login)
- Attempts to fix ghost data loading:
	- Added ghost id to score and ghost data
	- Ghost data gets created when there is no existing \[compatible\] data; and it gets updated when getting a higher or the same score. Side effect of this is when you have set a high score prior to this plugin update, the ghost data won't be updated unless you break or match that high score. 
	- Unfortunately I could not find a way to match the old scores to their respective ghost data, since the old ghost data only stored the song id and difficulty, and not the style (single/double.)
- World, Area and Machine #1 high score saving/loading (WIP)
	- Area high score: uses locationid to search, save and load scores. 
	- Machine high score: uses locationid and pcbid.
	- Ghost data also gets created for each new high score (overwritten when high score is broken/matched)
- WebUI stuff (WIP) - musicdb.xml required for proper score display.
	- Basic profile info
	- Flare skill info
	- Music/score table


### fork-mdx-3.0.0b

- Flare skill song unlock event.... on Doubles.
	- Fixes crashes on Flare Skill rank up.... on Doubles (again, just tested until Mercury.)
	- Event list updated
- ghostdata saving and loading (WIP, idk what ghost is)


### fork-mdx-3.0.0a

- Flare skill song unlock event
	- Added event data (ddr@asphyxia/data/world.ts:EVENTS_WORLD)
	- Fixes crashes on Flare Skill rank up (at least until Mercury, haven't tested higher than that yet.)
- musicdata_load
	- Put your musicdb.xml on 'ddr@asphyxia/data' folder. Tested with A3 musicdb.xml
	- Added musicdata for new WORLD songs (ddr@asphyxia/data/world.ts:SONGS_WORLD)



To do:
===========

1. Look for more missing features
2. Refactor getLastGhostId
3. Refactor hiscore code
4. More WebUI stuff 
5. Figure out unknown values in score_str
6. Rival loading and figure out unknown values in rival record_str
7. Proper loading of Flare skill in-game (make sure to include only top 30 scores from classic, white and gold)

# DanceDanceRevolution

**Plugin Version:** fork-mdx-3.0.3f

**Supported game versions:** WORLD (2024101500)

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- This is a WIP plugin for DDR World and things might break so please use this at your own risk.
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Please back up your save data to prevent unwanted issues (just in case)

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
### fork-mdx-3.0.3f
- Added 7th WORLD LEAGUE.
	- Period: 06/19/25~07/16/25
	- Advanced Border for Gold class
- Updated song unlock info:
	- Time to HYPERDRIVE - LEAGUE Bronze class benefit (previously Silver class)
- Issue fix in WORLD LEAGUE where player data won't load when new League period is set but has not started yet.


### fork-mdx-3.0.3e

- Added 6th WORLD LEAGUE data
	- Period: 05/29/25~06/26/25
	- Advanced Border for Gold class
	- obviously, no new song benefits will be unlocked.
- Rewrote WORLD LEAGUE handler 
	- league status will update every 30 mins.
	- will start adding World League data regularly.
- Added song/chart info
	- Is this dance a Hakken? - League Silver class benefit  
	- Come Back To Me (CHA)


### fork-mdx-3.0.3d-fix1

- Fixes to music data table sorting.
- Fixed clear lamp not updating in certain cases.



To do:
===========

1. Look for more missing features
2. Refactor hiscore code
3. More WebUI stuff 
4. Figure out unknown values in score_str
5. Rival loading and figure out unknown values in rival record_str
6. Continue cleanup work on WORLD LEAGUE

# DanceDanceRevolution

**Plugin Version:** fork-3.0.5

**Supported game versions:** WORLD (2024122300)

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Please back up your save data to prevent unwanted issues (just in case)

Changelog
===========
### fork-3.0.5

- Added WebUI customization options: located in profile settings.
	- Character (P1/P2)
	- Lane Background (SINGLE/DOUBLE)
	- Lane Cover (SINGLE/DOUBLE)
	- Game Background (Song select/during play)
	- Background video display (ON/OFF/FULL SCREEN)

- Added customization data
	- Base customization items
	- PREMIUM CUSTOMIZER 1

- Added song/chart info:
	- EXTRA SAVIOR WORLD
		- Amazing Bomberman
		- Funky Flux Fusion
		- No More Love
		- 愛氏AIされ
	- Misc
		- Dance and Death
		- 白日と幻月
		- おひさし中華街！
		- イガク
		- メズマライザー
		- ラビットホール
		- Dance With Me
		- Hopeful (CHALLENGE)
		- Thank You Merry Christmas (CHALLENGE)

- Added event data:
	- EXTRA SAVIOR WORLD
		- BOMBERMAN
		- The 1st MUSIC CREATOR AUDITION


musicdb.xml Usage Guide
===========

1. Put your musicdb.xml file(s) in the _ddr@asphyxia/data_ directory.
2. Configure plugin settings:
	- There are 2 related fields in the plugin settings:
		- **_musicdb.xml for musicdata\_load_**: mdb file where song difficulty and limited info will be retrieved. Set this config to the filename of the musicdb.xml file you copied. This file is required for other songs to appear.
		- **_musicdb.xml for WebUI_**: mdb file where song titles will be retrieved, this will be used for WebUI stuff. If you have a different xml file you want to use, set this config to the filename of that other musicdb.xml file, or keep it blank to use the same musicdb.xml as above.
	- **Sample setup 1**: I use a modified WORLD musicdb with all difficulties and limited info defined for all songs. I do not need to use a separate musicdb.xml for WebUI (but I would also update this file to include upcoming songs.)
	- **Sample setup 2**: I use the last A3 musicdb for musicdata\_load. This will set difficulty and limited data for songs released up until A3. WORLD songs info will be set using SONGS\_WORLD defined in _data/world.ts_. Then I use WORLD musicdb for WebUI, so I could get all titles of songs released up until WORLD (I would need to replace this file every time the game updates its song list, and whenever songs released prior to WORLD get new charts or have their difficulties adjusted, SONGS\_OVERRIDE\_WORLD defined in _data/world.ts_ will handle them.)


To do:
===========

1. Look for more missing features
2. Refactor hiscore code
3. More WebUI stuff 
4. Figure out unknown values in score_str
5. Rival loading and figure out unknown values in rival record_str
6. Refactor WORLD LEAGUE


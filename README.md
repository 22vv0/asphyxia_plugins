# DanceDanceRevolution

**Plugin Version:** 3.2.0
- Check for newer plugin versions [here](https://github.com/22vv0/asphyxia_plugins/releases?q=mdx&expanded=true).

**Supported game versions:** WORLD (2026022400)

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50) and above

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Please back up your save data to prevent unwanted issues (just in case)

Changelog
===========
### WORLD

- Updated new song metadata and advance play list, etc
- Added EXTRA SAVIOR WORLD: MYSTICAL Re:UNION
- Added EXTRA SAVIOR WORLD: BEMANI PRO LEAGUE -SEASON 4- Triple Tribe
- Added EXTRA SAVIOR WORLD: BEMANI SELECTION vol.3
- Added EXTRA SAVIOR WORLD: The 1st ひなビタ♪ CHALLENGE
- Added EXTRA SAVIOR WORLD: The 1st GITADORA
- Added EXTRA SAVIOR WORLD: 音戯探偵ひなビタ♫
- Added GALAXY BRAVE: UNSTABLE
- Added GALAXY BRAVE: BREAKTHROUGH
- Added GALAXY BRAVE: BLAZING
- Added GALAXY BRAVE: SHOWDOWN
- Added GALAXY BRAVE: FORCE
- Added PREMIUM CUSTOMIZER 第5弾
- Added PREMIUM CUSTOMIZER 「東方Project」 第1弾
- Added PREMIUM CUSTOMIZER 「にじさんじダンス部」 第1弾
- Added PREMIUM CUSTOMIZER 「にじさんじダンス部」 第2弾
- Added PREMIUM CUSTOMIZER 音戯探偵ひなビタ♫ 調査依頼:BEMANI
- Added PREMIUM CUSTOMIZER 「GITADORA」 第1弾
- Added PREMIUM CUSTOMIZER 「pop'n music」 第1弾
- Added BEMANI PRO LEAGUE -SEASON 5- Triple Tribe song unlocks
- Added pop'n & DDR Cheers × Cheers!! song unlocks
- Updated WORLD LEAGUE benefits

### Misc

- Added toggle for WORLD LEAGUE

musicdb.xml Usage Guide
===========

1. Put your musicdb.xml file(s) in the _ddr@asphyxia/data_ directory.
2. Configure plugin settings:
	- There are 2 related fields in the plugin settings:
		- **_musicdb.xml for musicdata\_load_**: mdb file where song difficulty and unlock info will be retrieved. This file is required for songs released before WORLD to appear. WORLD songs' unlock info are defined in `data/world.ts:SONGS_WORLD`
		- **_musicdb.xml for WebUI_**: mdb file where song titles will be retrieved from, for WebUI usage. If you have a different xml file you want to use, upload your mdb file, or keep it empty to use the same musicdb.xml as above.
	- **Sample setup 1**: I use a modified WORLD musicdb with all difficulties and limited info defined for all songs. I do not need to use a separate musicdb.xml for WebUI (but I would also update this file to include upcoming songs.)
	- **Sample setup 2**: I use the last A3 musicdb for musicdata\_load. This will set difficulty and limited data for songs released up until A3. WORLD songs info will be set using SONGS\_WORLD defined in _data/world.ts_. Then I use WORLD musicdb for WebUI, so I could get all titles of songs released up until WORLD (I would need to replace this file every time the game updates its song list, and whenever songs released prior to WORLD get new charts or have their difficulties adjusted, SONGS\_OVERRIDE\_WORLD defined in _data/world.ts_ will handle them.)


To do:
===========

1. Figure out unknown values in score_str
2. Rival loading and figure out unknown values in rival record_str

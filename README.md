# DanceDanceRevolution

**Plugin Version:** fork-mdx-3.0.3d

**Supported game versions:** WORLD (2024101500)

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
### fork-mdx-3.0.3d-fix1

- Fixes to music data table sorting.
- Fixed clear lamp not updating in certain cases.


### fork-mdx-3.0.3d

- Fixed WebUI flare skill calculation mistake.
- Fixed getLastGhostId function.
- Added "unlock all songs" option. 
	- Still requires musicdb.xml to get the song ids.
- Added Triple Tribe 4 event data.
	- Gold cab exclusive, otherwise the songs will not appear in the songs list. 
	- You can use patches to force the game to imitate gold cab.
- Added "Step This Way" Challenge difficulties
- Added "MVP" to SONGS_WORLD.
- Added "Time to HYPERDRIVE" to SONGS_WORLD.
	- Song should appear if you're Silver rank in WORLD LEAGUE.
- Added new charts to advanced play
	- "1116"
	- "Sahara"
	- "High & Low" (CHA)
	- "ONYX" (CHA)
- Added new player customization options in Profile Settings.
	- BPL Team Supporter Appeal Board
- Added 2nd WORLD LEAGUE info
	- Will start 11/14 10:00 JST.
	- Will add Hakken difficulties as soon as it is revealed. 


### fork-mdx-3.0.2

- WORLD LEAGUE
	- I did my best emulating what I understand how WORLD LEAGUE works, so my apologies if there's something that isn't accurately implemented. But this is how it works right now:
		- Promotion and demotion borders are determined by the league score of the player in rank 1. If you play alone on your server, you'll automatically be rank 1 all the time.
			- Bronze class promotion border is set to >= 50% of the rank 1's score.
			- Silver class promotion and demotion borders are set to >= 65% and <= 15% of the rank 1's score, respectively.
			- Gold class demotion border is set to <= 15% as well.
		- League info and period is defined in data/world.ts:LEAGUE_WORLD.
			- League period ends after 'end' datetime.
			- Promotion/demotion occurs after 'summary' datetime.
			- Class benefits will apply depending on your class.
			- Note: Since difficulty level info isn't revealed until the songs are officially released, I cannot add them to the list yet. I will update this plugin with the correct song info once they are released officially.
- Privilege of early play: this filter now displays applicable songs (Grand Prix advanced play songs)
- WebUI stuff
	- Flare Data Page: displays your top 30 songs for Classic, White and Gold.
- Fixes
	- Rewrote getLastGhostId function.
	- Fixed "So What" and "Akatsuki" diffLv mix up.


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



To do:
===========

1. Look for more missing features
2. Refactor hiscore code
3. More WebUI stuff 
4. Figure out unknown values in score_str
5. Rival loading and figure out unknown values in rival record_str
6. Proper loading of Flare skill in-game (make sure to include only top 30 scores from classic, white and gold)

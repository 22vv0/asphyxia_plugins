# SOUND VOLTEX

**Plugin Version:** fork-6.0.2.3

**Supported game versions:** EXCEED GEAR

**Latest supported game datacode:** 2023102400

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- This fork enables a few of the features that are added in the later updates of Exceed Gear. However, I still highly recommend using the official stable version of the plugin. 
- Before using this plugin:
	- run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data update.
	- go to [Unlocking Events](/plugin/sdvx@asphyxia/unlocking%20events) and click "Apply" at least once. Check out the many options available while you're there.
	- also adjust the plugin settings at the WebUI dashboard to your liking.
- Don't expect stability, there might be some bugs. Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
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
	- Updated bgm_convert batch script to remove the need for s3p_extract.

### Fixes:

1. Game
	- Fixed gibberish on Asphyxia card entry information data.
2. WebUI
	- Fixed details page error for players with no skill course data.
	- Fixed sorting of Valgene/Pregene item images.
3. Misc:
	- Updated BPL Triple Tribe event category from 'gift' to 'event_online.'
	- Added missing matchmaker model file.

### Todo:
1. Figure out how to extract textures from .ifs files in TS/JS.
2. ~~Figure out how to extract audio files from .s3p files in TS/JS~~ Figure out how to convert wma audio to mp3 in JS/TS.
3. Figure out how to use image (png) files to appear in information/news popup.
4. More work/research on online matchmaking (globalMatch.) I can't seem to make clients establish a connection.


## fork-6.0.2.2

### New:

1. Event updates:
	- Enabled BPL S2 (SuddeИDeath) stamp event. Unlock all other songs first to make SuddeИDeath appear.
	- Added SDVX x CCJ song online crossover event.
	- Enabled item auto-unlock for 'cross_online' / cross events (X-record, BPL2021, Ichika, CCJ, etc.)
		- I would love to make point/progression systems for each event but it would take a lot of work and I would potentially need to update other games' plugins, so I'd rather not, and just give the option to unlock the songs automatically. Maybe in the future?
2. ARENA updates:
	- Ranked match and rule implementation:
		- The active ranked match game mode and the point system used depends on the individual season.
		- Some seasons will have the ARENA BATTLE as the active ranked match, some will have SINGLE BATTLE.
		- Point system/rule can either be based on score, or based on star point. As of the moment, only season 1 has used the score-based rule.
		- Reference: [BEMANIWiki](https://bemaniwiki.com/index.php?SOUND+VOLTEX+EXCEED+GEAR/ARENA+BATTLE#ONLINE_ARENA)
	- ARENA STATION catalog will still be based on the season it came out with.
	- Added option to not choose an active ARENA season.
3. Other:
	- Initial online matchmaking code (WIP / unfinished / doesn't work)
4. WebUI:
	- Added support for setting FX-R chat stamps.
	- Added video player for submonitor background videos (via Video.js)

### Fixes: 

1. Fixes WebUI resource update not adding video submonitor backgrounds. I 100% recommend updating your WebUI assets.


## fork-6.0.2.1

### Fixes:

1. Fixed missing Megamix songs (extend string param getting cut off)


## fork-6.0.2.0

### New:

1. Support for EG 2023091200
2. Added Arena Station 8, 9 and 10.
3. Added Valkyrie Generator Vol. 12
4. Added Premium Generator
	- Re:Zero Set 1
	- Re:Zero Set 2
	- Vol. 3
5. Enabled HEXADIVER 8 and 9
6. Added option for BPL Team Supporter banner
7. Added support for System Backgrounds
8. Added event data:
	- BPL S3 Triple Tribe songs unlock toggle (suspicions, etc.)
	- KAC 2023 song unlock toggle (パーフェクトイーター)
	- KAC 2023 song stamp event (for 累乗のカルマ)
	- KAC 2023 song stamp event (for Stylus & QQ)
9. Updated licensed songs and valk-exclusive songs list
10. Skill Analyzer God Mode implementation.
	- Special courses (Red Bull courses, etc.) do not have God Mode courses.
11. Added and fixed Skill Analyzer course data:
	- Sets 6 and 7
	- BMK2021 courses
	- Spring 2023 courses
	- KAC 2023 Qualifier course sets 1 & 2
12. Megamix Battle song list update

### Fixes:

1. Reduced songNum value from 3000 to 2100. Potential fix for some users with "unlock all songs" enabled who are experiencing request timeouts resulting in missing features and songs.
2. Fixed bug in stamp select data.
3. Fixed bug for when common.ts or profiles.ts is looking for a specific event key but it is undefined.
3. Skill Analyzer: skill level requirement for Lv.11 and ∞. Song input/unlock status must be met as well, or just use the unlock all songs option in the WebUI.

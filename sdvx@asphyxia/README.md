# SOUND VOLTEX

**Plugin Version:** fork-6.0.2.1

**Supported game versions:** EXCEED GEAR

**Latest supported game datacode:** 2023091200

**Unsupported game versions:** Every other game, as they're untested.

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50)

**Notes:**
- This fork enables a few of the features that are added in the later updates of Exceed Gear. However, I still highly recommend using the official stable version of the plugin. 
- Most importantly, for everything to properly work:
	- run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data update.
	- go to [Unlocking Events](/plugin/sdvx@asphyxia/unlocking%20events) and click "Apply" at least once. Check out the many options available while you're there.
- Don't expect stability, there might be some bugs. Please back up your save data to prevent unwanted issues (just in case)


Changelog
===========
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
	- KAC 2023 song unlock toggle (Perfect Eater)
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

### Todo:
1. BPL Season 2 Special Stamp Event Implementation
	- All songs on the stamp event selection screen should be completed and unlocked for SuddeИDeath to appear. Still don't know how to implement that.
2. Figure out how to use image (png) files to appear in information/news popup and in demo_info.
3. Megamix Battle song list updated but I cannot make a lot of them appear in the list.

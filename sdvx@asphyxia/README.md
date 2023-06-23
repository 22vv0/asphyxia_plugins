# SOUND VOLTEX

Plugin Version: **v6.0.0**

Message from repo fork:

- This fork enables a few of the features that are added in the later updates of Exceed Gear. However, I still highly recommend using the official stable version of the plugin. 
- Most importantly, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets) for everything to properly work.
- Don't expect stability, there might be some bugs. Please back up your data to prevent unwanted issues (just in case)

Supported Versions:

- BOOTH
- HEAVENLY HAVEN
- VIVIDWAVE
- EXCEED GEAR

Versions Not Supported:

- INFINITE INFECTION
- GRAVITY WARS

The plugin now mainly maintained versions:

- VIVIDWAVE
- EXCEED GEAR

Fork Changelog
===========
### Latest supported game version
- EG 2023042500

## fork-6.0.1.0

### New:

1. Support for EG 2023042500
2. S-PUC effect enabled (haven't tested yet. couldn't be bothered to try lol)
3. Player Radar enabled
4. Single Battle mode enabled (haven't tested, idk if it works as is)
5. Added stamp events
	- 2023 appeal card stamp event
	- 11th anniversary appeal card stamp event
6. Added the remaining BPL weekly song toggles
7. Added Valkyrie Generator Vol. 10 and Vol. 11
8. Added Premium Generator Vol. 2
9. Valkyrie Generator Volumes 1 to 5 can now be rolled in WebUI
10. Added Arena Station 6 and 7.
11. Updated MISSING_SONGS to include the new licensed songs (HIMEHINA, Synthion, etc.)

### Fixes:

1. Updated songNum from 2000 to 3000 since the mdb now passed 2000 music IDs (for use of Unlock All Songs option; otherwise it will base on the music_db.json in the assets file)
2. Updated rival feature to include r.exscore (fixes some crashes in song select screen)

### Todo:

1. BPL Season 2 Special Stamp Event Implementation
	- All songs on the stamp event selection screen should be completed and unlocked for SuddeИDeath to appear. Still don't know how to implement that.
2. Figure out how to use image (png) files to appear in information/news popup.
3. Implement BPL Supporter banner

## fork-6.0.0.2

### New:

1. Enabled stamp events. Check the Stamp Events dropdown at the [Unlocking Events](/plugin/sdvx@asphyxia/unlocking%20events) page to see which stamp events are available to toggle for now.

### Fixes:

1. Various event-related fixes
	- Re-did the Unlocking Events functionalities (categorized events by type, etc.)
	- Rewrote handling of these events in common.ts and profiles.ts

## fork-6.0.0.1

### New:

1. Support for 221220
2. Arena Station
3. Valkyrie Generator support -- requires Valkyrie mode
4. WebUI features:
	- [WebUI asset update](/plugin/sdvx@asphyxia/update%20webui%20assets) -- retrieves assets from sdvx data to update various webui assets such as the music db, bgm, submonitor bg, nemsys, crew, etc. Necessary to run for this plugin to properly work, and after updating arcade data.
	- [Unlocking Events page](/plugin/sdvx@asphyxia/unlocking%20events) -- a page to toggle unlocking of songs and other items unlocked by previous events (stamp events, etc.) 
	- [Profile pages](/plugin/sdvx@asphyxia/profiles):
		- Valkyrie Generator item list -- displays a profile's valkyrie/premium generator items that they've already unlocked
			- Gacha feature for Premium Generator
	- [Songs List](/plugin/sdvx@asphyxia/songs%20list) 
5. Handler for showing unlocked items on card entry.

### Fixes:

1. Various generator issues:
	- Incorrect valkyrie/premium generator volume data fixed
	- Generator code bug fixes.
2. April fools event trigger:
	- Code checks if date has "4/1" in it anywhere, which means it will trigger on dates like 4/10, and 4/15. This has been fixed.

Change Log
===========

## 6.0.0

1. Plugin version now follows the pattern (MAX SDVX VER,Plugin VER of supporting the MAX version of SDVX,hotfix).
2. Initial support for EXCEED GEAR.

## 1.1

1. Support VIVIDWAVE

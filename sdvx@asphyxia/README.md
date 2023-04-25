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
- 2022122001

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

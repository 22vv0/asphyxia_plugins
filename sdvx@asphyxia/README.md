Message from repo fork:

- This plugin update is for annoying people like me who doesn't want to use the unlock all feature lmao
- This fork enables a few of the features that are added in the later updates of Exceed Gear. However, I still highly recommend using the official stable version of the plugin. 
- Most importantly, run the [WebUI Resource Update](/plugin/sdvx@asphyxia/WebUI%20resource%20update) for everything to properly work.
- Don't expect stability, there might be some bugs. Please back up your data to prevent unwanted issues (just in case)

----------------------------
# SOUND VOLTEX

Plugin Version: **v6.0.0**

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

## fork-6.0.0.1 

### New:

1. Support for 221220
2. Arena Station
3. Valkyrie Generator support -- requires Valkyrie mode
4. WebUI features:
	- [WebUI asset update](/plugin/sdvx@asphyxia/WebUI%20resource%20update) -- retrieves assets from sdvx data to update various webui assets such as the music db, bgm, submonitor bg, nemsys, crew, etc. Useful for updating webui assets when new game updates happen.
	- [Events page (wip)](/plugin/sdvx@asphyxia/events%20and%20presents) -- a page to toggle unlocking of songs and other items unlocked by previous events (in-game or otherwise) 
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
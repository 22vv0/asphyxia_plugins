SOUND VOLTEX
===
**Plugin Version:** fork-7.1.0b
- Check for newer plugin versions [here](https://github.com/22vv0/asphyxia_plugins/releases?q=kfc&expanded=true).

**Supported game versions:**
- BOOTH (2013052900)
- infinite infection (2014102200)
- EXCEED GEAR (2025120900)
- ∇ (20260421xx)

**Required Asphyxia Core version** [1.50d](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50d) or above

**Notes**
- This is a fork of the [official Asphyxia SDVX plugin](https://github.com/asphyxia-core/plugins). If you have any concerns and issues with this fork of the plugin, please do **not** ask for support on the official Asphyxia channels, and do **not** contact the devs of the official plugin as they would not be able to help you because do not maintain this fork. Direct your concerns to the [GitHub issues page](https://github.com/22vv0/asphyxia_plugins/issues) of this repository.
- **Please keep a copy/backup of your savedata directory** so you have something to come back to in case of a problem with your database.
- Before using this plugin, make sure you have your latest `music_db.xml` files uploaded and run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and/or plugin update.

---
## Changelog

### ∇

- Added new songs to licensed songs list
- Added `PREMIUM GENERATOR (不知火フレア/Shiranui Flare)` data
- Added event data: `Shiranui Flare Stamp Event`
- Updated event data: `∇ Weekly Stamp Bonus` - added 5 stamp sheets
- Fixed `White Day 2026 Stamp Event` event data
- Updated `BLASTER GATE` data

### Misc

- Moved `∇ Weekly Stamp Bonus` to one toggle and made to only show one stamp sheet at a time (complete the current sheet for next ones to appear; needs re-toggling in events page to enable)
- Removed unused `skillanalyzer.js` asset
- Small update to stamp sheet extend data loading
- Added missing ids to `NAMEPLATE_BADGE_IGNORE_DISABLE`

---
## Extra notes

#### Important notes for players migrating from EXCEED GEAR to ∇
- Before logging in and migrating to ∇, **it is important to upload the latest EXCEED GEAR music_db.xml file and run the WebUI Asset Update** so the data migration feature could retrieve the songs' difficulty levels from the mdb, to calculate your ∇ VOLFORCE properly, or to as close as it can to your EG VF. In EG, the VF is calculated on the fly when you login, but in ∇ the individual chart VF is now being stored in DB.
- Data import to ∇ will copy your profile, scores, items, etc. from EG. You can continue playing EG using your migrated profile but it will have separate progression/data from ∇.
- Just a heads up that there is a bug in game version 20251224 that causes charts to not appear in the VOLFORCE POTENTIAL folder.
- Charts announced to have EX SCORES reset will be reset here as well.


#### RE: Standard Start issue on version 20250422+
This is not a plugin issue but I feel it is necessary to share. I did notice this while testing VARIANT GATE but I forgot to mention it so I apologize. As mentioned in issue [#34](https://github.com/22vv0/asphyxia_plugins/issues/34), if you're having trouble carding in after a Standard Start credit, what fixed it for me was adding these lines to your ea3-config.xml file, in ea3->pos->coin. I personally put it just under _kfc\_game\_s\_standard_:
```xml
      <kfc_game_s_standard_plus>
        <type __type="str">consume</type>
        <event __type="str">KFC.game.s.standard_plus</event>
        <player_ref __type="str">/coin/player1/ref_slotid</player_ref>
        <credit_ref __type="str">/coin/event</credit_ref>
      </kfc_game_s_standard_plus>
```
Then [re]start your game. Saving your data and starting a new Standard Start credit should now work fine. Also it looks like playing Standard Start in Skill Analyzer will cause the same problem to occur. In that case, doing the ea3-config fix above (or something similar) should be enough to resolve this problem as well.

---
## Report issues

#### Run asphyxia in dev mode 
1. Make sure you have npm in your machine. [Installing Node.js](https://nodejs.org/en/download) should do it.
2. From the asphyxia-core zip file, extract these files to your plugins folder:
	- plugins/asphyxia-core.d.ts
	- plugins/package.json
	- plugins/tsconfig.json
3. Open a command prompt/terminal window, cd to your asphyxia plugins folder, then install node and lodash typings by running these two commands:
	- npm install --save @types/lodash
	- npm install --save @types/node
4. Now from the asphyxia root folder, run asphyxia in dev mode by adding "--dev" after the executable filename (eg: asphyxia-core-x64.exe --dev). This should run and provide more logs during game runtime.

#### Create Github Issue
[Add an issue](https://github.com/22vv0/asphyxia_plugins/issues) to the GitHub repository and make sure to provide the logs from Asphyxia dev mode so I could have a better idea on where to check for bugs and issues.

---
## Todo:

1. Proper handling of appeal title customization.
2. Look into per-profile auto-unlock system

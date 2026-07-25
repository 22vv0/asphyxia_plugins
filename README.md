SOUND VOLTEX
===
**Plugin Version:** fork-7.1.7
- Check for newer plugin versions [here](https://github.com/22vv0/asphyxia_plugins/releases?q=kfc&expanded=true).

**Supported game versions:**
- BOOTH (2013052900)
- infinite infection (2014102200)
- GRAVITY WARS (2016121200)
- EXCEED GEAR (2025120900)
- ∇ (20260714xx)

**Required Asphyxia Core version** [1.50d](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50d) or above

**Notes**
- This is a fork of the [official Asphyxia SDVX plugin](https://github.com/asphyxia-core/plugins). If you have any concerns and issues with this fork of the plugin, please do **not** ask for support on the official Asphyxia channels, and do **not** contact the devs of the official plugin as they would not be able to help you because do not maintain this fork. Direct your concerns to the [GitHub issues page](https://github.com/22vv0/asphyxia_plugins/issues) of this repository.
- **Please keep a copy/backup of your savedata directory** so you have something to come back to in case of a problem with your database.
- Before using this plugin, make sure you have your latest `music_db.xml` files uploaded and run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and/or plugin update.


---
## Changelog

### ∇

- Updated current ARENA rank season: Season 2, ARENA BATTLE, point scoring (2026/07/16-2026/08/06)
- Added ARENA STATION set 2 data
- Added login gift: `Grim Aloe` appeal card
- Added event data: `Quiz Magic Academy Stamp Sheet`
- Added event data: `QMA Quiz Popup`
- Added questions list for `QMA Quiz Popup`

### Misc

- Added missing banner complete reward for `PREMIUM GENERATOR (QMA)` set
- Added new startup flag: crew outfit censors - `CHARACTER_KIND_DISABLE`
- Removed unnecessary quotes from some obj keys in `common.ts`
- Added PE identifiers for `getDateCodeInit()`

### WebUI

- `Startup flags`: Switch default toggle for new startup flags from `true` to `false`
- `Profile customization`: Updated max selectable item ids for profile version

---
## Extra notes

#### For infinite infection and GRAVITY WARS song unlock progress
- Most available AIO game files circulating online have modified mdb files that already have all charts unlocked. For accurate song unlock progress, it's advisable to use a clean/untouched music_db.xml file for the game. There are some clean mdb files available online; I'll let you look for them yourself. Will add missing song unlock methods in the future if there are some I missed.

#### GRAVITY WARS REAL GENERATOR print issues
- If you're playing GENERATOR START but is having print error loops that you can't get out of without closing the game/going to the test menu, it's likely because the game cannot find the texture files for the Genesis Cards, which are supposed to be in `data/graphics/chara_card`. Most AIO game files I could find do not have those files included so I'll let you look for them yourself as well.

#### RE: GRAVITY WARS game crashes/texture loading issues
- Honestly IDK either. This was a pain to work on because of the random crashes. Not sure if it's a plugin issue, spice issue or just my game copy, or even my machine. Hope y'all have a better experience with the game than I did.

#### Important notes for players migrating from EXCEED GEAR to ∇
- Before logging in and migrating to ∇, **it is important to upload the latest EXCEED GEAR music_db.xml file and run the WebUI Asset Update** so the data migration feature could retrieve the songs' difficulty levels from the mdb, to calculate your ∇ VOLFORCE properly, or to as close as it can to your EG VF. In EG, the VF is calculated on the fly when you login, but in ∇ the individual chart VF is now being stored in DB. You can get your 
- Data import to ∇ will copy your profile, scores, items, etc. from EG. You can continue playing EG using your migrated profile but it will have separate progression/data from ∇.
- Just a heads up that there is a bug in game version 20251224 that causes charts to not appear in the VOLFORCE POTENTIAL folder.
- Charts announced to have EX SCORES reset will be reset here as well.

#### RE: Standard Start issue on version 20250422+
This is not a plugin issue but I feel it is necessary to share. I did notice this while testing VARIANT GATE but I forgot to mention it so I apologize. As mentioned in issue [#34](https://github.com/22vv0/asphyxia_plugins/issues/34), if you're having trouble carding in after a Standard Start credit, what fixed it for me was adding these lines to your ea3-config.xml file, in `ea3/pos/coin`. I personally put it just under _kfc\_game\_s\_standard_:
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
## Usable Serial Codes

Serial code will be in the format of: `0000 0000 0000 xxxx` where `xxxx` is one of the serial codes below. All are reusable.

### GRAVITY WARS

- `3001` - GENERATOR ticket: LEGEND OF KAC special generator
- `3002` - GENERATOR ticket: Poster Campaign special generator
- `3003` - GENERATOR ticket: Entrance Dream Music CD special generator
- `3004` - GENERATOR ticket: Touhou Game Show Venue Postcard venue special generator
- `3005` - GENERATOR ticket: BEMANI x Touhou Project Ultimate Master Pieces CD special generator
- `3008` - GENERATOR ticket: Monster Strike MULTI BURST special generator

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

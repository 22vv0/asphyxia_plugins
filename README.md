SOUND VOLTEX
===
**Plugin Version:** fork-7.2.0
- Check for newer plugin versions [here](https://github.com/22vv0/asphyxia_plugins/releases?q=kfc&expanded=true).

**Supported game versions:**
- BOOTH (2013052900)
- infinite infection (2014102200)
- GRAVITY WARS (2016121200)
- HEAVENLY HAVEN (2019020600)
- EXCEED GEAR (2025120900)
- ∇ (20260714xx)

**Required Asphyxia Core version** [1.50d](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50d) or above

**Notes**
- This is a fork of the [official Asphyxia SDVX plugin](https://github.com/asphyxia-core/plugins). If you have any concerns and issues with this fork of the plugin, please do **not** ask for support on the official Asphyxia channels, and do **not** contact the devs of the official plugin as they would not be able to help you because do not maintain this fork. Direct your concerns to the [GitHub issues page](https://github.com/22vv0/asphyxia_plugins/issues) of this repository.
- **Please keep a copy/backup of your savedata directory** so you have something to come back to in case of a problem with your database.
- Before using this plugin, make sure you have your latest `music_db.xml` files uploaded and run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and/or plugin update.


---
## Changelog

### IMPORTANT!

- Moved some plugin settings to the `More Plugin Settings` section in `More Plugin Settings` page. Please configure before starting any game as the plugin will yield errors otherwise.
- Page rename: `Startup Flags` -> `More Plugin Settings`. Remove the following files if installing on top of a previous plugin version: `webui/startup flags.pug` and `webui/asset/js/flags.js` 

### HEAVENLY HAVEN

- Added support (profile creation, data save/load, etc)
- Data transfer from GRAVITY WARS (unlocked items, BLASTER GATE and POLICY BREAK progress)
- GRAVITY WARS scores loaded as legacy scores (infinite infection scores will not be displayed/transferred)
- Added new HH songs to POLICY BREAK list. As with previous games, you can add 3000pw per song per franchise per credit.
- Enabled Ω Dimension (phases 1-6)
- Added SKILL ANALYZER courses
- Added serial code entry
- Added info popups (shown once)
- Added stamp sheet event: `BisCoスペシャルスタンプ！`
- Added stamp sheet event: `BisCoスペシャルスタンプ 第二弾！`
- Added stamp sheet event: `私立BEMANI学園スペシャルスタンプ！`
- Added Ikiiki stamp sheet event: `～MÚSECA地方～`
- Added Ikiiki stamp sheet event: `BEMANI SUMMER GREETINGS`
- Added login gift: `POLICY BREAK Medley from SOUND VOLTEX x jubeat`

### ∇

- Added new weekly stamp sheets
- Updated game over textures list
- Added quiz questions

### EXCEED GEAR

- Login info popups decreased to 5 at a time

### GRAVITY WARS

- Updated `type` value for Skill LEVEL 11 and 12
- Tagged SKILL ANALYZER set 8 as new (for silver wing)

### Misc

- Updated custom Skill Title formatting
- Custom Appeal Titles (akanames) implementation (shared between EG/∇)
- Updated bgm_convert.bat script ([PR #96](https://github.com/22vv0/asphyxia_plugins/pull/96))
- Added `PluginSettings` db model to handle more plugin settings
- Renamed `EVENT` const in data files to `FLAGS`
- Handler code rewrites to add support for HH and the new `PluginSettings` handler + misc features
- Added playdata migrate code from GW to HH
- Fixed `serial` serial code reward item type error
- Removed some plugin settings; moved to `More Plugin Settings` + added HH mdb file upload button

### WebUI

- `More Plugin Settings` - Added Custom Appeal Titles section
- `More Plugin Settings` - Added More Plugin Settings section
- `More Plugin Settings` - Rewrote DOM append code for `Startup Flags`
- `Profile customization` - Made custom appeal titles selectable (∇ only)
- `Unlock Events` - Added HH event toggles
- JS rewrites to add support for HH

### Contributors

- [SBence](https://github.com/SBence) - More robust path handling in BGM conversion script ([#96](https://github.com/22vv0/asphyxia_plugins/pull/96))

---
## Todo:

1. Proper handling of appeal title customization.
2. Look into per-profile auto-unlock system
3. Look into how to make VF calculation on ∇ profile details page more accurate  

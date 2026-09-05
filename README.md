SOUND VOLTEX
===
**Plugin Version:** fork-7.2.0-qfix
- Check for newer plugin versions [here](https://github.com/22vv0/asphyxia_plugins/releases?q=kfc&expanded=true).

**Supported game versions:**
- BOOTH (2013052900)
- infinite infection (2014102200)
- GRAVITY WARS (2016121200)
- HEAVENLY HAVEN (2019020600)
- VIVID WAVE (2020122200)
- EXCEED GEAR (2025120900)
- ∇ (20260714xx)

**Required Asphyxia Core version** [1.50d](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50d) or above

**Notes**
- This is a fork of the [official Asphyxia SDVX plugin](https://github.com/asphyxia-core/plugins). If you have any concerns and issues with this fork of the plugin, please do **not** ask for support on the official Asphyxia channels, and do **not** contact the devs of the official plugin as they would not be able to help you because do not maintain this fork. Direct your concerns to the [GitHub issues page](https://github.com/22vv0/asphyxia_plugins/issues) of this repository.
- **Please keep a copy/backup of your savedata directory** so you have something to come back to in case of a problem with your database.
- Before using this plugin, make sure you have your latest `music_db.xml` files uploaded and run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and/or plugin update.


---
## Changelog

### qfix

- Fix server errors caused by unconfigured plugin settings

### IMPORTANT!

- Moved some plugin settings to the `More Plugin Settings` section in `More Plugin Settings` page. Please configure before starting any game as the plugin will yield errors otherwise.
- Page rename: `Startup Flags` -> `More Plugin Settings`. Remove the following files if installing on top of a previous plugin version: `webui/startup flags.pug` and `webui/asset/js/flags.js` 

### ∇

- Updated game over textures list
- Added quiz questions
- Updated weekly stamp sheets data (+ added new ones)

### EXCEED GEAR

- Migrate from VIVID WAVE (unlocked items, BLASTER unlocks and POLICY BREAK progress, etc.) Note that this is only for profiles that do not yet have EXCEED GEAR play data.
- VIVID WAVE scores loaded as legacy scores and count towards your VOLFORCE (scores from HEAVENLY HAVEN and below will not be displayed/transferred)
- Login info popups list decreased to 5 at a time

### VIVID WAVE

- Added support (profile creation, data save/load, etc)
- Migrate from HEAVENLY HAVEN (unlocked items, BLASTER unlocks and POLICY BREAK progress, etc.)
- HEAVENLY HAVEN scores loaded as legacy scores and count towards your VOLFORCE (scores from GRAVITY WARS and below will not be displayed/transferred)
- Added new VW songs to POLICY BREAK list. As with previous games, you can add 3000pw per song per franchise per credit.
- Added SKILL ANALYZER courses
- Enabled Ω Dimension (phases 1-8)
- Enabled HEXA DIVER (parts 1-3)
- Enabled AUTOMATION PARADISE (save/load mixes)
- Added VOLFES data (toggle in `More Plugin Settings`)

### HEAVENLY HAVEN

- Added support (profile creation, data save/load, etc)
- Migrate from GRAVITY WARS (unlocked items, BLASTER GATE and POLICY BREAK progress, etc.)
- GRAVITY WARS scores loaded as legacy scores (scores from infinite infection and below will not be displayed/transferred)
- Added new HH songs to POLICY BREAK list. As with previous games, you can add 3000pw per song per franchise per credit.
- Enabled Ω Dimension (phases 1-6)
- Added SKILL ANALYZER courses
- Added serial code entry
- Added info popups (shown once)
- Added stamp sheet events: see full list in `Unlock Events` page under version `HEAVENLY HAVEN`
- Added login gift: `POLICY BREAK Medley from SOUND VOLTEX x jubeat`

### GRAVITY WARS

- Updated `type` value for Skill LEVEL 11 and 12 courses
- Tagged SKILL ANALYZER set 8 as new (for silver wing)
- Updated song unlock metadata

### Misc

- Updated `loadScore` to support loading of legacy scores (score data from one version down) without needing to migrate them
- Added ability to use custom Appeal Titles (shared between VW/EG/∇)
- Updated custom Skill Title formatting
- Added an extra handler for more Plugin Settings separate from the dashboard (Check WebUI changelogs for more info)
- Moved some existing plugin settings to the new `More Plugin Settings` page
- Handler code rewrites to add support for HH and the new `PluginSettings` handler + misc features
- Added playdata migrate codes (GW to HH; HH to VW; VW to EG)
- Removed score migration code in `viiMigrate` to favor legacy score loading instead (with on-the-fly VF calculation)
- Fixed `serial` serial code reward item type error
- Renamed `EVENT` const in game data files to `FLAGS`
- Removed `pluginVer` from `Profile` model.
- Updated bgm_convert.bat script ([PR #96](https://github.com/22vv0/asphyxia_plugins/pull/96))

### WebUI

- `More Plugin Settings` - Added Custom Appeal Titles section
- `More Plugin Settings` - Added More Plugin Settings section
- `More Plugin Settings` - Rewrote DOM append code for `Startup Flags`
- `Profile customization` - Made custom appeal titles selectable (VW and above only)
- Added `Automation Paradise Mixes` page to browse and search mixes
- `Unlock Events` - Added HH event toggles
- Added `Your Mixes` to Profile tabs: repurposed `Automation Mixes` page from official plugin repo
- Added HH and VW mdb file upload
- WebUI JS rewrites to add support for HH and VW

### Contributors

- [SBence](https://github.com/SBence) - More robust path handling in BGM conversion script ([#96](https://github.com/22vv0/asphyxia_plugins/pull/96))

---
## Todo:

1. Proper handling of appeal title customization.
2. Look into per-profile auto-unlock system
3. Look into how to make VF calculation on profile details page more accurate per-game version
4. GW - VW recommended song folder
5. Look for original stamp sheet text for GW/HH/VW if available

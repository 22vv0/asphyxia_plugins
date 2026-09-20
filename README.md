SOUND VOLTEX
===
**Plugin Version:** fork-7.2.2-qfix
- Check for newer plugin versions [here](https://github.com/22vv0/asphyxia_plugins/releases?q=kfc&expanded=true).

**Supported game versions:**
- BOOTH (2013052900)
- infinite infection (2014102200)
- GRAVITY WARS (2016121200)
- HEAVENLY HAVEN (2019020600)
- VIVID WAVE (2020122200)
- EXCEED GEAR (2025120900)
- ∇ (2026091500)

**Required Asphyxia Core version** [1.50d](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50d) or above

**Notes**
- This is a fork of the [official Asphyxia SDVX plugin](https://github.com/asphyxia-core/plugins). If you have any concerns and issues with this fork of the plugin, please do **not** ask for support on the official Asphyxia channels, and do **not** contact the devs of the official plugin as they would not be able to help you because do not maintain this fork. Direct your concerns to the [GitHub issues page](https://github.com/22vv0/asphyxia_plugins/issues) of this repository.
- **Please keep a copy/backup of your savedata directory** so you have something to come back to in case of a problem with your database.
- Before using this plugin, make sure you have your latest `music_db.xml` files uploaded and run the WebUI Asset Update. Do this every data and/or plugin update.


---
## Changelog

### qfix

- Fixed IFS import error when either A: plugin folder name is not set exactly as `sdvx@asphyxia`, or B: core was executed from a different directory ([#108](https://github.com/22vv0/asphyxia_plugins/issues/108))

### ∇

- Added `VALKYRIE GENERATOR hololive dreams x BEMANI`
- Added 6 new songs to MEGAMIX BATTLE
- Updated licensed songs list
- Updated beginner songs list

### EXCEED GEAR

- Added more missing licensed songs to list (applies to ∇)

### Misc

- Updated getDateCodeInit() PE list
- Updated song title translate_table

---
## Todo:

1. Proper handling of appeal title customization.
2. Look into per-profile auto-unlock system
3. Look into how to make VF calculation on profile details page more accurate per-game version
4. GW - VW recommended song folder
5. Look for original stamp sheet text for GW/HH/VW if available

# DanceDanceRevolution

**Plugin Version:** 3.2.1
- Check for newer plugin versions [here](https://github.com/22vv0/asphyxia_plugins/releases?q=mdx&expanded=true).

**Supported game versions:** WORLD (2026032400)

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50) and above

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Please back up your save data to prevent unwanted issues (just in case)

Changelog
===========

### WORLD

- Added event data: DAN RANK — requires uploaded `coursedb.xml`
- Added event data: BEMANI PRO LEAGUE -SEASON 5- Triple Tribe Append
- Added event data: DAN RANK song unlock — 足神様ノ復活祭
- Added event data: EXTRA SAVIOR WORLD - The 4th MUSIC CREATOR AUDITION
- Updated songs list
- Added PREMIUM CUSTOMIZER 「秋のコナステ大感謝祭2024」

### Misc

- Data upload for `coursedb.xml` to populate course data and for use in WebUI
- Added block to score saving if mcode is `-1` during saveKind 2 (a case for Dan courses)
- Added Dan Course saving during saveKind 3
- Added ex-score to `score_str`
- `loadEventData` update to check for Dan 

### WebUI

- Added Dan Rankings section to `Profile > Details` page
- Added `Profile > Course Data` page — check your Dan course data

musicdb.xml Usage Guide
===========

### Upload your DDR music_db xml file(s)

#### File uploads
* `musicdb.xml for musicdata_load`: musicdb.xml file to use for importing unlock and difficulty level info. Note that the plugin has its own unlock info/diff level overrides (`SONGS_OVERRIDE_WORLD` in `data/world.ts`) that will take priority over this.
* `musicdb.xml for WebUI`: musicdb.xml file to retrieve song titles from, for use in WebUI. It's recommended to use the mdb found in the same game version you're playing on. Keep this blank if you want to use the same file as above.

#### Sample setups
1. I use a modified WORLD musicdb with all difficulties and limited info defined for all songs. I do not need to use a separate musicdb.xml for WebUI (but I would also update this file to include upcoming songs.)
2. I use the last A3 musicdb for `musicdata_load`. This will set difficulty and limited data for songs released up until A3. WORLD songs info will be set using `SONGS_WORLD` defined in `data/world.ts`. Then I use WORLD musicdb for WebUI, so I could get all titles of songs released up until WORLD (I would need to replace this file every time the game updates its song list, and whenever songs released prior to WORLD get new charts or have their difficulties adjusted, `SONGS_OVERRIDE_WORLD` defined in `data/world.ts` will handle them.)

### Configure plugin settings:
* `Unlock all songs`: makes all songs playable. Requires mdb xml to pull song ids from.
* `WORLD LEAGUE`: activates WORLD LEAGUE if toggled on while there is an ongoing season.


To do:
===========

1. Rival loading and figure out unknown values in rival record_str

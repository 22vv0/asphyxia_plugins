# DanceDanceRevolution

**Plugin Version:** 3.2.0a
- Check for newer plugin versions [here](https://github.com/22vv0/asphyxia_plugins/releases?q=mdx&expanded=true).

**Supported game versions:** WORLD (2026022400)

**Required Asphyxia Core version** [1.50c](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50) and above

**Notes:**
- Please be aware that this plugin and the savefile it produces are incompatible with the official plugin, or any other forks. Please be cautious of using other plugins' savefiles with this fork of the plugin, or using this fork's savefile with other plugins.
- Please back up your save data to prevent unwanted issues (just in case)

Changelog
===========

### Misc

- Plugin now saves all scores and ghost data (as opposed to only PB)
- Implement rival registration and rival PB display in-game
- Updated missing `score_str` and `record_str` param values
- PB scores now store lamp and grade for rivaldata_load
- Updated profile customization loading to support random selection per-credit

### WebUI

- Added `Profile > Rivals` page: add and remove up to 10 rivals and register up to 3 to compare scores with in-game
- Updated the customization options in `Profile > Settings` to allow for random customization items to be used.

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

1. Figure out unknown values in score_str
2. Rival loading and figure out unknown values in rival record_str

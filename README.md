# SOUND VOLTEX

**Plugin Version:** fork-7.0.1

**Supported game versions:** 
- EXCEED GEAR (2025120900 final)
- ∇ (2026020300)

**Required Asphyxia Core version** [1.50d](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50d)

**Notes**
- This is a fork of the [official Asphyxia SDVX plugin](https://github.com/asphyxia-core/plugins). If you have any concerns and issues with this fork of the plugin, please do **not** ask for support on the official Asphyxia channels, and do **not** contact the devs of the official plugin as they would not be able to help you because do not maintain this fork. Direct your concerns to the [GitHub issues page](https://github.com/22vv0/asphyxia_plugins/issues) of this repository.
- **Please keep a copy/backup of your savedata directory** so you have something to come back to in case of a problem with your database.
- Before using this plugin, run the [WebUI Asset Update](/plugin/sdvx@asphyxia/update%20webui%20assets). Do this every data and plugin update.


Important notes for players migrating from EXCEED GEAR to ∇
===========
- Before logging in to ∇, **it is important to run the WebUI Asset Update** as the plugin needs at least the latest EG music_db to pull difficulty level info from so the plugin could calculate your ∇ VOLFORCE properly, or to as close as it can to your EG VF. In EG, the VF is calculated on the fly when you login, but in ∇ the individual chart VF is now being stored in DB.
- Data import to ∇ will copy your profile, scores, items, etc. from EG. You can continue playing EG using your migrated profile but it will have separate progression/data from ∇.
- Just a heads up that there is a bug in game version 20251224 that causes charts to not appear in the VOLFORCE POTENTIAL folder.
- Charts announced to have EX SCORES reset will be reset here as well.

Changelog
===========
### fork-7.0.1

- ∇
	- Added/enabled event toggles (see Unlock Events page)
		- Unlock events:
			- Achievement Event Missions
				- 初音ミク (Hatsune Miku) missions -- clear songs on VOCALOID folder to progress
		- Item gifts:
			- BPL S5 song gifts
		- Stamp events:
			- 初音ミク (Hatsune Miku) stamp event -- play songs on VOCALOID folder to earn stamps
			- ∇ Weekly Stamp events
				- \#7: Onigo jacket sticker + PC/BLC
				- \#8: チョコぶき sticker + PC/BLC
				- \#9: 猫の日2026 sticker + PC/BLC
				- \#10: 梅花 sticker + PC/BLC
	- Updated BLASTER GATE song list
		- BPL S5 songs (will appear a week after release)

- WebUI:
	- Added Premium Generator (初音ミク) to WebUI generator banner list
		- Customization items list updated.

- Misc:
	- Fixed WebUI generator obtained items count calculation
	- Changed rolled item upsert condition
	- Added missing items to IGNORE_DISABLE
		- Asumi Sena (subbg, appeal stamps) (EG/∇)
		- Hatsune Miku (crew, subbg, appeal stamps, board stickers)  


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

Report issues
===========
#### Run asphyxia in dev mode 
1. Make sure you have npm in your machine. [Installing Node.js](https://nodejs.org/en/download) should do it.
2. From the asphyxia-core zip file, extract these files to your plugins folder:
	- plugins/asphyxia-core.d.ts
	- plugins/package.json
	- plugins/tsconfig.json
3. Open a command prompt/terminal window, cd to your asphyxia plugins folder, then install node and lodash typings by run these two commands:
	- npm install --save @types/lodash
	- npm install --save @types/node
4. Now from the asphyxia root folder, run asphyxia in dev mode by adding "--dev" after the executable filename (eg: asphyxia-core-x64.exe --dev). This should run and provide more logs during game runtime.

#### Create Github Issue
[Add an issue](https://github.com/22vv0/asphyxia_plugins/issues) to the GitHub repository and make sure to provide the logs from Asphyxia dev mode so I could have a better idea on where to check for bugs and issues.

Todo:
==========
1. Proper handling of appeal title customization.
2. More work on online matchmaking (?)

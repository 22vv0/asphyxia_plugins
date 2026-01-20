# SOUND VOLTEX

**Plugin Version:** 7.0.0a

**Supported game versions:** 
- EXCEED GEAR (2025120900)
- ∇ (2026011300)

**Required Asphyxia Core version** [1.50d](https://github.com/asphyxia-core/asphyxia-core.github.io/releases/tag/v1.50d)

**Notes** 
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
### 7.0.0a-fix1

- ∇
	- Added events
		- 14th Anniversary Appeal Card Gift

- Misc:
	- Fixed incorrect display of data in the profile detail page's statistics.
	- Updated song title translate table.


### 7.0.0a

- ∇
	- Added events
		- BPL S5 songs gift (1 song)
		- BEMANI PRO LEAGUE -SEASON 5-! Team Appeal Card gift (7 cards)
		- ▽ Weekly Stamp Bonus stamp events
			- Week 4: 14th anniversary sticker (2026/01/15)
			- Week 5: Snowman Maxima sticker (2026/01/22)
			- Week 6: 5000 pc (2026/01/29)
		- BLASTER GATE
			- SOUND VOLTEX PERFECT ULTIMATE COMPLETE TRACKS ～Legend of KAC with Ω～ (9 songs)
			- TAMANEKO ADVENTURE Songs (30 songs)
			- TAMANEKO ADVENTURE XCD (9 charts)
			- BPL S5 songs (will appear 1 week after release)

- Misc:
	- Updated Blue Diamond stamp event data (updated title)
	- Increased unlockAppealParts item ID limit.
	- Added start date check for unlockables and events
		- Still can be overridden by auto unlock toggles.

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

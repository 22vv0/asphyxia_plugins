export interface PluginSettings {
	collection: 'settings';

	akanames: string[];
	gwScoreAdjTime: number;
	gwMission: boolean;
	gwMissionSkipMatch: boolean;
	gwGenerator: boolean;
	nblArenaNoEnd: boolean;
	nblArenaStation: string;
}
import type { Skill } from '@models';
import type { HeroName, Stats } from '@types';
import type { DifficultyOptions, LanguageOptions } from '@enums';
import { readFileSync, writeFileSync } from 'fs';

const heroSkills = JSON.parse(readFileSync('./data/heroSkills.json', 'utf-8')) as Record<HeroName, Skill[]>;
const heroStats = JSON.parse(readFileSync('./data/heroStats.json', 'utf-8')) as Record<HeroName, Stats>;

class GameSettings {
	difficulty: DifficultyOptions;
	language: LanguageOptions;
	unlockedHeroes: HeroName[];

	constructor() {
		const settings = JSON.parse(readFileSync('./data/gameSettings.json', 'utf-8'));
		this.difficulty = settings.difficulty;
		this.language = settings.language;
		this.unlockedHeroes = settings.unlockedHeroes;
	}

	public setDifficulty(difficulty: DifficultyOptions) {
		this.difficulty = difficulty;
		this.save();
	}

	public setLanguage(language: LanguageOptions) {
		this.language = language;
		this.save();
	}

	public setUnlockedHeroes(unlockedHeroes: HeroName[]) {
		this.unlockedHeroes = unlockedHeroes;
		this.save();
	}

	public save() {
		const settings = {
			difficulty: this.difficulty,
			language: this.language,
			unlockedHeroes: this.unlockedHeroes,
		};
		writeFileSync('./data/gameSettings.json', JSON.stringify(settings, null, 2));
	}
}

const gameSettings = new GameSettings();

export {
	heroSkills,
	heroStats,
	gameSettings,
};

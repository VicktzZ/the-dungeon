import type { Skill } from '@models';
import type { HeroName, Stats } from '@types';
import hSkills from './heroSkills.json';
import hStats from './heroStats.json';

const heroSkills = hSkills as unknown as Record<HeroName, Skill[]>;
const heroStats = hStats as unknown as Record<HeroName, Stats>;

export {
	heroSkills,
	heroStats,
};

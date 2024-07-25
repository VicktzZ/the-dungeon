import type {Difficult} from '@types';

export const difficultModificator = (diff: Difficult) => {
	return {
		player:
			diff === 'Easy'
				? 1.2
				: diff === 'Medium'
				? 1.0
				: diff === 'Hard'
				? 0.75
				: 0.5,
		monster:
			diff === 'Easy'
				? 0.8
				: diff === 'Medium'
				? 1.0
				: diff === 'Hard'
				? 1.25
				: 1.5,
	};
};

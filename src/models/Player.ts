import type { HeroName } from '@types';
import { Hero } from './Hero';

class Player extends Hero {
	public constructor(name: HeroName) {
		super(name)
	}
}

export let player: Player;
export function createPlayer(name: HeroName) {
	player = new Player(name)
}


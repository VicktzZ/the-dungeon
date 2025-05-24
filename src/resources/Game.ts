import { action, makeAutoObservable, observable } from 'mobx';
import { Dungeon } from '@resources/Dungeon';
import type { Difficult, Views } from '@types';

export class Game {
	@observable public screen: Views = 'MENU';
	@observable public playerScore: number = 0;
	@observable public difficult: Difficult = 'Medium';
	@observable public dungeon: Dungeon = new Dungeon();

	constructor() {
		makeAutoObservable(this);
	}

	// Methods

	new(game: Partial<Game>) {
		this.screen = game.screen || 'MENU';
		this.playerScore = game.playerScore || 0;
		this.difficult = game.difficult || 'Medium';
		this.dungeon = game.dungeon || new Dungeon();
	}

	reset() {
		this.screen = 'MENU';
		this.playerScore = 0;
		this.difficult = 'Medium';
		this.dungeon = new Dungeon();
	}

	generateDungeon() {
		this.dungeon = new Dungeon();
	}
}

export let game = new Game();

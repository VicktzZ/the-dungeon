import {action, makeAutoObservable, observable} from 'mobx';
import {Dungeon} from '@resources/Dungeon';
import {GameScreen, MainScreen} from '@views';
import type {Difficult, Screens} from '@types';

export class Game {
	@observable protected dungeon: Dungeon = new Dungeon();
	@observable protected screen: Screens = 'main';
	@observable protected score: number = 0;
	@observable public title: string = 'The Dungeon';
	@observable private diff: Difficult = 'Medium';

	public screens: Record<Screens, () => JSX.Element> = {
		main: MainScreen,
		game: GameScreen,
	};

	constructor() {
		makeAutoObservable(this);
	}

	// GETTERS & SETTERS

	get currentScreen() {
		return this.screen;
	}

	get difficult() {
		return this.diff;
	}

	@action
	set currentScreen(screen: Screens) {
		this.screen = screen;
	}

	@action
	set difficult(difficult: Difficult) {
		this.diff = difficult;
	}
}

export const game = new Game();

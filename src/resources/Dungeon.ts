import type {Event} from '@types';
import {makeAutoObservable, observable} from 'mobx';
import gen from 'random-seed';

export class Dungeon {
	private seed: string = Math.random().toString();
	private gen = gen.create(this.seed);

	@observable floor = 0;
	events: Event[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	getRandomEvent(): Event {
		return this.events[this.gen.intBetween(0, this.events.length)] as Event;
	}

	getSeed(): string {
		return this.seed;
	}
}

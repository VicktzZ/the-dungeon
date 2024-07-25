import {makeObservable} from 'mobx';
import {Entity} from './Entity';

export class Enemy extends Entity {
	constructor(name: string) {
		super({name, hp: 100, atk: 10, def: 5, level: 1});

		makeObservable(this);
	}
}

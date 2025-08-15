import {makeObservable} from 'mobx';
import {Entity} from './Entity';

export class Enemy extends Entity {
	constructor(name: string) {
		super(name, 1, { hp: 100, atk: 10, def: 5, mp: 10, spd: 1 });

		makeObservable(this);
	}
}

import {action, makeObservable, observable} from 'mobx';

export class Entity {
	@observable hp: number;
	@observable level: number;
	name: string;
	atk: number;
	def: number;

	constructor({name, hp, atk, def, level}: Partial<Entity>) {
		this.name = name!;
		this.hp = hp ?? 0;
		this.atk = atk ?? 0;
		this.def = def ?? 0;
		this.level = level ?? 0;

		makeObservable(this);
	}

	@action
	attack(target: Entity): void {
		target.hp -= this.atk;
	}

	@action
	defend(target: Entity): void {
		this.hp -= target.atk - this.def < 0 ? 0 : target.atk - this.def;
	}
}

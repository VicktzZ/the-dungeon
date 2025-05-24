import type { Stats } from '@types';
import {action, makeObservable, observable} from 'mobx';
import type { Skill } from './Skill';

export class Entity {
		@observable public name: string;
		@observable public maxHp: number; // Aumenta a vida máxima
		@observable public hp: number; // Vida atual
		@observable public maxMp: number; // Necessário para usar magias
		@observable public mp: number; // Magia atual
		@observable public atk: number; // Adiciona este valor ao ataque
		@observable public def: number; // Adiciona este valor à defesa na hora de calcular o dano recebido
		@observable public spd: number; // Aumenta a chance de se esquivar do ataque
		@observable public lvl: number;

		@observable public skills: Skill[] = [];

		public constructor(name: string, lvl: number, stats: Stats) {
			this.name = name;
			this.maxHp = stats.hp;
			this.hp = stats.hp;
			this.maxMp = stats.mp;
			this.mp = stats.mp;
			this.atk = stats.atk;
			this.def = stats.def;
			this.spd = stats.spd;
			this.lvl = lvl;

			makeObservable(this);
		}
}

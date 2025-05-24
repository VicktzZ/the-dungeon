import type { HeroName } from "@types";
import { Entity, type Skill } from "@models";
import { makeObservable, observable } from "mobx";
import { heroSkills, heroStats } from "@data";

export class Hero extends Entity {
	@observable public exp: number;
	@observable public money: number = 0;
	@observable protected availableSkills: Skill[] = [];

	public constructor(name: HeroName) {
		super(name, 1, heroStats[name]);
		this.exp = 0;
		this.availableSkills = heroSkills[name];

		makeObservable(this);
	}

	public useSkill(skill: Skill) {
		if (this.mp < skill.mpCost) {
			return;
		}

		this.mp -= skill.mpCost;
		skill.effect(this);
	}
}

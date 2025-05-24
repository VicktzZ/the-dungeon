import type { SkillType } from "@types";
import type { Entity } from "./Entity";

export class Skill {
	public name: string;
	public description: string;
	public mpCost: number;
	public accuracy: number;
	public cooldown: number;
	public cooldownRemaining: number;
	public type: SkillType;
	public effect: (...entities: Entity[]) => void;

	public constructor(name: string, description: string, mpCost: number, accuracy: number, cooldown: number, type: SkillType, effect: (...entities: Entity[]) => void) {
		this.name = name;
		this.description = description;
		this.mpCost = mpCost;
		this.accuracy = accuracy;
		this.cooldown = cooldown;
		this.cooldownRemaining = cooldown;
		this.type = type;
		this.effect = effect;
	}
}


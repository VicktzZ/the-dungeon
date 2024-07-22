import { makeObservable, observable } from "mobx";
import { Entity } from "./Entity";
import type { Difficult } from "@types";
import { difficultModificator } from "@utils";

export class Player extends Entity {
    money: number
    @observable xp: number = 0

    constructor(name: string, difficult: Difficult) {
        const { player: diffMod } = difficultModificator(difficult)

        super({
            name,
            hp: Math.ceil(100 * diffMod),
            atk: 10,
            def: 5,
            level: 1
        });

        if (difficult === 'Easy') this.money = 100
        else if (difficult === 'Medium') this.money = 50
        else this.money = 0

        makeObservable(this)
    }
}
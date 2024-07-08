import { makeObservable, observable } from "mobx";
import { Entity } from "./Entity";

export class Player extends Entity {
    money: number = 0
    @observable xp: number = 0

    constructor(name: string) {
        super({ name, hp: 100, atk: 10, def: 5, level: 1 });

        makeObservable(this)
    }
}
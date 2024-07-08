import { action, makeObservable, observable } from "mobx";
import { Dungeon } from "@utils/Dungeon";
import type { Screens } from "@types";
import { GameScreen, MainScreen } from "@screens";

export class Game {
    @observable protected dungeon: Dungeon = new Dungeon()
    @observable protected screen: Screens = 'main'
    @observable protected score: number = 0
    @observable public title: string = 'The Dungeon'

    public screens: Record<Screens, () => JSX.Element> = {
        main: MainScreen,
        game: GameScreen
    }

    constructor() {
        makeObservable(this)
    }

    get currentScreen() {
        return this.screen
    }

    @action
    set currentScreen(screen: Screens) {
        this.screen = screen
    }
}

export const game = new Game()
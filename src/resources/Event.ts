import type { MapTiles } from "@enums";

export class DungeonEvent {
    private mapTile: MapTiles;

    constructor(mapTile: MapTiles) {
        this.mapTile = mapTile;
        this.start()
    }

    public start() {}
}
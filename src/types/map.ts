import type { MapTiles } from "@enums";

export type MapRow = MapTiles[];
export type GameMap = MapRow[];

export interface MapConfig {
    width: number;
    height: number;
    startPos: number;
    endPos: number;
    pathWidth: number;
	seed: string;
}

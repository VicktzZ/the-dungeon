import { generateMap, renderMap } from "@utils";
import { config } from "@utils/mapGenerator";

const gameMap = generateMap(config);
const playerPos = { x: config.startPos, y: Math.floor(config.height / 2) };

console.log(renderMap(gameMap, playerPos));

function movePlayer(dx: number, dy: number) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (newX >= 0 && newX < config.width &&
        newY >= 0 && newY < config.height &&
        gameMap[newY][newX] !== ' ') {
        playerPos.x = newX;
        playerPos.y = newY;
        console.clear();
        console.log(renderMap(gameMap, playerPos));
    }
}

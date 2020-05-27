const mapGen = require('./map');
const term = require('terminal-kit');
const context = mapGen.context;
const monsterContext = mapGen.monsterContext;
const character = mapGen.character;
const monster = mapGen.monster;
const emptyObject = mapGen.emptyObject;
const printMap = mapGen.printMap;
// This controls the movement of the character
const move = (key, mapVisible, mapLogic) => {
  if (key === 'w' && context.x > 0 && mapLogic[context.x - 1][context.y].passeable) { // We check what is around us
    mapVisible[context.x][context.y] = emptyObject.sprite;
    mapVisible[context.x - 1][context.y] = character;
    mapLogic[context.x][context.y] = emptyObject;
    mapLogic[context.x - 1][context.y] = character;
    context.x--;
    printMap(mapVisible);
  }
  if (key === 's' && context.x < mapVisible.length - 1 && mapLogic[context.x + 1][context.y].passeable) {
    mapVisible[context.x][context.y] = emptyObject.sprite;
    mapVisible[context.x + 1][context.y] = character;
    mapLogic[context.x][context.y] = emptyObject;
    mapLogic[context.x + 1][context.y] = character;
    context.x++;
    printMap(mapVisible);
  }
  if (key === 'a' && context.y > 0 && mapLogic[context.x][context.y - 1].passeable) {
    mapVisible[context.x][context.y] = emptyObject.sprite;
    mapVisible[context.x][context.y - 1] = character;
    mapLogic[context.x][context.y] = emptyObject;
    mapLogic[context.x][context.y - 1] = character;
    context.y--;
    printMap(mapVisible);
  }
  if (key === 'd' && context.y < mapVisible[0].length - 1 && mapLogic[context.x][context.y + 1].passeable) {
    mapVisible[context.x][context.y] = emptyObject.sprite;
    mapVisible[context.x][context.y + 1] = character;
    mapLogic[context.x][context.y] = emptyObject;
    mapLogic[context.x][context.y + 1] = character;
    context.y++;
    printMap(mapVisible);
  }
  if ((key === 'd' && context.y < mapVisible[0].length - 1 && mapLogic[context.x][context.y + 1].dangerous) ||
      (key === 'a' && context.y > 0 && mapLogic[context.x][context.y - 1].dangerous) ||
      (key === 's' && context.x < mapVisible.length - 1 && mapLogic[context.x + 1][context.y].dangerous) ||
      (key === 'w' && context.x > 0 && mapLogic[context.x - 1][context.y].dangerous)) {
    process.exit();
  }
};
// The movement of the monster
const monsterMovement = (chosenDir, mapVisible, mapLogic) => {
  let previousItem = null;
  if (chosenDir === 'up' && monsterContext.x > 0 && mapLogic[monsterContext.x - 1][monsterContext.y].passeable) { // We check what is around us
    previousItem = mapVisible[monsterContext.x - 1][monsterContext.y];
    mapVisible[monsterContext.x][monsterContext.y] = previousItem;
    mapVisible[monsterContext.x - 1][monsterContext.y] = monster.sprite;
    mapLogic[monsterContext.x][monsterContext.y] = emptyObject;
    mapLogic[monsterContext.x - 1][monsterContext.y] = monster;
    monsterContext.x--;
    printMap(mapVisible);
  }
  if (chosenDir === 'down' && monsterContext.x < mapVisible.length - 1 && mapLogic[monsterContext.x + 1][monsterContext.y].passeable) {
    previousItem = mapVisible[monsterContext.x + 1][monsterContext.y];
    mapVisible[monsterContext.x][monsterContext.y] = previousItem;
    mapVisible[monsterContext.x + 1][monsterContext.y] = monster.sprite;
    mapLogic[monsterContext.x][monsterContext.y] = emptyObject;
    mapLogic[monsterContext.x + 1][monsterContext.y] = monster;
    monsterContext.x++;
    printMap(mapVisible);
  }
  if (chosenDir === 'left' && monsterContext.y > 0 && mapLogic[monsterContext.x][monsterContext.y - 1].passeable) {
    previousItem = mapVisible[monsterContext.x][monsterContext.y - 1];
    mapVisible[monsterContext.x][monsterContext.y] = previousItem;
    mapVisible[monsterContext.x][monsterContext.y - 1] = monster.sprite;
    mapLogic[monsterContext.x][monsterContext.y] = emptyObject;
    mapLogic[monsterContext.x][monsterContext.y - 1] = monster;
    monsterContext.y--;
    printMap(mapVisible);
  }
  if (chosenDir === 'right' && monsterContext.y < mapVisible[0].length - 1 && mapLogic[monsterContext.x][monsterContext.y + 1].passeable) {
    previousItem = mapVisible[monsterContext.x][monsterContext.y + 1];
    mapVisible[monsterContext.x][monsterContext.y] = previousItem;
    mapVisible[monsterContext.x][monsterContext.y + 1] = monster.sprite;
    mapLogic[monsterContext.x][monsterContext.y] = emptyObject;
    mapLogic[monsterContext.x][monsterContext.y + 1] = monster;
    monsterContext.y++;
    printMap(mapVisible);
  }
};
module.exports = {
  move,
  monsterMovement
}
;

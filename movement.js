const chalk = require('chalk');
const mapGen = require('./map');
const context = mapGen.context;
const character = chalk.bgYellow.yellowBright('OO');
const emptyObject = mapGen.emptyObject;
const printMap = mapGen.printMap;
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
  if ((key === 'd' && mapLogic[context.x][context.y + 1].dangerous) ||
      (key === 'a' && mapLogic[context.x][context.y - 1].dangerous) ||
      (key === 's' && mapLogic[context.x + 1][context.y].dangerous) ||
      (key === 'w' && mapLogic[context.x - 1][context.y].dangerous)) {
    process.exit();
  }
};

module.exports = {
  move
}
;

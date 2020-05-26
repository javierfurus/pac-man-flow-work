const chalk = require('chalk');
const mapGen = require('./map');
const context = mapGen.context;
const character = chalk.bgYellow.yellowBright('OO');
const printMap = mapGen.printMap;
const move = (key, mapArr) => {
  if (key === 'w' && context.x > 0) {
    mapArr[context.x][context.y] = ' ';
    mapArr[context.x - 1][context.y] = character;
    context.x--;
    printMap(mapArr);
  }
  if (key === 's' && context.x < mapArr.length - 1) {
    mapArr[context.x][context.y] = ' ';
    mapArr[context.x + 1][context.y] = character;
    context.x++;
    printMap(mapArr);
  }
  if (key === 'a' && context.y > 0) {
    mapArr[context.x][context.y] = ' ';
    mapArr[context.x][context.y - 1] = character;
    context.y--;
    printMap(mapArr);
  }
  if (key === 'd' && context.y < mapArr[0].length - 1) {
    mapArr[context.x][context.y] = ' ';
    mapArr[context.x][context.y + 1] = character;
    context.y++;
    printMap(mapArr);
  }
};

module.exports = {
  move
}
;

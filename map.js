const table = require('table');
const chalk = require('chalk');
const getBorderCharacters = table.getBorderCharacters;
const emptyObject = { sprite: '  ', passeable: true };
const character = chalk.bgYellow.yellowBright('OO');
const monster = { sprite: chalk.bgWhiteBright('00'), passeable: false, dangerous: true };
const context = { x: 0, y: 0 };
const monsterContext = { x: 0, y: 0 };
const generateMap = (width, height) => {
  const mapToBe = new Array(height);
  for (let i = 0; i < height; i++) {
    mapToBe[i] = new Array(width);
  }
  return mapToBe;
};
const fillMap = (mapVisible, mapLogic) => {
  for (let i = 0; i < mapVisible.length; i++) {
    for (let j = 0; j < mapVisible[i].length; j++) {
      mapVisible[i][j] = emptyObject.sprite;
      mapLogic[i][j] = emptyObject;
    }
  }
};
const addCharacter = (mapVisible, mapLogic) => {
  let middleHeight;
  let middleWidth;
  for (let i = 0; i < mapVisible.length; i++) {
    middleHeight = Math.floor(i / 2);
    for (let j = 0; j < mapVisible[0].length; j++) {
      middleWidth = Math.floor(j / 2);
    }
  }
  mapVisible[middleHeight][middleWidth] = character;
  mapLogic[middleHeight][middleWidth] = character;
  context.x = middleHeight;
  context.y = middleWidth;
};
const addMonster = (mapVisible, mapLogic, x, y) => {
  mapVisible[x][y] = monster.sprite;
  mapLogic[x][y] = monster;
  monsterContext.x = x;
  monsterContext.y = y;
};
const printMap = (mapArr) => {
  const config = {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 0
    },
    drawHorizontalLine: () => {
      return false;
    }
  };
  console.log(chalk.bgHex('#00960d')(table.table(mapArr, config)));
};
module.exports = {
  generateMap,
  context,
  fillMap,
  addCharacter,
  printMap,
  monsterContext,
  addMonster,
  emptyObject
}
;

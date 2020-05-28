const table = require('table');
const chalk = require('chalk');
const obstacles = require('./obstacles');
const getBorderCharacters = table.getBorderCharacters;
const putObstacles = obstacles.putObstacles;
const emptyObject = { sprite: '  ', passeable: true };
const character = chalk.bgYellowBright.yellowBright('  ');
const monster = { sprite: chalk.bgWhiteBright('👀'), passeable: true, dangerous: true, collectible: false };
const orb = { sprite: chalk.yellowBright('● '), passeable: true, dangerous: false, collectible: true };
const context = { x: 0, y: 0 };
const monsterContext = { x: 0, y: 0 };
const emptySpace = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'; // Please let me live for this
const generateMap = (width, height) => {
  const mapToBe = new Array(height);
  for (let i = 0; i < height; i++) {
    mapToBe[i] = new Array(width);
  }
  return mapToBe;
};
// Adding walls to the mapVisible
const fillMap = (mapVisible, mapLogic) => {
  for (let i = 0; i < mapVisible.length; i++) {
    for (let j = 0; j < mapVisible[i].length; j++) {
      mapVisible[i][j] = orb.sprite;
      mapLogic[i][j] = orb;
    }
  }
  putObstacles(mapVisible, mapLogic);
};
// Adding Pac-Man to the mapVisible
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

const addMonster = (mapVisible, mapLogic, x, y, n) => {
  mapVisible[x][y] = monster.sprite;
  mapLogic[x][y] = monster;
  // monsterContext.n = { x: x, y: y };
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
  process.stdout.write(`${chalk.bgBlack(table.table(mapArr, config))}${emptySpace}`);
};
module.exports = {
  generateMap,
  context,
  fillMap,
  addCharacter,
  printMap,
  monsterContext,
  addMonster,
  emptyObject,
  character,
  monster
}
;

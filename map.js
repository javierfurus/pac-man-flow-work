const table = require('table');
const colors = require('colors');
const chalk = require('chalk');
const getBorderCharacters = table.getBorderCharacters;
const character = chalk.bgYellow.yellowBright('OO');
const context = { x: 0, y: 0 };
const generateMap = (width, height) => {
  const mapArr = new Array(height);
  for (let i = 0; i < height; i++) {
    mapArr[i] = new Array(width);
  }
  return mapArr;
};
const fillMap = (mapArr) => {
  for (let i = 0; i < mapArr.length; i++) {
    for (let j = 0; j < mapArr[i].length; j++) {
      mapArr[i][j] = '  ';
    }
  }
};
const addCharacter = (mapArr) => {
  let middleHeight;
  let middleWidth;
  for (let i = 0; i < mapArr.length; i++) {
    middleHeight = Math.floor(i / 2);
    for (let j = 0; j < mapArr[0].length; j++) {
      middleWidth = Math.floor(j / 2);
    }
  }
  mapArr[middleHeight][middleWidth] = character;
  context.x = middleHeight;
  context.y = middleWidth;
  console.log(context);
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
  printMap
}
;

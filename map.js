const asTable = require('as-table');
const colors = require('colors');
const obstacles = require('./obstacles');
const scoreMenu = require('./score');
const putObstacles = obstacles.putObstacles;
const pushScoreMenu = scoreMenu.pushScoreMenu;
const emptyObject = { character: false, sprite: '  ', passeable: true, dangerous: false, collectible: false };
const character = { character: true, sprite: colors.bgBrightYellow.brightYellow('  '), passeable: false, dangerous: false, collectible: false };
const monster = {
  one: { character: false, sprite: colors.white.bgRed('00'), passeable: false, dangerous: true, collectible: false },
  two: { character: false, sprite: colors.black.bgBlue('00'), passeable: false, dangerous: true, collectible: false },
  three: { character: false, sprite: colors.black.bgGreen('00'), passeable: false, dangerous: true, collectible: false },
  four: { character: false, sprite: colors.black.bgWhite('00'), passeable: false, dangerous: true, collectible: false }
};
let amountOfMonsters = 0;
const orb = { character: false, sprite: colors.brightYellow('● '), passeable: true, dangerous: false, collectible: true };
const context = { x: 0, y: 0 };
const monCon = {
  one: { x: 0, y: 0 },
  two: { x: 0, y: 0 },
  three: { x: 0, y: 0 },
  four: { x: 0, y: 0 }
};
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
const orbCount = (mapVisible) => {
  let orbCount = 0;
  for (let i = 0; i < mapVisible.length; i++) {
    for (let j = 0; j < mapVisible[i].length; j++) {
      if (mapVisible[i][j] === orb.sprite) {
        orbCount++;
      }
    }
  }
  return orbCount;
};
// Adding Pac-Man to the mapVisible
const addCharacter = (mapVisible, mapLogic) => {
  const x = 20;
  const y = 15;
  mapVisible[x][y] = character.sprite;
  mapLogic[x][y] = character;
  context.x = x;
  context.y = y;
};

// Removing the character
const removeCharacter = (mapVisible, mapLogic) => {
  const x = context.x;
  const y = context.y;
  mapVisible[x][y] = emptyObject.sprite;
  mapLogic[x][y] = emptyObject;
};

const addMonster = (mapVisible, mapLogic, n) => {
  let middleHeight;
  let middleWidth;
  amountOfMonsters = n;
  const options = ['one', 'two', 'three', 'four'];
  for (let i = 0; i < mapVisible.length; i++) {
    middleHeight = Math.floor(i / 2);
    for (let j = 0; j < mapVisible[0].length; j++) {
      middleWidth = Math.floor(j / 2) + 1;
    }
  }
  while (n >= 0) {
    mapVisible[middleHeight][middleWidth - n] = monster[options[n]].sprite;
    mapLogic[middleHeight][middleWidth - n] = monster[options[n]];
    monCon[options[n]].x = middleHeight;
    monCon[options[n]].y = middleWidth - n;
    n--;
  }
};

const printMap = (mapArr) => {
  console.clear();
  console.log(`${asTable.configure({ delimiter: '' })(mapArr)}`);
  pushScoreMenu();
};
module.exports = {
  generateMap,
  context,
  fillMap,
  addCharacter,
  printMap,
  monCon,
  addMonster,
  emptyObject,
  character,
  monster,
  orb,
  amountOfMonsters,
  removeCharacter,
  orbCount
}
;

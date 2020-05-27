const mapGen = require('./map');
const moveFunc = require('./movement');
// map functions
const generateMap = mapGen.generateMap;
const context = mapGen.context;
const fillMap = mapGen.fillMap;
const addCharacter = mapGen.addCharacter;
const printMap = mapGen.printMap;
const addMonster = mapGen.addMonster;
const monsterContext = mapGen.monsterContext;
// move functions
const monsterMove = moveFunc.monsterMovement;
const move = moveFunc.move;
// Game code
const speed = 200;
const map = generateMap(31, 30);
const mapBackground = generateMap(31, 30);
let direction = null;
fillMap(map, mapBackground);

addCharacter(map, mapBackground);
addMonster(map, mapBackground, 7, 10);
printMap(map);

// Standard input
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
const start = () => {
  move(direction, map, mapBackground);
};
let dirPicker = 0;
setInterval(() => { dirPicker = Math.floor(Math.random() * 4); }, 2000);
const monsterStart = () => {
  const directions = ['up', 'down', 'left', 'right']; // 0: up, 1: down, 2: left, 3: right
  const chosenDir = directions[dirPicker];
  // Where should a monster go...
  if (chosenDir === 'right' && (mapBackground[monsterContext.y + 1] === undefined ||
    mapBackground[monsterContext.x][monsterContext.y + 1].passeable === false)) { // When the wall is to the right
    dirPicker = 2;
  }
  if (chosenDir === 'left' && (mapBackground[monsterContext.y - 1] === undefined ||
    mapBackground[monsterContext.x][monsterContext.y - 1].passeable === false)) { // When the wall is to the left
    dirPicker = 3;
  }
  if (chosenDir === 'down' && (mapBackground[monsterContext.x + 1] === undefined ||
    mapBackground[monsterContext.x + 1][monsterContext.y].passeable === false)) { // When the wall is in on the bottom
    dirPicker = 0;
  }
  if (chosenDir === 'up' && (mapBackground[monsterContext.x - 1] === undefined ||
    mapBackground[monsterContext.x - 1][monsterContext.y].passeable === false)) { // when the wall is on top
    dirPicker = 1;
  }
  monsterMove(chosenDir, map, mapBackground); // let's move!
};
stdin.on('data', (key) => {
  if (key === 'q') {
    process.exit();
  }
  if (key === 'w') {
    direction = key;
  } else if (key === 'a') {
    direction = key;
  } else if (key === 's') {
    direction = key;
  } else if (key === 'd') {
    direction = key;
  }
});

setInterval(start, speed);
setInterval(monsterStart, speed);

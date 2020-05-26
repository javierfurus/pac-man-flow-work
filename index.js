const mapGen = require('./map');
const moveFunc = require('./movement');
// map functions
const generateMap = mapGen.generateMap;
const context = mapGen.context;
const fillMap = mapGen.fillMap;
const addCharacter = mapGen.addCharacter;
const printMap = mapGen.printMap;
const move = moveFunc.move;
const addMonster = mapGen.addMonster;
const monsterContext = mapGen.monsterContext;
// Game code
const speed = 200;
const map = generateMap(50, 50);
const mapBackground = generateMap(50, 50);
let direction = null;
fillMap(map, mapBackground);
addCharacter(map, mapBackground);
addMonster(map, mapBackground, 7, 8);
addMonster(map, mapBackground, 9, 8);
printMap(map);
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
const start = () => {
  move(direction, map, mapBackground);
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

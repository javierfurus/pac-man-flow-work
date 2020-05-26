const mapGen = require('./map');
const moveFunc = require('./movement');
// map functions
const generateMap = mapGen.generateMap;
const context = mapGen.context;
const fillMap = mapGen.fillMap;
const addCharacter = mapGen.addCharacter;
const printMap = mapGen.printMap;
const move = moveFunc.move;
const map = generateMap(50, 50);
let direction = null;
fillMap(map);
addCharacter(map);
printMap(map);
console.log(context.x);
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
const start = () => {
  move(direction, map);
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
setInterval(start, 100);

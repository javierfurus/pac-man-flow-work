const mapGen = require('./map');
const moveFunc = require('./movement');
// map functions
const generateMap = mapGen.generateMap;
const context = mapGen.context;
const fillMap = mapGen.fillMap;
const addCharacter = mapGen.addCharacter;
const printMap = mapGen.printMap;
const addMonster = mapGen.addMonster;
const monCon = mapGen.monCon;
// move functions
const monsterMove = moveFunc.monsterMovement;
const move = moveFunc.move;
const monsterFollow = moveFunc.monsterFollow;
// Game code
const speed = 200;
const map = generateMap(31, 30);
const mapBackground = generateMap(31, 30);
let direction = null;
fillMap(map, mapBackground);

addCharacter(map, mapBackground);
addMonster(map, mapBackground, 3);
printMap(map);

// Standard input
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
const start = () => {
  move(direction, map, mapBackground);
};
let dirPicker0 = 0;
let dirPicker1 = 0;
let dirPicker2 = 0;
let dirPicker3 = 0;
setInterval(() => {
  dirPicker0 = Math.floor(Math.random() * 4);
  dirPicker1 = Math.floor(Math.random() * 4);
  dirPicker2 = Math.floor(Math.random() * 4);
  dirPicker3 = Math.floor(Math.random() * 4);
}, 2000);
const detour = (chosenDir, n) => {
  const options = ['one', 'two', 'three', 'four'];
  if (chosenDir === 'right' && (mapBackground[monCon[options[n]].y + 1] === undefined ||
  mapBackground[monCon[options[n]].x][monCon[options[n]].y + 1].passeable === false)) { // When the wall is to the right
    const dir = 1;
    if (n === 0) dirPicker0 = dir;
    if (n === 1) dirPicker1 = dir;
    if (n === 2) dirPicker2 = dir;
    if (n === 3) dirPicker3 = dir;
  }
  if (chosenDir === 'left' && (mapBackground[monCon[options[n]].y - 1] === undefined ||
  mapBackground[monCon[options[n]].x][monCon[options[n]].y - 1].passeable === false)) { // When the wall is to the left
    const dir = 0;
    if (n === 0) dirPicker0 = dir;
    if (n === 1) dirPicker1 = dir;
    if (n === 2) dirPicker2 = dir;
    if (n === 3) dirPicker3 = dir;
  }
  if (chosenDir === 'down' && (mapBackground[monCon[options[n]].x + 1] === undefined ||
  mapBackground[monCon[options[n]].x + 1][monCon[options[n]].y].passeable === false)) { // When the wall is in on the bottom
    const dir = 2;
    if (n === 0) dirPicker0 = dir;
    if (n === 1) dirPicker1 = dir;
    if (n === 2) dirPicker2 = dir;
    if (n === 3) dirPicker3 = dir;
  }
  if (chosenDir === 'up' && (mapBackground[monCon[options[n]].x - 1] === undefined ||
  mapBackground[monCon[options[n]].x - 1][monCon[options[n]].y].passeable === false)) { // when the wall is on top
    const dir = 3;
    if (n === 0) dirPicker0 = dir;
    if (n === 1) dirPicker1 = dir;
    if (n === 2) dirPicker2 = dir;
    if (n === 3) dirPicker3 = dir;
  }
};
const monsterStart = () => {
  const directions = ['up', 'down', 'left', 'right']; // 0: up, 1: down, 2: left, 3: right
  const chosenDir0 = directions[dirPicker0];
  const chosenDir1 = directions[dirPicker1];
  const chosenDir2 = directions[dirPicker2];
  const chosenDir3 = directions[dirPicker3];
  // Where should a monster go...
  detour(chosenDir0, 0);
  detour(chosenDir1, 1);
  detour(chosenDir2, 2);
  detour(chosenDir3, 3);
  monsterMove(chosenDir0, map, mapBackground, 0);
  monsterMove(chosenDir1, map, mapBackground, 1); // let's move!
  monsterMove(chosenDir2, map, mapBackground, 2);
  monsterMove(chosenDir3, map, mapBackground, 3);
};
stdin.on('data', (key) => {
  if (key === 'q') {
    console.clear();
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
setInterval(() => { printMap(map); }, 73);
setInterval(start, speed);
setInterval(monsterStart, speed);

// Follow!

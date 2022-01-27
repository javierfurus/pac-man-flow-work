const mapGen = require('./functions/map');
const moveFunc = require('./functions/movement');
const scoreMenu = require('./functions/score');
const menu = require('./menu');
const Sound = require('node-aplay');
const player = require('play-sound')((opts = {}));
const gameOverScreen = require('./functions/gameover').gameOverScreen;
const winnerScreen = require('./functions/winner').winScreen;
const term = require('terminal-kit').terminal;
// map functions
const generateMap = mapGen.generateMap;
const fillMap = mapGen.fillMap;
const addCharacter = mapGen.addCharacter;
const printMap = mapGen.printMap;
const addMonster = mapGen.addMonster;
const monCon = mapGen.monCon;
const orbCount = mapGen.orbCount;
// move functions
const monsterMove = moveFunc.monsterMovement;
const move = moveFunc.move;
const isGameOver = moveFunc.isGameOver;
// score functions
const putScore = scoreMenu.putScore;
const isWinner = scoreMenu.isWinner;
// Game code
const speed = 200;
const map = generateMap(31, 30);
const mapBackground = generateMap(31, 30);
let direction = null;
let mute = false;
stopMusic = false;
let musicPlayer;
const gameStart = (monsterSpeed) => {
  const playMusic = () => {
    musicPlayer = player.play('./music/siren_1.wav').on('exit', () => {
      if (!mute && !stopMusic) {
        playMusic();
      }
    });
  };
  if (!mute) {
    playMusic();
  }
  fillMap(map, mapBackground);
  addCharacter(map, mapBackground);
  addMonster(map, mapBackground, 3);
  printMap(map);
  const start = () => {
    move(direction, map, mapBackground);
  };
  let dirPicker0 = 0;
  let dirPicker1 = 0;
  let dirPicker2 = 0;
  let dirPicker3 = 0;
  const changeDir = setInterval(() => {
    dirPicker0 = Math.floor(Math.random() * 4);
    dirPicker1 = Math.floor(Math.random() * 4);
    dirPicker2 = Math.floor(Math.random() * 4);
    dirPicker3 = Math.floor(Math.random() * 4);
  }, 2000);
  const detour = (chosenDir, n) => {
    const options = ['one', 'two', 'three', 'four'];
    // Where should a monster go...
    if (
      chosenDir === 'right' &&
      (mapBackground[monCon[options[n]].y + 1] === undefined ||
        mapBackground[monCon[options[n]].x][monCon[options[n]].y + 1]
          .passeable === false)
    ) {
      // When the wall is to the right
      const dir = 1;
      if (n === 0) dirPicker0 = dir;
      if (n === 1) dirPicker1 = dir;
      if (n === 2) dirPicker2 = dir;
      if (n === 3) dirPicker3 = dir;
    }
    if (
      chosenDir === 'left' &&
      (mapBackground[monCon[options[n]].y - 1] === undefined ||
        mapBackground[monCon[options[n]].x][monCon[options[n]].y - 1]
          .passeable === false)
    ) {
      // When the wall is to the left
      const dir = 0;
      if (n === 0) dirPicker0 = dir;
      if (n === 1) dirPicker1 = dir;
      if (n === 2) dirPicker2 = dir;
      if (n === 3) dirPicker3 = dir;
    }
    if (
      chosenDir === 'down' &&
      (mapBackground[monCon[options[n]].x + 1] === undefined ||
        mapBackground[monCon[options[n]].x + 1][monCon[options[n]].y]
          .passeable === false)
    ) {
      // When the wall is in on the bottom
      const dir = 2;
      if (n === 0) dirPicker0 = dir;
      if (n === 1) dirPicker1 = dir;
      if (n === 2) dirPicker2 = dir;
      if (n === 3) dirPicker3 = dir;
    }
    if (
      chosenDir === 'up' &&
      (mapBackground[monCon[options[n]].x - 1] === undefined ||
        mapBackground[monCon[options[n]].x - 1][monCon[options[n]].y]
          .passeable === false)
    ) {
      // when the wall is on top
      const dir = 3;
      if (n === 0) dirPicker0 = dir;
      if (n === 1) dirPicker1 = dir;
      if (n === 2) dirPicker2 = dir;
      if (n === 3) dirPicker3 = dir;
    }
    // Follow
    for (let i = 0; i < 25; i++) {
      if (
        mapBackground[monCon[options[n]].y + i] &&
        mapBackground[monCon[options[n]].x][monCon[options[n]].y + i].character
      ) {
        // When the wall is to the right
        const dir = 3;
        if (n === 0) dirPicker0 = dir;
        if (n === 1) dirPicker1 = dir;
        if (n === 2) dirPicker2 = dir;
        if (n === 3) dirPicker3 = dir;
      }
      if (
        mapBackground[monCon[options[n]].y - i] &&
        mapBackground[monCon[options[n]].x][monCon[options[n]].y - i].character
      ) {
        // When the wall is to the left
        const dir = 2;
        if (n === 0) dirPicker0 = dir;
        if (n === 1) dirPicker1 = dir;
        if (n === 2) dirPicker2 = dir;
        if (n === 3) dirPicker3 = dir;
      }
      if (
        mapBackground[monCon[options[n]].x + i] &&
        mapBackground[monCon[options[n]].x + i][monCon[options[n]].y].character
      ) {
        // When the wall is in on the bottom
        const dir = 1;
        if (n === 0) dirPicker0 = dir;
        if (n === 1) dirPicker1 = dir;
        if (n === 2) dirPicker2 = dir;
        if (n === 3) dirPicker3 = dir;
      }
      if (
        mapBackground[monCon[options[n]].x - i] &&
        mapBackground[monCon[options[n]].x - i][monCon[options[n]].y].character
      ) {
        // when the wall is on top
        const dir = 0;
        if (n === 0) dirPicker0 = dir;
        if (n === 1) dirPicker1 = dir;
        if (n === 2) dirPicker2 = dir;
        if (n === 3) dirPicker3 = dir;
      }
    }
  };
  const monsterStart = () => {
    const directions = ['up', 'down', 'left', 'right']; // 0: up, 1: down, 2: left, 3: right
    const chosenDir0 = directions[dirPicker0];
    const chosenDir1 = directions[dirPicker1];
    const chosenDir2 = directions[dirPicker2];
    const chosenDir3 = directions[dirPicker3];
    monsterMove(chosenDir0, map, mapBackground, 0);
    monsterMove(chosenDir1, map, mapBackground, 1);
    monsterMove(chosenDir2, map, mapBackground, 2);
    monsterMove(chosenDir3, map, mapBackground, 3);
    // We change the direction of the monsters when they hit an obstacle.
    detour(chosenDir0, 0); // We pick the monster's movement (choosenDir) and the corresponding number (0 for example)
    detour(chosenDir1, 1);
    detour(chosenDir2, 2);
    detour(chosenDir3, 3);
  };
  const gameOver = () => {
    if (isGameOver()) {
      stopMusic = true;
      clearInterval(screen);
      clearInterval(heroStarter);
      clearInterval(monsterStarter);
      clearInterval(changeDir);
      term.clear();
      term.grabInput(false);
      gameOverScreen();
    }
  };
  const winner = () => {
    if (isWinner()) {
      stopMusic = true;
      clearInterval(screen);
      clearInterval(heroStarter);
      clearInterval(monsterStarter);
      clearInterval(changeDir);
      term.clear();
      term.grabInput(false);
      winnerScreen();
    }
  };
  const returnToMainMenu = () => {
    stopMusic = true;
    clearInterval(screen);
    clearInterval(heroStarter);
    clearInterval(monsterStarter);
    clearInterval(changeDir);
    term.clear();
    term.grabInput(false);
    menu.mainMenu();
  };
  const screen = setInterval(() => {
    putScore(orbCount(map));
    printMap(map);
    gameOver();
    winner();
  }, 73);
  const heroStarter = setInterval(start, speed); // the character's interval
  const monsterStarter = setInterval(monsterStart, monsterSpeed); // the monsters' interval
  term.grabInput();
  term.on('key', (key) => {
    if (key === 'q') {
      term.clear();
      process.exit();
    }
    if (key === 'm') {
      scoreMenu.muteSounds();
      if (!mute) {
        musicPlayer.kill();
      } else {
        playMusic();
      }
      mute = !mute;
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
};
menu.mainMenu();
exports.gameStart = gameStart;
exports.player = player;

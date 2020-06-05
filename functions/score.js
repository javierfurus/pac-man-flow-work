const table = require('table');
const colors = require('colors');
const Sound = require('node-aplay');
let score = 0;
let orbCount = 0;
let winnerFlag = false;
let count = 0;
const lifeIco = colors.bgBrightYellow.brightYellow('  ');
const lifeIndicator = [lifeIco, lifeIco, lifeIco];
const generateScoreMenu = (width, height) => {
  const scoreMenuToBe = new Array(height);
  for (let i = 0; i < height; i++) {
    scoreMenuToBe[i] = new Array(width);
  }
  return scoreMenuToBe;
}; const fillScoreMenu = (scoreMenu) => {
  for (let i = 0; i < scoreMenu.length; i++) {
    for (let j = 0; j < scoreMenu[i].length; j++) {
      scoreMenu[i][j] = ' ';
    }
  }
};
const putScore = (target) => {
  if (orbCount > target) {
    score++;
    if (count === 2) {
      new Sound('./music/pacman_chomp2.wav').play();
      count = 0;
    }
    if (count === 1) {
      new Sound('./music/pacman_chomp.wav').play();
      count++;
    }
    if (count === 0) {
      count++;
    }
  }
  orbCount = target;
  if (orbCount === 0) {
    winnerFlag = true;
  }
};
const isWinner = () => {
  if (winnerFlag) return true;
};
const addItem = () => {
  scoreMenu[0][0] = `Score: ${score}`;
  scoreMenu[0][3] = `Life: ${lifeIndicator.join(' ')}`;
  scoreMenu[1][0] = 'Instructions:';
  scoreMenu[1][1] = 'Move: W, A, S, D. Quit: Q';
};
const scoreMenu = generateScoreMenu(4, 2);
fillScoreMenu(scoreMenu);
addItem();
// const pushScoreMenu;
const config = {
  border: {
    topBody: '─',
    topJoin: '─',
    topLeft: '╭',
    topRight: '╮',

    bottomBody: '─',
    bottomJoin: '─',
    bottomLeft: '╰',
    bottomRight: '╯',

    bodyLeft: '│',
    bodyRight: '│',
    bodyJoin: ' ',

    joinBody: '─',
    joinLeft: '├',
    joinRight: '┤',
    joinJoin: '─'
  }
};
const pushScoreMenu = () => {
  addItem();
  console.log(table.table(scoreMenu, config));
};
module.exports = {
  pushScoreMenu,
  lifeIndicator,
  isWinner,
  putScore
}
;

const table = require('table');
const colors = require('colors');
let score = 0;
let orbCount = 0;
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
const increaseScore = () => {

};
const putScore = (target) => {
  if (orbCount > target) {
    score++;
  }
  orbCount = target;
  if (orbCount === 0) {
    process.exit();
  }
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
  increaseScore,
  putScore
}
;

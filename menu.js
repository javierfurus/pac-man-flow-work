const asTable = require('as-table');
const colors = require('colors');
const center = require('center-align');
const term = require('terminal-kit').terminal;
const game = require('./index');
let monsterSpeed = 190;
const difficulty = ['Easy', 'Medium', 'Hard'];
let setDifficulty = 1;
const mainMenu = () => {
  term.clear();
  const menuItems = ['                     Start                     ',
    '                     Config                     ',
    '                     About                     ',
    '                     Quit                         '];
  const logo =
[['     __                      __  ___          '],
  ['    / /   ____  ____ _      /  |/  /___ _____ '],
  ['   / /   / __ \\/ __ `/_____/ /|_/ / __ `/ __ \\'],
  ['  / /___/ /_/ / /_/ /_____/ /  / / /_/ / / / /'],
  [' /_____/\\____/\\__, /     /_/  /_/\\__,_/_/ /_/ '],
  ['             /____/ Pac-Man clone in your terminal!']];

  console.log(colors.bgYellow.black(asTable.configure({ delimiter: '' })(logo)));
  console.log(center(`             Current difficulty:${difficulty[setDifficulty]}`));
  const options = {
    selectedStyle: term.black.bgBrightYellow
  };
  term.singleColumnMenu(menuItems, options, (err, arg) => {
    if (err) {
      return;
    }
    term.clear();
    if (arg.selectedIndex === 0) {
      term.reset();
      game.gameStart(monsterSpeed);
    } if (arg.selectedIndex === 1) {
      const config = `Change your game's difficulty
      ${colors.green('Easy will let you breathe with slow enemies.')}
      ${colors.yellow('Medium will make you sweat a bit, but it is managable.')}
      ${colors.red('During our thorough testing, nobody could beat Hard.')}\nWhat will you choose?`;
      console.log(center(config));
      const configMenuItems = ['     Easy     ', '     Medium     ', '     Hard     ', '     Back     '];
      const options = {
        selectedStyle: term.black.bgBrightYellow
      };
      term.singleLineMenu(configMenuItems, options, (err, arg) => {
        if (err) {
          return;
        }
        term.clear();
        if (arg.selectedIndex === 0) { // Easy
          monsterSpeed = 250;
          setDifficulty = 0;
          mainMenu();
        }
        if (arg.selectedIndex === 1) { // Medium
          monsterSpeed = 200;
          setDifficulty = 1;
          mainMenu();
        }
        if (arg.selectedIndex === 2) { // Hard
          monsterSpeed = 150;
          setDifficulty = 2;
          mainMenu();
        }
        if (arg.selectedIndex === 3) { // Back
          mainMenu();
        }
      });
    }
    if (arg.selectedIndex === 2) {
      const about = 'What is this game? A very simple Pac-Man clone that you can play in your terminal!\nGive it a shot, it is a real challenge!\nJavier Furus 2020';
      console.log(center(about));
      const aboutMenuItems = ['     Back     '];
      const options = {
        selectedStyle: term.black.bgBrightYellow
      };
      term.singleLineMenu(aboutMenuItems, options, (err, arg) => {
        if (err) {
          return;
        }
        term.clear();
        if (arg.selectedIndex === 0) {
          mainMenu();
        }
      });
    }
    if (arg.selectedIndex === 3) {
      process.exit();
    }
  });
};
exports.mainMenu = mainMenu;

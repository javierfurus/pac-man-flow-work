const asTable = require('as-table');
const colors = require('colors');
const term = require('terminal-kit').terminal;
const player = require('play-sound')((opts = {}));
const winScreen = () => {
  term.clear();
  player.play('./music/pacman_beginning.wav');
  const winner = [
    [' _     _  ___   __    _  __    _  _______  ______    __  '],
    ['| | _ | ||   | |  |  | ||  |  | ||       ||    _ |  |  | '],
    ['| || || ||   | |   |_| ||   |_| ||    ___||   | ||  |  | '],
    ['|       ||   | |       ||       ||   |___ |   |_||_ |  | '],
    ['|       ||   | |  _    ||  _    ||    ___||    __  ||__| '],
    ['|   _   ||   | | | |   || | |   ||   |___ |   |  | | __  '],
    ['|__| |__||___| |_|  |__||_|  |__||_______||___|  |_||__| '],
  ];
  console.log(colors.green(asTable.configure({ delimiter: '' })(winner)));
  console.log('You won! Congratulations!');
  const aboutMenuItems = ['     Quit     '];
  const options = {
    selectedStyle: term.black.bgBrightYellow,
  };
  term.singleLineMenu(aboutMenuItems, options, (err, arg) => {
    if (err) {
      return;
    }
    term.clear();
    if (arg.selectedIndex === 0) {
      process.exit();
    }
  });
};
module.exports = {
  winScreen,
};

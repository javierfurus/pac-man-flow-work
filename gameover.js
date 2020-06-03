const asTable = require('as-table');
const colors = require('colors');
const term = require('terminal-kit').terminal;
const gameOverScreen = () => {
  term.clear();
  const gameOver =
        [[' _______  _______  __   __  _______    _______  __   __  _______  ______    __  '],
          ['|       ||   _   ||  |_|  ||       |  |       ||  | |  ||       ||    _ |  |  | '],
          ['|    ___||  |_|  ||       ||    ___|  |   _   ||  |_|  ||    ___||   | ||  |  | '],
          ['|   | __ |       ||       ||   |___   |  | |  ||       ||   |___ |   |_||_ |  | '],
          ['|   ||  ||       ||       ||    ___|  |  |_|  ||       ||    ___||    __  ||__| '],
          ['|   |_| ||   _   || ||_|| ||   |___   |       | |     | |   |___ |   |  | | __  '],
          ['|_______||__| |__||_|   |_||_______|  |_______|  |___|  |_______||___|  |_||__| ']];
  console.log(colors.red(asTable.configure({ delimiter: '' })(gameOver)));
  console.log('Oh, no, you died! Try again later!');
  const aboutMenuItems = ['     Quit     '];
  const options = {
    selectedStyle: term.black.bgBrightYellow
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
  gameOverScreen
}
;

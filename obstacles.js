const chalk = require('chalk');
const wallHorizontal = { sprite: chalk.bgBlue.blue('══'), passeable: false, dangerous: false, collectible: false };
const wallVertical = { sprite: chalk.bgBlue.blue('║║'), passeable: false, dangerous: false, collectible: false };

const addObject = (mapVisible, placeX, placeY, obj) => { // num is the number of snowflakes
  let obHeight = null;
  let obWidth = null;
  for (let i = 0; i <= mapVisible.length; i++) {
    obHeight = i;
    for (let j = 0; j < mapVisible[0].length; j++) {
      obWidth = j;
    }
  }
  if (placeX < obHeight && placeY < obWidth) {
    mapVisible[placeX][placeY] = obj;
  }
};
const addObstacleHorizontal = (mapVisible, mapLogic, a, b, locationX) => { // a-from, b-to.
  if (a < b) {
    for (let i = a; i <= b; i++) {
      addObject(mapVisible, locationX, i, wallHorizontal.sprite);
      addObject(mapLogic, locationX, i, wallHorizontal);
    }
  } else {
    for (let i = a; i >= b; i--) {
      addObject(mapVisible, locationX, i, wallHorizontal.sprite);
      addObject(mapLogic, locationX, i, wallHorizontal);
    }
  }
};
const addObstacleVertical = (mapVisible, mapLogic, a, b, locationY) => { // a-from, b-to.
  if (a < b) {
    for (let i = a; i <= b; i++) {
      addObject(mapVisible, i, locationY, wallVertical.sprite);
      addObject(mapLogic, i, locationY, wallVertical);
    }
  } else {
    for (let i = a; i >= b; i--) {
      addObject(mapVisible, i, locationY, wallVertical.sprite);
      addObject(mapLogic, i, locationY, wallVertical);
    }
  }
};
const putObstacles = (mapVisible, mapLogic) => {
  // Adding obstacles in a very ugly way
  // Lines
  // Left top slab
  addObstacleHorizontal(mapVisible, mapLogic, 1, 9, 1);
  addObstacleHorizontal(mapVisible, mapLogic, 1, 9, 2);
  // Right top slab
  addObstacleHorizontal(mapVisible, mapLogic, 21, 29, 1);
  addObstacleHorizontal(mapVisible, mapLogic, 21, 29, 2);

  addObstacleHorizontal(mapVisible, mapLogic, 11, 19, 9);
  addObstacleHorizontal(mapVisible, mapLogic, 11, 19, 10);

  addObstacleHorizontal(mapVisible, mapLogic, 21, 29, 9);
  addObstacleHorizontal(mapVisible, mapLogic, 21, 29, 10);
  // Blocks
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 1); // Start
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 2);
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 3);
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 4); // End

  addObstacleVertical(mapVisible, mapLogic, 4, 7, 6); // Start
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 7);
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 8);
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 9); // End

  addObstacleVertical(mapVisible, mapLogic, 4, 7, 21); // Start
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 22);
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 23);
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 24); // End

  addObstacleVertical(mapVisible, mapLogic, 4, 7, 26); // Start
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 27);
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 28);
  addObstacleVertical(mapVisible, mapLogic, 4, 7, 29); // End
  // Longer blocks
  addObstacleVertical(mapVisible, mapLogic, 1, 7, 11);
  addObstacleVertical(mapVisible, mapLogic, 1, 7, 12);

  addObstacleVertical(mapVisible, mapLogic, 1, 7, 18);
  addObstacleVertical(mapVisible, mapLogic, 1, 7, 19);

  addObstacleVertical(mapVisible, mapLogic, 1, 8, 14);
  addObstacleVertical(mapVisible, mapLogic, 1, 8, 15);
  addObstacleVertical(mapVisible, mapLogic, 1, 8, 16);
  // Left middle block "E"
  addObstacleVertical(mapVisible, mapLogic, 12, 21, 1);
  addObstacleVertical(mapVisible, mapLogic, 12, 21, 2);
  addObstacleVertical(mapVisible, mapLogic, 12, 21, 3);

  addObstacleHorizontal(mapVisible, mapLogic, 4, 6, 12);
  addObstacleHorizontal(mapVisible, mapLogic, 4, 6, 13);
  addObstacleHorizontal(mapVisible, mapLogic, 4, 6, 14);

  addObstacleHorizontal(mapVisible, mapLogic, 4, 6, 16);
  addObstacleHorizontal(mapVisible, mapLogic, 4, 6, 17);
  addObstacleHorizontal(mapVisible, mapLogic, 4, 6, 18);

  addObstacleHorizontal(mapVisible, mapLogic, 4, 6, 20);
  addObstacleHorizontal(mapVisible, mapLogic, 4, 6, 21);
  // Right middle block "E"
  addObstacleVertical(mapVisible, mapLogic, 12, 21, 27);
  addObstacleVertical(mapVisible, mapLogic, 12, 21, 28);
  addObstacleVertical(mapVisible, mapLogic, 12, 21, 29);

  addObstacleHorizontal(mapVisible, mapLogic, 24, 26, 12);
  addObstacleHorizontal(mapVisible, mapLogic, 24, 26, 13);
  addObstacleHorizontal(mapVisible, mapLogic, 24, 26, 14);

  addObstacleHorizontal(mapVisible, mapLogic, 24, 26, 16);
  addObstacleHorizontal(mapVisible, mapLogic, 24, 26, 17);
  addObstacleHorizontal(mapVisible, mapLogic, 24, 26, 18);

  addObstacleHorizontal(mapVisible, mapLogic, 24, 26, 20);
  addObstacleHorizontal(mapVisible, mapLogic, 24, 26, 21);

  // ] on the left of the mapVisible
  addObstacleHorizontal(mapVisible, mapLogic, 1, 9, 9);
  addObstacleHorizontal(mapVisible, mapLogic, 1, 9, 10);

  addObstacleVertical(mapVisible, mapLogic, 11, 22, 8);
  addObstacleVertical(mapVisible, mapLogic, 11, 22, 9);

  addObstacleHorizontal(mapVisible, mapLogic, 5, 9, 23);
  addObstacleHorizontal(mapVisible, mapLogic, 5, 9, 24);

  // [ on the right of the mapVisible
  addObstacleHorizontal(mapVisible, mapLogic, 21, 28, 9);
  addObstacleHorizontal(mapVisible, mapLogic, 21, 28, 10);

  addObstacleVertical(mapVisible, mapLogic, 11, 22, 21);
  addObstacleVertical(mapVisible, mapLogic, 11, 22, 22);

  addObstacleHorizontal(mapVisible, mapLogic, 21, 25, 23);
  addObstacleHorizontal(mapVisible, mapLogic, 21, 25, 24);
  // L left bottom
  addObstacleVertical(mapVisible, mapLogic, 23, 28, 1);
  addObstacleVertical(mapVisible, mapLogic, 23, 28, 2);
  addObstacleVertical(mapVisible, mapLogic, 23, 28, 3);

  addObstacleHorizontal(mapVisible, mapLogic, 4, 9, 26);
  addObstacleHorizontal(mapVisible, mapLogic, 4, 9, 27);
  addObstacleHorizontal(mapVisible, mapLogic, 4, 9, 28);
  // L Right bottom
  addObstacleVertical(mapVisible, mapLogic, 23, 28, 27);
  addObstacleVertical(mapVisible, mapLogic, 23, 28, 28);
  addObstacleVertical(mapVisible, mapLogic, 23, 28, 29);

  addObstacleHorizontal(mapVisible, mapLogic, 21, 26, 26);
  addObstacleHorizontal(mapVisible, mapLogic, 21, 26, 27);
  addObstacleHorizontal(mapVisible, mapLogic, 21, 26, 28);

  // U Bottom middle
  addObstacleVertical(mapVisible, mapLogic, 21, 28, 11);
  addObstacleVertical(mapVisible, mapLogic, 21, 28, 12);

  addObstacleVertical(mapVisible, mapLogic, 21, 28, 18);
  addObstacleVertical(mapVisible, mapLogic, 21, 28, 19);

  addObstacleVertical(mapVisible, mapLogic, 21, 25, 14);
  addObstacleVertical(mapVisible, mapLogic, 21, 25, 15);
  addObstacleVertical(mapVisible, mapLogic, 21, 25, 16);

  addObstacleHorizontal(mapVisible, mapLogic, 13, 17, 27);
  addObstacleHorizontal(mapVisible, mapLogic, 13, 17, 28);

  // U "Monster Container"
  addObstacleVertical(mapVisible, mapLogic, 12, 19, 11);
  addObstacleVertical(mapVisible, mapLogic, 12, 19, 12);

  addObstacleVertical(mapVisible, mapLogic, 12, 19, 18);
  addObstacleVertical(mapVisible, mapLogic, 12, 19, 19);

  addObstacleHorizontal(mapVisible, mapLogic, 13, 17, 18);
  addObstacleHorizontal(mapVisible, mapLogic, 13, 17, 19);
};
// End of mapVisible drawing
module.exports = {
  putObstacles
}
;

const mapGen = require('./map');
const scoreMenu = require('./score');
const con = mapGen.context;
const mCon = mapGen.monCon;
const character = mapGen.character;
const monster = mapGen.monster;
const emptyObject = mapGen.emptyObject;
const life = scoreMenu.lifeIndicator;
const addCharacter = mapGen.addCharacter;
const removeCharacter = mapGen.removeCharacter;
let gameover = false;
const orb = mapGen.orb;
const previousItem = {
  one: [orb.sprite],
  two: [orb.sprite],
  three: [orb.sprite],
  four: [orb.sprite],
};
const previousItemLogic = {
  one: [orb],
  two: [orb],
  three: [orb],
  four: [orb],
};

// Check if we should even be moving
const isGameOver = () => {
  if (gameover) return true;
};
// This controls the movement of the character
const move = (key, mapVisible, mapLogic) => {
  if (key === 'w' && con.x > 0 && mapLogic[con.x - 1][con.y].passeable) {
    // We check what is around us
    mapVisible[con.x][con.y] = emptyObject.sprite;
    mapVisible[con.x - 1][con.y] = character.sprite;
    mapLogic[con.x][con.y] = emptyObject;
    mapLogic[con.x - 1][con.y] = character;
    con.x--;
  }
  if (
    key === 's' &&
    con.x < mapVisible.length - 1 &&
    mapLogic[con.x + 1][con.y].passeable
  ) {
    mapVisible[con.x][con.y] = emptyObject.sprite;
    mapVisible[con.x + 1][con.y] = character.sprite;
    mapLogic[con.x][con.y] = emptyObject;
    mapLogic[con.x + 1][con.y] = character;
    con.x++;
  }
  if (key === 'a' && con.y > 0 && mapLogic[con.x][con.y - 1].passeable) {
    mapVisible[con.x][con.y] = emptyObject.sprite;
    mapVisible[con.x][con.y - 1] = character.sprite;
    mapLogic[con.x][con.y] = emptyObject;
    mapLogic[con.x][con.y - 1] = character;
    con.y--;
  }
  if (
    key === 'd' &&
    con.y < mapVisible[0].length - 1 &&
    mapLogic[con.x][con.y + 1].passeable
  ) {
    mapVisible[con.x][con.y] = emptyObject.sprite;
    mapVisible[con.x][con.y + 1] = character.sprite;
    mapLogic[con.x][con.y] = emptyObject;
    mapLogic[con.x][con.y + 1] = character;
    con.y++;
  }
};
// The movement of the monster
const monsterMovement = (chosenDir, mapVisible, mapLogic, monN) => {
  const mon = ['one', 'two', 'three', 'four'];
  const num = mon[monN];
  const mCont = mCon[num];
  if (
    (chosenDir === 'right' &&
      mapLogic[mCont.y + 1] &&
      mapLogic[mCont.x][mCont.y + 1].character) ||
    (chosenDir === 'left' &&
      mapLogic[mCont.y - 1] &&
      mapLogic[mCont.x][mCont.y - 1].character) ||
    (chosenDir === 'down' &&
      mapLogic[mCont.x + 1] &&
      mapLogic[mCont.x + 1][mCont.y].character) ||
    (chosenDir === 'up' &&
      mapLogic[mCont.x - 1] &&
      mapLogic[mCont.x - 1][mCont.y].character)
  ) {
    life.pop();
    if (life.length === 0) {
      console.clear();
      gameover = true;
    }
    removeCharacter(mapVisible, mapLogic);
    addCharacter(mapVisible, mapLogic);
  }
  if (
    chosenDir === 'up' &&
    mapLogic[mCont.x - 1] &&
    mapLogic[mCont.x - 1][mCont.y].passeable
  ) {
    // We check what is around us
    previousItem[num].push(mapVisible[mCont.x - 1][mCont.y]);
    previousItemLogic[num].push(mapLogic[mCont.x - 1][mCont.y]);
    mapVisible[mCont.x][mCont.y] = previousItem[num][0];
    mapLogic[mCont.x][mCont.y] = previousItemLogic[num][0];
    previousItem[num].shift();
    previousItemLogic[num].shift();
    mapVisible[mCont.x - 1][mCont.y] = monster[num].sprite;
    mapLogic[mCont.x - 1][mCont.y] = monster[num];
    mCont.x--;
  }
  if (
    chosenDir === 'down' &&
    mapLogic[mCont.x + 1] &&
    mapLogic[mCont.x + 1][mCont.y].passeable
  ) {
    previousItem[num].push(mapVisible[mCont.x + 1][mCont.y]);
    previousItemLogic[num].push(mapLogic[mCont.x + 1][mCont.y]);
    mapVisible[mCont.x][mCont.y] = previousItem[num][0];
    mapLogic[mCont.x][mCont.y] = previousItemLogic[num][0];
    previousItem[num].shift();
    previousItemLogic[num].shift();
    mapVisible[mCont.x + 1][mCont.y] = monster[num].sprite;
    mapLogic[mCont.x + 1][mCont.y] = monster[num];
    mCont.x++;
  }
  if (
    chosenDir === 'left' &&
    mapLogic[mCont.y - 1] &&
    mapLogic[mCont.x][mCont.y - 1].passeable
  ) {
    previousItem[num].push(mapVisible[mCont.x][mCont.y - 1]);
    previousItemLogic[num].push(mapLogic[mCont.x][mCont.y - 1]);
    mapVisible[mCont.x][mCont.y] = previousItem[num][0];
    mapLogic[mCont.x][mCont.y] = previousItemLogic[num][0];
    previousItem[num].shift();
    previousItemLogic[num].shift();
    mapVisible[mCont.x][mCont.y - 1] = monster[num].sprite;
    mapLogic[mCont.x][mCont.y - 1] = monster[num];
    mCont.y--;
  }
  if (
    chosenDir === 'right' &&
    mapLogic[mCont.y + 1] &&
    mapLogic[mCont.x][mCont.y + 1].passeable
  ) {
    previousItem[num].push(mapVisible[mCont.x][mCont.y + 1]); // New previem is [orb, newItem]
    previousItemLogic[num].push(mapLogic[mCont.x][mCont.y + 1]);
    mapVisible[mCont.x][mCont.y] = previousItem[num][0];
    mapLogic[mCont.x][mCont.y] = previousItemLogic[num][0];
    previousItem[num].shift();
    previousItemLogic[num].shift();
    mapVisible[mCont.x][mCont.y + 1] = monster[num].sprite;
    mapLogic[mCont.x][mCont.y + 1] = monster[num];
    mCont.y++;
  }
};
module.exports = {
  move,
  monsterMovement,
  isGameOver,
};

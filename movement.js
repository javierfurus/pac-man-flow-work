const mapGen = require('./map');
const con = mapGen.context;
const mCon = mapGen.monCon;
const character = mapGen.character;
const monster = mapGen.monster;
const emptyObject = mapGen.emptyObject;
// // const printMap = mapGen.printMap;
let previousItem = {};
let previousItemLogic = {};
// This controls the movement of the character
const move = (key, mapVisible, mapLogic) => {
  if (key === 'w' && con.x > 0 && mapLogic[con.x - 1][con.y].passeable) { // We check what is around us
    mapVisible[con.x][con.y] = emptyObject.sprite;
    mapVisible[con.x - 1][con.y] = character.sprite;
    mapLogic[con.x][con.y] = emptyObject;
    mapLogic[con.x - 1][con.y] = character;
    con.x--;
    // printMap(mapVisible);
  }
  if (key === 's' && con.x < mapVisible.length - 1 && mapLogic[con.x + 1][con.y].passeable) {
    mapVisible[con.x][con.y] = emptyObject.sprite;
    mapVisible[con.x + 1][con.y] = character.sprite;
    mapLogic[con.x][con.y] = emptyObject;
    mapLogic[con.x + 1][con.y] = character;
    con.x++;
    // printMap(mapVisible);
  }
  if (key === 'a' && con.y > 0 && mapLogic[con.x][con.y - 1].passeable) {
    mapVisible[con.x][con.y] = emptyObject.sprite;
    mapVisible[con.x][con.y - 1] = character.sprite;
    mapLogic[con.x][con.y] = emptyObject;
    mapLogic[con.x][con.y - 1] = character;
    con.y--;
    // printMap(mapVisible);
  }
  if (key === 'd' && con.y < mapVisible[0].length - 1 && mapLogic[con.x][con.y + 1].passeable) {
    mapVisible[con.x][con.y] = emptyObject.sprite;
    mapVisible[con.x][con.y + 1] = character.sprite;
    mapLogic[con.x][con.y] = emptyObject;
    mapLogic[con.x][con.y + 1] = character;
    con.y++;
    // printMap(mapVisible);
  }
};
// The movement of the monster
const monsterMovement = (chosenDir, mapVisible, mapLogic, monN) => {
  const mon = ['one', 'two', 'three', 'four'];
  const num = mon[monN];
  const mCont = mCon[num];
  if (chosenDir === 'up' && mCont.x > 0 && (mapLogic[mCont.x - 1][mCont.y].passeable)) { // We check what is around us
    previousItem = mapVisible[mCont.x - 1][mCont.y];
    previousItemLogic = mapLogic[mCont.x - 1][mCont.y];
    mapVisible[mCont.x][mCont.y] = previousItem;
    mapVisible[mCont.x - 1][mCont.y] = monster[num].sprite;
    mapLogic[mCont.x][mCont.y] = previousItemLogic;
    mapLogic[mCont.x - 1][mCont.y] = monster[num];
    mCont.x--;
    // printMap(mapVisible);
  }
  if (chosenDir === 'down' && mCont.x < mapVisible.length - 1 && (mapLogic[mCont.x + 1][mCont.y].passeable)) {
    previousItem = mapVisible[mCont.x + 1][mCont.y];
    previousItemLogic = mapLogic[mCont.x + 1][mCont.y];
    mapVisible[mCont.x][mCont.y] = previousItem;
    mapVisible[mCont.x + 1][mCont.y] = monster[num].sprite;
    mapLogic[mCont.x][mCont.y] = previousItemLogic;
    mapLogic[mCont.x + 1][mCont.y] = monster[num];
    mCont.x++;
  }
  if (chosenDir === 'left' && mCont.y > 0 && (mapLogic[mCont.x][mCont.y - 1].passeable)) {
    previousItem = mapVisible[mCont.x][mCont.y - 1];
    previousItemLogic = mapLogic[mCont.x][mCont.y - 1];
    mapVisible[mCont.x][mCont.y] = previousItem;
    mapVisible[mCont.x][mCont.y - 1] = monster[num].sprite;
    mapLogic[mCont.x][mCont.y] = previousItemLogic;
    mapLogic[mCont.x][mCont.y - 1] = monster[num];
    mCont.y--;
  }
  if (chosenDir === 'right' && mCont.y < mapVisible[0].length - 1 && (mapLogic[mCont.x][mCont.y + 1].passeable)) {
    previousItem = mapVisible[mCont.x][mCont.y + 1];
    previousItemLogic = mapLogic[mCont.x][mCont.y + 1];
    mapVisible[mCont.x][mCont.y] = previousItem;
    mapVisible[mCont.x][mCont.y + 1] = monster[num].sprite;
    mapLogic[mCont.x][mCont.y] = previousItemLogic;
    mapLogic[mCont.x][mCont.y + 1] = monster[num];
    mCont.y++;
  }
  if ((chosenDir === 'right' && mCont.y < mapVisible[0].length - 1 && mapLogic[mCont.x][mCont.y + 1].character) ||
  (chosenDir === 'left' && mCont.y > 0 && mapLogic[mCont.x][mCont.y - 1].character) ||
  (chosenDir === 'down' && mCont.x < mapVisible.length - 1 && mapLogic[mCont.x + 1][mCont.y].character) ||
  (chosenDir === 'up' && mCont.x > 0 && mapLogic[mCont.x - 1][mCont.y].character)) {
    process.exit();
  }
};
const monsterFollow = (mapVisible, mapLogic) => { // Todo: Solve following with while
  if ((mapLogic[mCon.y + 1] && mapLogic[mCon.x][mCon.y + 1].character) ||
  (mapLogic[mCon.y + 2] && mapLogic[mCon.x][mCon.y + 2].character) ||
  (mapLogic[mCon.y + 3] && mapLogic[mCon.x][mCon.y + 3].character)) { // When the wall is to the right
    monsterDirection = 'right';
    monsterMovement(monsterDirection, mapVisible, mapLogic);
  }
  if ((mapLogic[mCon.x][mCon.y - 1] && mapLogic[mCon.x][mCon.y - 1].character) ||
  (mapLogic[mCon.y - 2] && mapLogic[mCon.x][mCon.y - 2].character) ||
  (mapLogic[mCon.x][mCon.y - 3] && mapLogic[mCon.x][mCon.y - 3].character)) { // When the wall is to the left
    monsterDirection = 'left';
    monsterMovement(monsterDirection, mapVisible, mapLogic);
  }
  if ((mapLogic[mCon.x + 1] && mapLogic[mCon.x + 1][mCon.y].character) ||
  (mapLogic[mCon.x + 2] && mapLogic[mCon.x + 2][mCon.y].character) ||
  (mapLogic[mCon.x + 3] && mapLogic[mCon.x + 3][mCon.y].character) ||
  (mapLogic[mCon.x + 4] && mapLogic[mCon.x + 4][mCon.y].character)) { // When the wall is in on the bottom
    monsterDirection = 'down';
    monsterMovement(monsterDirection, mapVisible, mapLogic);
  }
  if ((mapLogic[mCon.x] && mapLogic[mCon.x][mCon.y].character) ||
    (mapLogic[mCon.x - 1] && mapLogic[mCon.x - 1][mCon.y].character) ||
  (mapLogic[mCon.x - 2] && mapLogic[mCon.x - 2][mCon.y].character) ||
  (mapLogic[mCon.x - 3] && mapLogic[mCon.x - 3][mCon.y].character) ||
  (mapLogic[mCon.x - 4] && mapLogic[mCon.x - 4][mCon.y].character)) { // when the wall is on top
    monsterDirection = 'up';
    monsterMovement(monsterDirection, mapVisible, mapLogic);
  }
};
module.exports = {
  move,
  monsterMovement,
  monsterFollow
}
;

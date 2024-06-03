
let partyArray = [];

const getPartyArray = () => partyArray;
const addToPartyArray = (party) => {
  partyArray.push(party);

}
const removeUser = (userId, partyId) => {
  const party = partyArray.find(party => party.id == partyId);
  const partyIndex = partyArray.indexOf(party);
  const index = party.members.indexOf(userId);
  partyArray[partyIndex].members.splice(index, 1);
}

const move = (direction, userId, partyId) => {
  const party = partyArray.find(party => party.id == partyId);
  const partyIndex = partyArray.indexOf(party);

  let rowIndex = party.grid.findIndex((row) => row.find((block) => block.userId === userId));
  let columnIndex = party.grid[rowIndex].findIndex((block) => block.userId === userId);
  console.log(rowIndex, columnIndex)

  switch (direction) {
    case "up":
      if (rowIndex > 0) {
        party.grid[rowIndex][columnIndex].user = null;
        party.grid[rowIndex][columnIndex].userId = null;
        party.grid[rowIndex - 1][columnIndex].userId = userId;
        party.grid[rowIndex - 1][columnIndex].user = userId;
      }
      break;
    case "right":
      if (columnIndex < party.grid[0].length - 1) {
        party.grid[rowIndex][columnIndex].user = null;
        party.grid[rowIndex][columnIndex].userId = null;
        party.grid[rowIndex][columnIndex + 1].userId = userId;
        party.grid[rowIndex][columnIndex + 1].user = userId;

      }
      break;
    case "left":
      if (columnIndex > 0) {
        party.grid[rowIndex][columnIndex].user = null;
        party.grid[rowIndex][columnIndex].userId = null;
        party.grid[rowIndex][columnIndex - 1].userId = userId;
        party.grid[rowIndex][columnIndex - 1].user = userId;
      }
      break;
    case "down":
      if (rowIndex < party.grid.length - 1) {
        party.grid[rowIndex][columnIndex].user = null;
        party.grid[rowIndex][columnIndex].userId = null;
        party.grid[rowIndex + 1][columnIndex].userId = userId;
        party.grid[rowIndex + 1][columnIndex].user = userId;
      }
      break;

    default:
      break;
  }


  // switch (direction) {
  //   case "up":
  //     if (rowIndex > 0) {
  //       party.grid[rowIndex][columnIndex].user = null;
  //       party.grid[rowIndex - 1][columnIndex].user = user;
  //     }
  //     break;
  //   case "right":
  //     if (columnIndex < party.grid[0].length - 1) {
  //       party.grid[rowIndex][columnIndex].user = null;
  //       party.grid[rowIndex][columnIndex + 1].user = user;
  //     }
  //     break;
  //   case "left":
  //     if (columnIndex > 0) {
  //       party.grid[rowIndex][columnIndex].user = null;
  //       party.grid[userIndexInGrid][columnIndex - 1].user = user;
  //     }
  //     break;
  //   case "down":
  //     if (rowIndex < party.grid.length - 1) {
  //       party.grid[rowIndex][columnIndex].user = null;
  //       party.grid[rowIndex + 1][columnIndex].user = user;
  //     }
  //     break;

  //   default:
  //     break;
  // }
  partyArray[partyIndex].grid = party.grid;
  return party.grid

}

module.exports = {
  getPartyArray,
  addToPartyArray,
  removeUser,
  move
};
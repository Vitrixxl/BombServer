const { getPartyArray } = require('./partyModule');



const move = (direction, userId, partyId) => {
    const partyArray = getPartyArray();
    const party = partyArray.find(party => party.id == partyId);
    const partyIndex = partyArray.indexOf(party);
    const currentUser = party.members.find(member => member.userId === userId);


    let rowIndex = party.grid.findIndex((row) => row.find((block) => block.userId === userId));
    let columnIndex = party.grid[rowIndex].findIndex((block) => block.userId === userId);


    switch (direction) {
        case "up":
            if (rowIndex > 0 && party.grid[rowIndex - 1][columnIndex].block === 0) {

                party.grid[rowIndex][columnIndex].userId = null;
                party.grid[rowIndex - 1][columnIndex].userId = userId;

                currentUser.position = { x: rowIndex - 1, y: columnIndex }
            }
            break;
        case "right":
            if (columnIndex < party.grid[0].length - 1 && party.grid[rowIndex][columnIndex + 1].block === 0) {

                party.grid[rowIndex][columnIndex].userId = null;
                party.grid[rowIndex][columnIndex + 1].userId = userId;

                currentUser.position = { x: rowIndex, y: columnIndex + 1 }
            }
            break;
        case "left":
            if (columnIndex > 0 && party.grid[rowIndex][columnIndex - 1].block === 0) {
                party.grid[rowIndex][columnIndex].user = null;
                party.grid[rowIndex][columnIndex].userId = null;
                party.grid[rowIndex][columnIndex - 1].userId = userId;
                party.grid[rowIndex][columnIndex - 1].user = userId;
                currentUser.position = { x: rowIndex, y: columnIndex - 1 }
            }
            break;
        case "down":
            if (rowIndex < party.grid.length - 1 && party.grid[rowIndex + 1][columnIndex].block === 0) {
                party.grid[rowIndex][columnIndex].user = null;
                party.grid[rowIndex][columnIndex].userId = null;
                party.grid[rowIndex + 1][columnIndex].userId = userId;
                party.grid[rowIndex + 1][columnIndex].user = userId;
                currentUser.position = { x: rowIndex + 1, y: columnIndex }
            }
            break;

        default:
            break;
    }

    partyArray[partyIndex].grid = party.grid;
    partyArray[partyIndex].members = party.members;

    return partyArray[partyIndex];

}

module.exports = {
    move
}
const { getPartyArray } = require('./partyModule.js');
const { getUsers, addUser, handleLeaving, userJoining } = require('./usersModule.js');

const placeBomb = (userId, partyId) => {

    // const users = getUsers();

    // const user = users.find(u => u.id === userId);


    const partyArray = getPartyArray();
    const party = partyArray.find(party => party.id === partyId);
    const partyIndex = partyArray.indexOf(party);
    const users = party.members;
    const currentUser = users.find(u => u.userId === userId).position;
    const x = currentUser.x;
    const y = currentUser.y;

    const grid = party.grid;
    grid[x][y].bomb = true;
    party.grid = grid;
    partyArray[partyIndex] = party;

    const positions = [
        { x: x, y: y },
        { x: x, y: y - 1 },
        { x: x - 1, y: y },
        { x: x, y: y + 1 },
        { x: x + 1, y: y }
    ]

    party.grid = grid;
    partyArray[partyIndex] = party;



    return { grid: partyArray[partyIndex].grid, explode: positions };


}
module.exports = {
    placeBomb
};
const { move } = require('../mouvement');
const { placeBomb } = require('../bomb');
const { getPartyArray } = require('../partyModule');
module.exports = (socket, io) => {
    socket.on("move", (direction, partyId) => {

        const newPositions = move(direction, socket.id, partyId);
        io.to(partyId).emit("newPosition", newPositions);

    })

    socket.on("bomb", (partyId) => {
        console.log("hey")
        const update = placeBomb(socket.id, partyId);
        const newGrid = update.grid;
        const explode = update.explode;
        io.to(partyId).emit("newBomb", newGrid);
        setTimeout(() => {

            const partyArray = getPartyArray();
            const party = partyArray.find(party => party.id === partyId);
            const partyIndex = partyArray.indexOf(party);
            const grid = party.grid;
            const members = party.members;
            const { x, y } = members.find(u => u.userId === socket.id).position;

            explode.forEach(pos => {

                if (pos.x >= 0 && pos.x < grid.length && pos.y >= 0 && pos.y < grid[0].length) {
                    if (grid[pos.x][pos.y].block === 1 || grid[pos.x][pos.y].bomb) {
                        grid[pos.x][pos.y].block = 0;
                    }
                    if (pos.x === x && pos.y === y) {
                        grid[pos.x][pos.y].userId = null;
                        io.to(partyId).emit("gameOver", "Game Over");
                    }
                }
            })
            console.table(explode)
            grid[explode[0].x][explode[0].y].bomb = false;
            party.grid = grid;

            partyArray[partyIndex] = party;




            io.to(partyId).emit("explode", partyArray[partyIndex].grid);
        }, 3000);

    })

}
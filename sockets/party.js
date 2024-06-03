const { getPartyArray, addToPartyArray } = require('../partyModule');
const { createGrid } = require('../gridModule');
const { v4: uuidv4 } = require('uuid');
module.exports = (socket, io) => {



    socket.on('create', (username) => {

        const partyId = uuidv4().substring(0, 8);

        const newGrid = createGrid(11, 11);
        newGrid[0][0].user = username;
        newGrid[0][0].userId = socket.id;



        const party = {
            id: partyId,
            grid: newGrid,
            members: [{ username: username, userId: socket.id, position: { x: 0, y: 0 } }]
        };

        addToPartyArray(party);

        socket.join(partyId);

        io.to(partyId).emit('redirect', './party/' + partyId);


    });


    socket.on('join', (partyId, username) => {

        const partyArray = getPartyArray();

        const party = partyArray.find(party => party.id === partyId);

        if (!party) {
            socket.emit('error', 'Party not found');
        }
        let currentPosition = { x: 0, y: 0 };
        const grid = party.grid;
        if (grid[0][10].user === null) {
            grid[0][10].user = username;
            grid[0][10].userId = socket.id;
            currentPosition = { x: 0, y: 10 };
        } else if (grid[10][0].user === null) {
            grid[10][10].user = username;
            grid[10][10].userId = socket.id;
            currentPosition = { x: 10, y: 10 };
        } else if (grid[10][0].user === null) {
            grid[10][0].user = username;
            grid[10][0].userId = socket.id;
            currentPosition = { x: 10, y: 0 };
        } else {
            socket.emit('error', 'Party is full');
        }

        console.log(grid)
        party.grid = grid;
        party.members.push({ username: username, userId: socket.id, position: currentPosition });


        socket.join(partyId);

        socket.emit('redirect', './party/' + partyId);

    });



    socket.on('globalInfo', (partyId) => {

        const partyArray = getPartyArray();

        const party = partyArray.find(party => party.id === partyId);

        if (!party) {
            socket.emit('error', 'Party not found');
        }

        io.to(partyId).emit('globalInfo', party);
    })

};



const { Server } = require("socket.io");
const { getUsers, addUser, handleLeaving, userJoining } = require('../usersModule.js');
const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);
        addUser(socket.id);
        console.log(getUsers());
        require('./party')(socket, io);
        require('./actions')(socket, io);
        socket.on('disconnect', () => {
            console.log('User disconnected: ' + socket.id);
            handleLeaving(socket.id);
        });


    });

    return io;
};

module.exports = configureSocket;
const db = require('../db/users');
const { PlayersHandler, Movement1Handler, registerHandler, Movement2Handler } = require('../events-handlers/phoneHandlers');

const PhoneEvent = (socket, io) => {
	socket.on('Players', PlayersHandler(socket, db, io));
	socket.on('MovementPlayer1', Movement1Handler(socket, db, io));
	socket.on('MovementPlayer2', Movement2Handler(socket, db, io));
	socket.on('registerEvent', registerHandler(socket, db, io));
};

module.exports = { PhoneEvent };



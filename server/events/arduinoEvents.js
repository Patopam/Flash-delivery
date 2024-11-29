const db = require('../db/users');
const { event1Handler} = require('../events-handlers/arduinoHandlers');

const exampleEvent = (socket, io) => {
	socket.on('winnerOn', event1Handler(socket, db, io));
};

module.exports = { exampleEvent };

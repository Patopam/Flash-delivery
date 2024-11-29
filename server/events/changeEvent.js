const db = require('../db/users');
const { event1Handler, event2Handler, event3Handler, returnScreen1Handler } = require('../events-handlers/changeHandlers');

const changeEvent = (socket, io) => {
	socket.on('event1', event1Handler(socket, db, io));
	socket.on('event2', event2Handler(socket, db, io));
	socket.on('winnerChange', event3Handler(socket, db, io));
	socket.on('returnScreen1', returnScreen1Handler(socket, db, io));
};

module.exports = { changeEvent };	
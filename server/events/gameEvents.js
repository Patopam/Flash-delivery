// gameEvents.js
const db = require('../db/users');
const { winnerHandler, sendHandler, event3Handler } = require('../events-handlers/gameHandlers');

const GameEvents = (socket, io) => {
	// Escucha el evento 'startGame' para iniciar el temporizador
	socket.on('Winner', winnerHandler(socket, db, io));

	// Otros eventos
	socket.on('sendWinnerEmail', sendHandler(socket, db, io));
	socket.on('notification', event3Handler(socket, db, io));
};

module.exports = { GameEvents };

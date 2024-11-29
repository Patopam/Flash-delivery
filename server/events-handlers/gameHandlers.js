// gameHandlers.js
const {createPlayers} = require ('../db/users')
const { utilFuntion1, utilFuntion2 } = require('../utils/helpers');
const {sendEmail} = require ('../SERVICES/Brevo')
const winnerHandler = (socket, db, io) => {

	return (winner) => {
		io.emit("Winner", winner);
		sendEmail( winner)
		
	};
};

const sendHandler = (socket, db, io) => {
	return () => {
		
	};
};

const event3Handler = (socket, db, io) => {
	return () => {
		// Lógica para manejar el evento 'notification'
	};
};

module.exports = {
	winnerHandler,
	sendHandler,
	event3Handler,
};

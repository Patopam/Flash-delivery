// eventsExampleHandlers.js
const {createPlayers} = require ('../db/users')
const { utilFuntion1, utilFuntion2 } = require('../utils/helpers');

// Assuming db and io are required or passed in some way to be accessible
const PlayersHandler = (socket, db, io) => {
    return (players) => {
       console.log(" prueba ", {players});
        io.emit("players", { players });
    };
};


const Movement1Handler = (socket, db, io) => {
	return (data) => {
		console.log("Datos recibidos en el servidor jugador1:", {data});
		io.emit('MovementPlayer1',  data );
	};
};

const Movement2Handler = (socket, db, io) => {
	return (data) => {
		console.log("Datos recibidos en el servidor jugarodr2:", {data});
		io.emit('MovementPlayer2',  data );
};
};
const registerHandler = (socket, db, io) => {
	return (users) => {
		createPlayers
	};
};
module.exports = {
	PlayersHandler,
	Movement1Handler,
	Movement2Handler,
	registerHandler
};

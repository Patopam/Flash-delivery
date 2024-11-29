const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// Cambiamos 'users' por 'players' para mantener consistencia
router.get('/users', usersController.getPlayers);
router.post('/players', usersController.createPlayers);


module.exports = router;
const express = require('express');
const cors = require('cors');

const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const path = require('path');

const clientApp1Path = path.resolve(__dirname, '../Display');
const clientApp2Path = path.resolve(__dirname, '../Phone');
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Serve Client App 1
app.use('/Display', express.static(clientApp1Path));

// Serve Client App 2
app.use('/Phone', express.static(clientApp2Path));

// Catch-all route for Client App 1
app.get('/Display/*', (req, res) => {
	res.sendFile(path.join(clientApp1Path, 'index.html'));
});

// Catch-all route for Client App 2
app.get('/Phone/*', (req, res) => {
	res.sendFile(path.join(clientApp2Path, 'index.html'));
});

const usersRouter = require('./routes/users');

app.use('/api', usersRouter);

module.exports = app;
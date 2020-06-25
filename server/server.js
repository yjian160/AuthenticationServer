const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./utils/db');

const AuthController = require('./controllers/AuthController');

app.use('/auth', AuthController)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
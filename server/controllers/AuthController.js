const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('./../models/User');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const VerifyToken = require('./../utils/VerifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./../../config');

router.post('/signup', (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }, (err, user) => {
        if (err)
            return res.status(500).send("There was a problem registering the user");

        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });

        res.status(200).send({ auth: true, token: token });
    })
});
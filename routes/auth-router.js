const express = require('express');
const routes = express.Router();
const authMiddleWare = require('../middleware/Access-control-middleware');

const { registration, login, changePassword } = require('../controllers/auth-handlers')

routes.post('/register', registration);

routes.post('/log', login);

routes.post('/change', authMiddleWare, changePassword);

module.exports = routes;



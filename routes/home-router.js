
const express = require('express');
const routes = express.Router();
const authMiddleWare = require('../middleware/Access-control-middleware');

routes.get('/welcome', authMiddleWare, (req, res) => {
    const userInfo = req.userInfo;
    res.status(200).json({
        success: true,
        message: "Welcome to home Page!!",
        userInfo,
    })
});

module.exports = routes;


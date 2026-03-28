const express = require('express');
const authMiddleWare = require('../middleware/Access-control-middleware');
const roleAuthMiddleware = require('../middleware/Role-base-Access-Control-Middleware');
const routes = express.Router();

routes.get('/admin-user', authMiddleWare, roleAuthMiddleware, (req, res) => {
    const userInfo = req.userInfo;
    res.status(200).json({
        success: true,
        message: "Welcome to Admin!!",
        userInfo
    });
});

module.exports = routes;



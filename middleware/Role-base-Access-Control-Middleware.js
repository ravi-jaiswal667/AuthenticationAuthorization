
const roleAuthMiddleware = (req, res, next) => {


    const role = req.userInfo.role;
    console.log('role', role);
    if (role !== 'admin') {
        return res.status(401).json({
            success: false,
            messge: "Access denied!, role is 'USER",
        })
    }
    next();
}

module.exports = roleAuthMiddleware;




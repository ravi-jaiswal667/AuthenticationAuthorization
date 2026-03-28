const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
    console.log("AuthMiddleWare Called!!");
    const authHeader = req.headers['authorization'];

    // console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({
            message: "token not found!!"
        })
    }
    const token = authHeader && authHeader.split(" ")[1];
    // Decode the token
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('decodeToken', decodeToken);
        req.userInfo = decodeToken;
        next();
    }
    catch (e) {
        res.status(401).json({
            message: "Token time crashes!!"
        })
    }
}

module.exports = authMiddleWare;










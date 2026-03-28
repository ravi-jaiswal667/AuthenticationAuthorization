const authRoute = require('../routes/auth-router');
const User = require('../module/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// registration
const registration = async (req, res) => {
    try {
        const { user, email, password, role } = req.body;
        // check if the user already registered or not
        const checkExistingUser = await User.findOne({ $or: [{ user }, { email }] });
        if (checkExistingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists, Try with another userName!!",
            })
        }
        // hash the password    
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newlyCreatedUser = User({
            user,
            email,
            password: hashPassword,
            role: role || "user",
        });
        await newlyCreatedUser.save();

        if (newlyCreatedUser) {
            res.status(200).json({
                success: true,
                message: "User registered successfully!!",
                newlyCreatedUser,
            })
        }
    }

    catch (e) {
        res.status(400).json({
            success: false,
            message: "registration Failed!!",
        })
    }
}

// login
const login = async (req, res) => {
    try {
        const { user, password } = req.body;
        // console.log('user', user);
        // check if the user already registered or not -> i.e. user already exists in database or not
        const existingUser = await User.findOne({ user });
        if (!existingUser) {
            res.json({
                success: false,
                message: "User does not exists, Register the user first!!",
            })
        }
        const checkPassword = await bcrypt.compare(password, existingUser.password);
        if (!checkPassword) {
            res.json({
                success: false,
                message: "Password does not match, Register the user first!!",
            })
        }
        // create a token
        const accessToken = jwt.sign({
            userId: existingUser._id,
            username: existingUser.username,
            role: existingUser.role,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '45m'
        });

        res.status(200).json({
            succes: true,
            message: 'Logged in successful',
            accessToken
        })

    } catch (e) {
        res.status(400).json({
            success: false,
            message: "Log In User Failed!!",
        })
    }
}

// change password
const changePassword = async (req, res) => {
    // find the current user
    const userId = req.userInfo.userId;
    const user = await User.findById(userId);
    // Get old and new passwords entered by user
    const { oldPassword, newPassword } = req.body;
    // check is the oldPassword matched i.e. user is valid or not
    const checkPassword = await bcrypt.compare(oldPassword, user.password);

    if (!checkPassword) {
        res.status(500).json({
            succes: false,
            message: "Password is not correct! Plz enter correct password",
        })
    }
    // update the olsPassword with new one
    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // update the user password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
        succes: true,
        message: "Password changed successfully!!"
    })
}

module.exports = { registration, login, changePassword };






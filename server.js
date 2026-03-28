require("dotenv").config();
const express = require('express');
const app = express();
const authUser = require('./routes/auth-router');
const homeUser = require('./routes/home-router');
const adminUser = require('./routes/admin-router');
const uploadImage = require('./routes/image-routes');
const fetchImages = require('./routes/image-routes');
const changePassword = require('./routes/auth-router');
const deleteImage = require('./routes/image-routes');
const PORT = process.env.PORT || 3000;
const connectToDb = require('./database/db');
connectToDb();

// middleware
app.use(express.json());
app.use('/api/auth', authUser);
app.use('/api/home', homeUser);
app.use('/api/admin', adminUser);
app.use('/api/uploads', uploadImage);
app.use('/api/images', fetchImages);
app.use('/api/auth', changePassword)
app.use('/api/delete', deleteImage);
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})







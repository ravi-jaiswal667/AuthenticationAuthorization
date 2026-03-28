const express = require('express');
const authMiddleWare = require('../middleware/Access-control-middleware');
const roleAuthMiddleware = require('../middleware/Role-base-Access-Control-Middleware');
const router = express.Router();
const uploadMiddleware = require('../middleware/upload-middleware');
const { uploadImageController, fetchAllImagesController, deleteImageController } = require('../controllers/image-controller');


// upload the image
router.post('/upload', authMiddleWare, roleAuthMiddleware, uploadMiddleware.single("image"),
    uploadImageController
);

// to get all the images
router.get('/get', authMiddleWare, fetchAllImagesController);

// to delete the image
// "uploadedBy" = "6985ea1153f676dda2a525ea"
router.delete('/:id', authMiddleWare, roleAuthMiddleware, deleteImageController);
module.exports = router;


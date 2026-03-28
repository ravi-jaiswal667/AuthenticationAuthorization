const { image } = require('../config/cloudinary');
const uploadToCloudinary = require('../helper/cloudinaryHelper');
const Image = require('../module/image');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(500).json({
                success: false,
                message: "File is not present",
            })
        }
        // upload to cloudinary 
        const { url, publicId } = await uploadToCloudinary(req.file.path);
        // store in database
        const newlyUploadedImage = Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId,
        })
        await newlyUploadedImage.save();
        res.json({
            success: true,
            message: "Image uploaded successfully!!",
            image: newlyUploadedImage
        })
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }

    // deleting the file/image
    // if (req.file && req.file.path) {
    //     try {
    //         fs.unlinkSync(req.file.path);
    //     } catch (err) {
    //         console.error('File delete failed:', err.message);
    //     }
    // }

}

// Fetch all images
const fetchAllImagesController = async (req, res) => {
    try {
        const images = await Image.find({});

        res.status(200).json({
            success: true,
            count: images.length,
            data: images
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch images',
            error: error.message
        });
    }
};

// delete image
const deleteImageController = async (req, res) => {
    try {
        const getIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getIdOfImageToBeDeleted);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image is not present!!"
            });
        }

        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "User is invalid, cannot delete another user's image"
            });
        }

        // delete from cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        // delete from DB
        await Image.findByIdAndDelete(getIdOfImageToBeDeleted);

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully!!"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete image",
            error: error.message
        });
    }
};

module.exports = {
    uploadImageController,
    fetchAllImagesController, deleteImageController
};


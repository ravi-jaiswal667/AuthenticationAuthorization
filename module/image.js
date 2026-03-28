const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
},
    {
        timestamps: true   // createdAt & updatedAt auto add
    }
)

module.exports = mongoose.model("Image", ImageSchema);




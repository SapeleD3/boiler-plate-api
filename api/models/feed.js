const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    tagline: String,
    imageUrl: {
        type: String,
        required: true
    },
    videoUrl: String,
    desc: String

})

module.exports = mongoose.model('Feed', feedSchema)
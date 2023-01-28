const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});


module.exports = mongoose.model('Member', memberSchema);
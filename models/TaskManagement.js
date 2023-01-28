const mongoose = require('mongoose');

const TaskManagementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = Taskmanage = mongoose.model('TaskManagement', TaskManagementSchema);
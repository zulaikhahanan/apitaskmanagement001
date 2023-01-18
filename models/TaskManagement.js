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
    finished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    attachment: {
        type: String,
        required : true
    },

    groupmembers:[{
        name :{type: String, required:true},
        avatar:{type:String},
        position :{type:String, required:true}
    }]
});

module.exports = Taskmanage = mongoose.model('Taskmanage', TaskManagementSchema);
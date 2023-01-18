const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskManagement',
        required : true
    }, 

    status: {
        type: String,
        required: false
    },

    deadline: {
        type: Date,
        required: true
    },

    user_assigned : [{
        name :{type: String, required:true},
        avatar:{type:String},
        position :{type:String, required:true}
    }]
});


module.exports = mongoose.model('Tasks', taskSchema);
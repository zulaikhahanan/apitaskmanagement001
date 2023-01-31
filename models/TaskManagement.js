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
 

});

const TaskManagementSchema = new mongoose.Schema({
  title: {
      type: String,
      
  },
  description: {
      type: String
  },
 member: {
  type: [memberSchema],
  required: false,
},

  //createdAt: {
    //  type: Date,
   //   default: Date.now
 // }

});

module.exports = Taskmanage = mongoose.model('TaskManagement', TaskManagementSchema);
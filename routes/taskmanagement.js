const express = require('express');
const auth = require('../middleware/user_jwt');

const TaskManagement = require('../models/TaskManagement');

const router = express.Router();
// desc  Create New Project
// method POST
router.post('/', auth, async (req, res, next) => {
    try {
        const TaskManagement = await TaskManagement.create({ title: req.body.title, description: req.body.description});
        if(!TaskManagement) {
            return res.status(400).json({
                success: false,
                msg: 'Something Went Wrong'
            });
        }

        res.status(200).json({
            success: true,
            TaskManagement: TaskManagement,
            msg: 'Successfully Create New Project.'
        });
    } catch (error) {
        next(error);
    }
});

//desc   Fetch all Project
//mehod  GET
router.get('/', auth, async(req, res, next) => {
    try {
        const TaskManagement= await TaskManagement.find({user: req.user.id});

        if(!TaskManagement) {
            return res.status(400).json({ success: false, msg: 'Something Error Happened'});
        }

        res.status(200).json({ success: true, count: TaskManagement.length, TaskManagements: TaskManagement, msg: 'Successfully Fetched'})
    } catch (error) {
        next(error);
    }
});




//desc   Fetch All Project That Finished: true
//mehod  GET
router.get('/finished', auth, async(req, res, next) => {
    try {
        const TaskManagement = await TaskManagement.find({user: req.user.id, finished: true});

        if(!TaskManagement) {
            return res.status(400).json({ success: false, msg: 'Something Error Happened'});
        }

        res.status(200).json({ success: true, count: TaskManagement.length, TaskManagements: TaskManagement, msg: 'Successfully Fetched'})
    } catch (error) {
        next(error);
    }
});

// desc   Update A Project
// method PUT
router.put('/:id', async (req, res, next) => {
    try {
        let TaskManagement = await TaskManagement.findById(req.params.id);
        if(!TaskManagement) {
            return res.status(400).json({ success: false, msg: 'Project Is Not Exists' });
        }

        TaskManagement = await TaskManagement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true,TaskManagement: TaskManagement, msg: 'Successfully updated' });
        
    } catch (error) {
        next(error);
    }
});

// desc Delete a Project
// method Delete
router.delete('/:id', async (req, res, next) => {
    try {
        let TaskManagement = await TaskManagement.findById(req.params.id);
        if(!TaskManagement) {
            return res.status(400).json({ success: false, msg: 'Project Is Not Exists' });
        }
    
        TaskManagement = await TaskManagement.findByIdAndDelete(req.params.id);
    
        res.status(200).json({
            success: true, msg: 'Successfully Delete The Chosen Project.'
        });
    } catch (error) {
        next(error);
    }
});
module.exports = router;
const express = require('express');
const auth = require('../middleware/user_jwt');

const Task = require('../models/Task');

const router = express.Router();


// desc    Create New Task
// method POST
router.post('/', auth, async (req, res, next) => {
    try {
        const task = await Task.create({ title: req.body.title, deadline: req.body.deadline, status : req.body.status, user_assigned:req.body.user_assigned,description: req.body.description, user: req.user.id,project: req.project.id});
        if(!task) {
            return res.status(400).json({
                success: false,
                msg: 'Something Went Wrong'
            });
        }

        res.status(200).json({
            success: true,
            task: task,
            msg: 'Successfully Create New Task.'
        });
    } catch (error) {
        next(error);
    }
});

//desc   Fetch all Task
//mehod  GET
router.get('/', auth, async(req, res, next) => {
    try {
        const task= await Task.find({user: req.user.id, status: false});

        if(!task) {
            return res.status(400).json({ success: false, msg: 'Something Error Happened'});
        }

        res.status(200).json({ success: true, count: task.length, tasks: task, msg: 'Successfully Fetched'})
    } catch (error) {
        next(error);
    }
});


//desc   Fetch All Task That Finished: true
//mehod  GET
router.get('/finished', auth, async(req, res, next) => {
    try {
        const task = await Task.find({user: req.user.id, finished: true});

        if(!task) {
            return res.status(400).json({ success: false, msg: 'Something Error Happened'});
        }

        res.status(200).json({ success: true, count: task.length, tasks: task, msg: 'Successfully Fetched'})
    } catch (error) {
        next(error);
    }
});

// desc   Update A Task
// method PUT
router.put('/:id', async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(400).json({ success: false, msg: 'Task Is Not Exists' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true,task: task, msg: 'Successfully updated' });
        
    } catch (error) {
        next(error);
    }
});

// desc Delete a Task
// method Delete
router.delete('/:id', async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(400).json({ success: false, msg: 'Task Is Not Exists' });
        }
    
        task = await Task.findByIdAndDelete(req.params.id);
    
        res.status(200).json({
            success: true, msg: 'Successfully Delete The Chosen Task.'
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;
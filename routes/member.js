const express = require('express');
const auth = require('../middleware/user_jwt');

const Member = require('../models/Member');

const router = express.Router();

// desc  Create New Member
// method POST
router.post('/', auth, async (req, res, next) => {
    try {
        const Member = await Member.create({ name: req.body.name, role: req.body.role,  user: req.user.id});
        if(!Member) {
            return res.status(400).json({
                success: false,
                msg: 'Something Went Wrong'
            });
        }

        res.status(200).json({
            success: true,
            Mmeber: Member,
            msg: 'Successfully Create New Member.'
        });
    } catch (error) {
        next(error);
    }
});

//desc   Fetch all Member
//mehod  GET
router.get('/', auth, async(req, res, next) => {
    try {
        const Member= await Member.find({user: req.user.id, finished: false});

        if(!Member) {
            return res.status(400).json({ success: false, msg: 'Something Error Happened'});
        }

        res.status(200).json({ success: true, count: Member.length, Members: Member, msg: 'Successfully Fetched'})
    } catch (error) {
        next(error);
    }
});


module.exports = router;
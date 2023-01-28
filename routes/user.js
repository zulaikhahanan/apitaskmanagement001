const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const user_jwt = require('../middleware/user_jwt');
const jwt = require('jsonwebtoken');


router.get('/', user_jwt, async(req, res, next) => {
    try {

        const user = await User.findById(req.user.id).select('-password');
            res.status(200).json({
                success: true,
                user: user
            });
    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        })
        next();
    }
});

router.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        
        let user_exist = await User.findOne({ email: email });

        if(user_exist) {
            return res.status(400).json({
                success: false,
                msg: 'User Already Exists'
            });
        }
        
        let user = new User();

        user.username = username;
        user.email = email;

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        let size = 200;
        user.avatar = "https://gravatar.com/avatar/?s="+size+'&d=retro';


        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }


        jwt.sign(payload, process.env.jwtUserSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            
            res.status(200).json({
                success: true,
                token: token
            });
        });



    } catch(err) {
        console.log(err);
        res.status(402).json({
            success: false,
            message: 'Something Error Occured'
        })
    }
});




router.post('/login', async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {

        let user = await User.findOne({
            email: email
        });

        if(!user) {
            return res.status(400).json({
                success: false,
                msg: 'User Is Not Exists. Please Register To Proceed.'
            });
        }


        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid Password'
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, process.env.jwtUserSecret,
            {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err;

                res.status(200).json({
                    success: true,
                    msg: 'User Logged In',
                    token: token,
                    user: user
                });
            }
        )

    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        })
    }
});


router.put('/profile', async (req, res, next) => {
    try {
        const User = await User.findById(req.user.id);
        if(!User) {
            return res.status(400).json({ success: false, msg: 'Invalid Error ' });
        }

        User = await User.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true,User: User, msg: 'Successfully Update The Profile Settings' });
        
    } catch (error) {
        next(error);
    }
});





module.exports = router;
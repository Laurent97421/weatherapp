// var express = require('express');
import express from "express"

var userModel = require('../models/User')
const authRouter = express.Router();


// Login

authRouter.post('/signup', async (req, res) => {


    var findMail = await userModel.findOne({ mail: req.body.mail })

    if (!findMail) {
        var newUser = new userModel({
            username: req.body.username,
            mail: req.body.mail,
            password: req.body.password
        });
        var newUserSaved = await newUser.save();

        // @ts-ignore
        req.session.user = {
            name: newUserSaved.username,
            id: newUserSaved._id
        }
        res.send({ success: true, user: newUserSaved });
    } else {
        res.send({ success: false });
    }

});

// @ts-ignore
authRouter.post('/signin', async function (req, res, next) {

    var userExist = await userModel.findOne({ mail: req.body.mail, password: req.body.password })

    if (userExist != null) {
        // @ts-ignore
        req.session.user = {
            name: userExist.mail,
            id: userExist._id
        }
        res.send({success: true});
    } else {
        res.send({succes: false});
    }
});

// @ts-ignore
authRouter.get('/logout', function (req, res, next) {
    // @ts-ignore
    req.session.user = null;
    res.redirect('/');
});


// module.exports = router;
export default authRouter;

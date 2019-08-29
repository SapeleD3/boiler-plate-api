const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.registerUser = (req, res) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    message: 'Mail already Exist Login'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status.apply(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })

            }
        })
}

exports.deleteUser = (req, res) => {
    User.remove({_id: req.params.id})
    .exec()
    .then(resp => {
        resp.status(200).json({
            message: 'user deleted successfully'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

//get all users
exports.getUsers = (req, res) => {
    User.find()
    .exec()
    .then(users => {
        res.status(200).json({
            message: 'users fetch successful',
            UserEmail: users[0].email
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

//login to access data
exports.loginUsers = (req, res) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: 'User not available go and Register'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if(result){
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                })
            }
            return res.status(401).json({
                message: 'Auth Failed'
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}
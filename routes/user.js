const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const {sendNotification} = require('../notification/notificationMailer')
const db = require('../config/mysql')
//for sanitization
const {check, validationResult} = require('express-validator')

router.post('/registerationlink', (req, res) => {
    
    db.query(
        "INSERT INTO emails(email) VALUES(?)",
        req.body.email,
        (err, result) => {
            if (err) 
                return res
                    .status(500)
                    .send('System Error')
            }
    )

    sendNotification(req.body.email)
    res.json({msg: 'Registration mail sent to given Email'})

});

router.post('/register', [
    check('email').isEmail(), check('password')
        .not()
        .isEmpty(),
    check('name')
        .isLength({min: 5})
        .not()
        .isEmpty()
], (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({errors: errors.array()})
    }
    //calling database to insert user data
    //create a controller to handle this
    db.query(
        "SELECT * from registereduser WHERE EMAIL = ?",
        [req.body.email],
        (err, result) => {

            if (err) {
                return res  
                    .status(500)
                    .send('System Error');
            } else {

                if (result.length > 0) {
                    return res.status(401).json({msg: 'User Already exists'})
                }
                const hashedPassword = crypto
                    .createHash('md5')
                    .update(req.body.password)
                    .digest('hex');
                db.query("INSERT INTO registereduser(email, name, password) VALUES(?)", [
                    [req.body.email, req.body.name, hashedPassword]
                ], (err, result) => {

                    if (err) {
                        console.log(err)
                        return res
                            .status(500)
                            .send('System Error');
                    }
                    db.query(
                        "SELECT email, name from registereduser WHERE EMAIL = ?",
                        [req.body.email],
                        (err, user) => {

                            if (err) {
                                console.log(err)
                                return res
                                    .status(500)
                                    .send('System Error');
                            }
                            
                            
                            const ruser = {
                                name: user[0].name,
                                email: user[0].email
                            }
                            const token = jwt.sign(ruser, 'zocket')
                            res.cookie('t', token,  {expire:new Date() + 9999})
                            res.json({msg: 'User Created Successfully', ruser, token})

                        }
                    )

                })

            }
        }
    )
});

module.exports = router
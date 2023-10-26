const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = "mynameisanihiimveryveryeveryveryevery"
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "minimum length 5").isLength({ min: 5 })]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                email: req.body.email,
                name: req.body.name
                , password: secpassword


            })

            res.json({ success: true })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })



router.post('/loginuser', [body('email').isEmail(),

body('password', "minimum length 5").isLength({ min: 5 })], async (req, res) => {


    let email = req.body.email;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let userdata = await User.findOne({ email });
        if (!userdata) {
            return res.status(400).json({ errors: "wrong email" })
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userdata.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "wrong password" })
        }
        const data = {
            user: {
                id: userdata.id
            }
        }
        const authToken = jwt.sign(data, jwtsecret)
        return res.status(200).json({ success: true, authToken: authToken });
    }
    catch (error) {
        console.log(error)
        res.json({ success: false })
    }
})

module.exports = router;


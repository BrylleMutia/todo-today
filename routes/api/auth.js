const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// import User Model / Schema
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   POST /api/auth
// @desc    Authenticate user
// @access  Public
router.post("/", (req, res) => {
    const { email, password } = req.body;

    // simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: "Please fill all input fields" });
    }

    // check if user is signed up
    User.findOne({ email }).then((user) => {
        if (!user) return res.status(400).json({ msg: "User does not exist " });

        // validate user
        bcrypt.compare(password, user.password).then((isMatch) => {
            // if doesnt match
            if (!isMatch) return res.status(400).json({ msg: "Invalid username or password" });

            // if match, send user details and jsonwebtoken
            jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
                if (err) console.error(err);
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                });
            });
        });
    });
});

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id) // set on auth middleware (jwt payload)
        .select("-password") // exclude password
        .then((user) => res.json(user));
});

module.exports = router;

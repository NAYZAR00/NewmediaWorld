const User = require("../models/User");
const {mongoose} = require("mongoose");
const createToken  = require("../JWT/createToken");
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/"
};
const Userscontroller = {
    current: async (req, res) => {
        try {
            const user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch current user" });
        }
    },

    login: async (req, res) => {
       try {
            const { email, password } = req.body;
            let user = await User.login(email, password);
            let token = createToken(user._id);
            res.cookie("jwt", token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
            const userResponse = user.toObject();
            delete userResponse.password;
            return res.status(200).json({
                message: "User logged in successfully",
                user: userResponse,
                token
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    register: async (req, res) => {

        try{
            const { username, email, password } = req.body;

            let user = await User.register(username, email, password);
            let token = createToken(user._id);
            res.cookie("jwt", token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });


            const userResponse = user.toObject();
            delete userResponse.password;

            return res.status(201).json({
                message: "User registered successfully",
                user: userResponse,
                token
            });
        }catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern || {})[0];
                return res.status(409).json({
                    message: field === "username"
                        ? "Username already exists"
                        : "Email already exists"
                });
            }
            res.status(400).json({ message: error.message });
        }

    },
    logout: async (req, res) => {
        res.clearCookie("jwt", cookieOptions);
        return res.status(200).json({ message: "User logged out successfully" });
    }   
};

module.exports = Userscontroller;
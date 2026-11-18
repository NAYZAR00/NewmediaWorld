const express = require("express");
const router = express.Router();

const Userscontroller = require("../controllers/UsersControllers");
const Authmiddleware = require("../middleware/Authmiddleware");
const { body } = require("express-validator");
const handleValidationErrors = require("../handlerVaildion/Handler");

router.get("/me", Authmiddleware, Userscontroller.current);
router.post("/login", Userscontroller.login);
router.post("/register", 
    [
        body("username").trim().notEmpty().withMessage("Username is required"),
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .bail()
            .isEmail().withMessage("A valid email is required"),
        body("password")
            .notEmpty().withMessage("Password is required")
            .bail()
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    ],
    
    handleValidationErrors,
    Userscontroller.register
);
router.post("/logout", Userscontroller.logout);

module.exports = router;
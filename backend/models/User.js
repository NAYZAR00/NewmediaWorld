const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { 
    timestamps: true 
});

userSchema.statics.register = async function(username,email, password) {
    let UserInfo = await this.findOne({ email });
    if(UserInfo){
        throw new Error("Email already exists");
    }

        let salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

    let user = await this.create({ username, email, password: hashPassword });

    return user;

};

userSchema.statics.login = async function(email, password) {
    let user = await this.findOne({ email });
    if(!user){
        throw new Error("User not found");
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Invalid password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
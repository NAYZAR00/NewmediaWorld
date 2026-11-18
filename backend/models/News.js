const mogoess = require("mongoose");
const Schema = mogoess.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
   
},{ 
    timestamps: true
});



module.exports = mogoess.model("News", newsSchema);
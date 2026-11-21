
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
var cookieParser = require('cookie-parser')
dotenv.config();

const app = express();


app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:5173",
            "https://newmedia-world.vercel.app",
            "https://newmedia-world-ly24zfmhi-gg-917a.vercel.app",
            "https://newmedia-world-flywyzt5-gg-917a.vercel.app"
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
const newsRouter = require("./router/News");
const usersRouter = require("./router/Users");

const Authmiddleware = require("./middleware/Authmiddleware");
const mongoose = require("mongoose");
const path = require("node:path");


const mongoURI = process.env.MONGODB_URL;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome to the News API");
});

app.get("/set-cookie", (req, res) => {
    res.cookie("token", "1234567890", { httpOnly: true, secure: true, sameSite: "strict" });
    res.send("Cookie has been set");
});

// News API routes
app.use("/api/news",Authmiddleware, newsRouter);
app.use("/api/users", usersRouter);

mongoose.connect(mongoURI).then(() =>{
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

})

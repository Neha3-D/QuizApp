require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const questionRoutes = require("./routes/question-routes")

const port = process.env.PORT || 8000;

const app = express();

// middlewares
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("backend is running successfully")
})

// routes
app.use("/v1/questions", questionRoutes)

// connect db and start server
const startTime = Date.now();

connectDB().then(()=>{
    const endTime = Date.now();

    app.listen(port,() =>{
        console.log(`Server running on ${port},
            Time taken: ${endTime-startTime}ms`)
    })
})
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'


dotenv.config()
const app = express()
app.use(express.json())

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to Database")

        app.listen(process.env.PORT || 8000, () => {
            console.log("Server Started")
        })
    })
    .catch(err => {

        console.log("Not connected to Database due to Error : ", err.message);

    })



app.use("/users", userRouter)


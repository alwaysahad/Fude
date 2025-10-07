import express from "express"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { middleware } from "./middleware"

const app = express()

app.post('/signup', (req, res) => {
    //db entry

    res.json({
        "message": "hello jii from express-server"
    })
})

app.post('/signin', (req, res) => {

    const userId = 1
    const token = jwt.sign({
        userId,
    }, process.env.JWT_SECRET)

    res.json({
        token 
    })
})

app.post('/room', middleware, (req, res) => {
    //db call

    res.json({
        roomId: 123
    })
})

app.listen(3001)
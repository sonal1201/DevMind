import express from "express"
import jwt from "jsonwebtoken"
import apiRouter from "./routes"

const app = express()


app.use('/api',apiRouter)

app.listen(3000,()=>{
    console.log(":ksdjviudf")
})
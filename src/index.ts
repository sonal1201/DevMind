import express from "express"
import connectToDatabase from "./config/db.Config"
import apiRouter from "./routes"

const app = express()
app.use(express.json())


app.use('/api',apiRouter)

app.listen(3000, async()=>{
    console.log(":ksdjviudf")
    await connectToDatabase();
})
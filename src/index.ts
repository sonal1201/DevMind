import express from "express"
import { PORT } from "./config/config"
import connectToDatabase from "./config/db.Config"
import apiRouter from "./routes"

const app = express()
app.use(express.json())


app.use('/api',apiRouter)

app.listen(PORT, async()=>{
    console.log(":ksdjviudf")
    await connectToDatabase();
})
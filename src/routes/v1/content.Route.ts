import express from "express"
import contentController from "../../controller/content.Controller"

const contentRoute = express.Router()

contentRoute.post('/createContent',contentController.createContent);

export default contentRoute
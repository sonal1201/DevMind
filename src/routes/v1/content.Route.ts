import express from "express"
import contentController from "../../controller/content.Controller"

const contentRoute = express.Router()

contentRoute.post('/createContent',contentController.createContent);
contentRoute.post('/getContent',contentController.getContent);
contentRoute.post('/deleteContent',contentController.deleteContent);


export default contentRoute
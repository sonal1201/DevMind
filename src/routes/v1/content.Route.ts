import express from "express"
import contentController from "../../controller/content.Controller"
import { userMiddlerware } from "../../middleware/authMiddleware";

const contentRoute = express.Router()

contentRoute.post('/createContent',userMiddlerware,contentController.createContent);
contentRoute.post('/getContent',contentController.getContent);
contentRoute.post('/deleteContent',userMiddlerware,contentController.deleteContent);
contentRoute.post('/updateContent',userMiddlerware,contentController.updateCotent);


export default contentRoute
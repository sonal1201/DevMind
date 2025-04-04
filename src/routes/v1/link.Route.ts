import express from "express"  
import shareController from "../../controller/share.Controller";
import { userMiddlerware } from "../../middleware/authMiddleware";

const shareRoute  = express.Router();

shareRoute.post('/create-link',userMiddlerware,shareController.createShare)

shareRoute.get('/:shareLink',userMiddlerware,shareController.getContentFromLink)

export default shareRoute
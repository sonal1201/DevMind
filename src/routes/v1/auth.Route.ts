import express from "express"
import authController from "../../controller/auth.Controller";

const userRoute = express.Router();

userRoute.post('/signup',authController.signup)
userRoute.post('/signin',authController.signin)

export default userRoute;
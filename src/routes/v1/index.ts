import express from "express"
import userRoute from "./auth.Route";

const v1Router = express.Router();

v1Router.use('/auth',userRoute)
// v1Router.use('/tag', )
// v1Router.use('/content', )
// v1Router.use('/link', )

export default v1Router;
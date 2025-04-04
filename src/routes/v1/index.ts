import express from "express"
import userRoute from "./auth.Route";
import contentRoute from "./content.Route";
import shareRoute from "./link.Route";

const v1Router = express.Router();

v1Router.use('/auth',userRoute)
// v1Router.use('/tag', )
v1Router.use('/content',contentRoute)
v1Router.use('/share', shareRoute)

export default v1Router;
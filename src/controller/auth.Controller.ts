import { Request, Response } from "express";
import userModel from "../model/user.model";
import { userValildation } from "../validator/user.Validator";


export async function signup(req: Request, res: Response){
    const username = req.body;
    const email = req.body;
    const password = req.body;

    try {
        const isValid = userValildation.safeParse({username,email,password})
        if(!isValid.success){
            res.status(411).send({
                message:"Validation Error"
            }
            )
        }

        const existingUser =  await userModel.findOne({
            email: email
        })

        if(existingUser){
            res.status(411).send({
                message: "User already Exist"
            })
        }
        
        const newUser = new userModel({
            username: username,
            email: email,
            password: password
        })

        await newUser.save();

        
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error"
        })
    }


}
import { Request, Response } from "express";
import userModel from "../model/user.model";
import { userValidation } from "../validator/user.Validator";


async function signup(req: Request, res: Response){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const isValid = userValidation.safeParse({username,email,password})
        if(!isValid.success){
            res.status(411).json({
                message:"Validation Error"
            }
            )
            return;
        }

        const existingUser =  await userModel.findOne({
            email: email
        })

        if(existingUser){
            res.status(411).json({
                message: "User already Exist"
            })
            return;
        }
        
        const newUser = new userModel({
            username: username,
            email: email,
            password: password
        })

        await newUser.save();

        res.status(200).json({
            message: "User Registered Successfully",
        });
        
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({
            message:"Internal server Error"
        })
        return
    }
}

async function signin(req: Request, res: Response){
    const email = req.body.email;
    const password = req.body.password;
    const signInValidation = userValidation.omit({ username: true });


    try {
        const isValid = signInValidation.safeParse({email,password})
        console.log("Validation Result:", isValid);
        if(!isValid.success){
            res.status(411).json({
                message:"Validation Error"
            }
            )
            return;
        }
        
        const existEmail = await userModel.findOne({
            email: email
        })

        if(!existEmail){
            res.status(404).json({
                message:" Email Not Found"
            })
            return 
        }

        const existPassword = await userModel.findOne({
            password: password
        })

        if(!existPassword){
            res.status(404).json({
                message:"Incorrect Password"
            })
            return 
        }


        res.status(200).json({
            message: "User loggedIn successfully..."
        })

    } 
    catch (error) {
        console.error("error during login", error);
        res.status(500).json({
          message: "Internal Server Error",
        });
    }
}

export default {
    signup, signin
}
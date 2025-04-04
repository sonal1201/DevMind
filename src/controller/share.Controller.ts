import { Request, Response } from "express";
import contentModel from "../model/content.Model";
import shareLinkModel from "../model/link.Model";
import userModel from "../model/user.model";
import { linkGenerate } from "../utils/linkGenerator";

export interface AuthenticatedRequest extends Request {
    userId?: string; 
}


async function createShare(req: AuthenticatedRequest, res: Response) : Promise<void>{
    const share = req.body.share;
    if (share) {
            const existingLink = await shareLinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.token
                })
                return;
            }
            const hash = linkGenerate(10);
            await shareLinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await shareLinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
}

async function getContentFromLink( req: Request, res: Response){
    const hash = req.params.sharLink;

    try {
        const link = await shareLinkModel.findOne({
            hash
        })
    
        if(!link){
            res.status(411).json({
                message: "Sorry Incorrect link"
            })
            return;
        }
    
        const content = await contentModel.find({
            userId: link.userId
        })

        if(!content){
            res.status(404).json({
                message: "Content Not Found",
              });
              return;
        }

        const user = await userModel.findOne({
            _id : link.userId
        })

        res.status(200).json({
            message: "Content Retrieved Successfully",
            username: user?.username,
            content: content
        })


    } catch (error) {
        console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    }

    
}

export default {
    createShare, getContentFromLink
} 
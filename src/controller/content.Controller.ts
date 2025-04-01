import { Request, Response } from "express"
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import contentModel from "../model/content.Model";
import tagModel from "../model/tag.Model";
import { contentValidator } from "../validator/content.Validator";


async function createContent(req: Request , res: Response){
    const {title, content, tags, type, userId, link} = req.body;

    try {
        const isValid = contentValidator.safeParse({
            title, 
            content, 
            tags, 
            type, 
            userId, 
            link
        })

        if(!isValid){
            res.status(411).json({
                messgage:"Validation Error"
            })
            return
        }

        if (!Array.isArray(tags)) {
            res.status(400).json({
              message: "tags must be an array",
            });
            return;
        }

        const tagtitle = await Promise.all(
            tags.map(async (tagTitle: string) => {
              let tag = await tagModel.findOne({ title: tagTitle });
      
              if (!tag) {
                tag = await tagModel.create({ title: tagTitle });
              }
      
              return tag.title;
            })
          );

        
        const newContent = await contentModel.create({
            title,
            content,
            tag: tagtitle,
            type,
            userId,
            link
        })

        await newContent.save();

        res.status(200).json({
            message: "Content Saved sucessfully",
            content: newContent,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }


}

async function getContent(req: Request, res: Response){
    const { userId } = req.body;
    
    try {
        const existingUser = await contentModel.find({userId})

        if(!existingUser){
            res.status(404).json({
                message:"User Not Found"
            })
            return
        }

        const userContent = await contentModel.find({userId}).populate("userId", "username")

        res.status(200).json({
            message: "Content Retrieved Successfully",
            content: userContent
        })

    } catch (error) {
        console.log(error)
        res.status(404).json({
            message:"External server Error"
        })
    }

}

async function deleteContent(req: Request, res: Response){
    const { contentId } = req.body;

    const validContentId = await contentModel.findById(contentId)

    try {
        if(!validContentId){
            res.status(404).json({
                message:"Content Not Found!"
            })
            return
        }
    
        await contentModel.deleteOne({_id: contentId});
    
        res.status(200).json({
            message: "Content deleted Sucessfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "External server error"
        })
    }
}

async function updateCotent(req: Request, res: Response){
    const { title, content, tag, type, contentId, link} = req.body;

    try {
        const isContent = await contentModel.findById(contentId);

        if(!isContent){
            res.status(404).json({
                message: "Content Not Found"
            })
            return
        }

        const updateContent = await contentModel.findByIdAndUpdate(
            contentId,
            {   $set:{
                    type,
                    title,
                    tag,
                    link,
                    content
                },
            
            },
            {new:true}
        )

        res.status(200).json({
            message:"Content Updated Successfully",
            content: updateContent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "External Server Error"
        })
    }
}


export default{
    createContent,
    deleteContent,
    getContent,
    updateCotent
}

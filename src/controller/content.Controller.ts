import { Request, Response } from "express"
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
            res.status(411).send({
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

        res.status(200).send({
            message: "Content Saved sucessfully",
            content: newContent,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }


}

async function deleteContent(req: Request, res: Response){
    const { contentId } = req.body;

    const validContentId = await contentModel.findById(contentId)

    try {
        if(!validContentId){
            res.status(404).send({
                message:"Content Not Found!"
            })
            return
        }
    
        await contentModel.deleteOne({_id: contentId});
    
        res.status(200).send({
            message: "Content deleted Sucessfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "External server error"
        })
    }
}


export default{
    createContent,
    deleteContent
}

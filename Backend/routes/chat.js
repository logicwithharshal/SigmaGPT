import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponce from "../utils/openai.js";

const router = express.Router();

router.post("/test", async(req, res) => {
    try{
        const Thread = new Thread({
            threadId: "xyz",
            title: "Testing new Thread"
        })
        const responce = await thread.save();
        res.send(responce);
    }catch{
        console.log(arr);
        res.status(500).json({error:"failed to save in DB"});
    }
});

router.get("/thread", async (req, res) =>{
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
});

router.get("/thread/:threadId", async(req, res) => {
    const {threadId} = res.params;

    try{
        const thread = await Thread.findOne({threadId});

        if(thread){
            res.status(404).json({error: "Thread Not Found"});
        }
        res.json(thread.message);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
    }
});

router.delete("/thread/:threadId", async(req,res)=>{
    const {threadId} = req.params;

    try{
        const deleteThread = await Thread.findOneAndDelete({threadId});

        if(!deleteThread){
            res.status(404).json({error: "Thread Not Found"});
        }
        res.status(200).json({sucess: "Thread deleted Sucessfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to Delete Thread"});
    }
});

router.post("/chat", async(req, res)=>{
    const {threadId, message} = req.body;

    if(!threadId || !message){
        res.status(404).json({error: "Missing required fields"})
    }

    try{
        let thread = await Thread.findOne({threadId});

        if(!thread){
            thread = new Thread({
                threadId,
                title: message,
                message: [{roles: "user", content: message}]
            });
        }else{
            thread.messages.push({role: "user", content: message});
        }
        const  assistantReply = await getOpenAIAPIResponce(message);
        
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updateAt = new Date();

        await thread.save();
        res.json({reply: assistantReply});

    }catch(err){
        console.log(err);
        res.status(500).json({errot: "Something went Wrong"});
    }
});

export default router;
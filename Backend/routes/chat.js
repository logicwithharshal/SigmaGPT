import express from "express";
import Thread from "../models/Thread.js";

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

export default router;
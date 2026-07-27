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
})

export default router;
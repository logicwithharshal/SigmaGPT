import express from "express";
import "dotenv/config";
import cors from "cors";
import chatRoutes from "./routes/chat.js";

const app = express()
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})

app.post("/chat", async(req, res) => {
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [{
                role: "user",
                content: req.body.message
            }]
        })
    };

    try{
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
        const data = await response.json();
        res.send(data.choices[0].message.content);
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});










//My comment

// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import mongoose from "mongoose";

// const app = express()
// const PORT = 8080;

// app.use(express.json());
// app.use(cors());

// app.listen(PORT, () => {
//     console.log(`server is runnning on ${PORT}`);
//     connectDB();
// })

// const connectDB = async() => {
//     try{
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("URI:", process.env.MONGODB_URI);
//         console.log("Connnected with Database")
//     }catch(err){
//         console.log("Failed to connect with DB", err)
//     }
// }

// Apna college video comment start from here

// app.post("/test", async(req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
//         },
//         body: JSON.stringify({
//             "model": "llama-3.3-70b-versatile",
//             "messages": [{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     };

//     try{
//         const responce = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
//         const data  = await responce.json();
//         // console.log(data.choices[0].message.content);
//         res.send(data.choices[0].message.content);
//     }catch(err){
//         console.log(err);
//     }
// });


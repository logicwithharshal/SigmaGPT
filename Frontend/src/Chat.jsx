import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";


function Chat() {
    const {newChat, prevChats} = useContext(MyContext);
    const {latestReply, setLatesReply} = useState(null);

    useEffect(()=> {
        if(!prevChats?.length) return;

        const content = reply.split("");

        let idx = 0;
        const interval = setInterval(()=>{
            setLatesReply(content.slice(0, idx+1).join(""));

            idx++;
            if(idx>= content.length) clearInterval(nterval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply])

    return (
        <>
            {newChat && <h1>Start a New Chat!</h1>}
            <div className="chats">
                {
                    prevChats?.slice(0,-1).map((chat, idx) =>
                        <div className={chat.role==="user"?"userDiv":"gptDiv"} key={idx}>
                            {
                                chat.role === "user"?
                                <p className="userMessage">{chat.content}</p>:
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )
                }

                {
                    prevChats.length>0 && latestReply != null &&
                    <div className="gptDiv" key={"typing"} >
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                    </div>
                }

                {/* <div className="userDiv">
                    <p className="userMessage">User Message</p>
                </div>
                <div className="gptDiv">
                    <p className="gptMessage">GPT Generated Message</p>
                </div> */}
            </div>
        </>
    )
}

export default Chat;
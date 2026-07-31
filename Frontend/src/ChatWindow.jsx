import "./ChatWindow.css";
import Chat from "./Chat.jsx";

function ChatWindow(){
    return(
        <div className="chatWindow">
            <div className="navbar">
                <span>SigmaGPT <i class="fa-solid fa-arrow-down-long"></i></span>
                <div className="userIconDiv">
                    <span><i class="fa-solid fa-user"></i></span>
                </div>
            </div>

            <Chat></Chat>

            <div className="chatInput">
                <div className="userInput">
                    <input placeholder="Ask me anything?">
                    </input>
                    <div id="submit"><i class="fa-solid fa-arrow-up"></i></div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check imported info, see cookie Preference
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;
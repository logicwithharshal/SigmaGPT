import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";

function Sidebar(){

    const {allThreads, setAllThreads, currThreadId} = useContext(MyContext);

    const getAllThreads = async() => {
        try{
            const respoce = await fetch("http://localhost:8080/api/thread");
            const res = await respoce.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            console.log(filteredData);
            setAllThreads(filteredData);
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=> {
        getAllThreads();
    }, [])


    return(
        <section className="sidebar">
            {/* new chat button */}
            <button>
                <img src="" alt="gpt logo" className="logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* histort */}
            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx}>{thread.title}</li>
                    ))
                }
            </ul>

            {/* Sign */}
            <div className="sign">
                <p>By me &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;
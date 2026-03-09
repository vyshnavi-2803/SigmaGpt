import React, { useContext, useState, useEffect } from "react";
import "./Chatwindow.css"
import Chat from "./chat";
import { MyContext } from "./MyContext";
import {ScaleLoader} from "react-spinners"


function Chatwindow(){
    const {prompt, setPrompt, reply, setReply,currThreadId,prevChats,setPrevChats,setNewChat}=useContext(MyContext);
    const [loading,setLoading]=useState(false);
    const [isOpen, setIsOpen]=useState(true);
    const getReply=async()=>{
        setLoading(true);
        setNewChat(false);
        console.log("message",prompt,"threadId",currThreadId)
        const options ={
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                message:prompt,
                threadId:currThreadId || "default-thread"
            }),
        };
        try{
            const response =await fetch("http://localhost:8080/api/chat",options)
            console.log(response);
        
            const data = await response.json(); // 👈 parse JSON
            console.log("Server reply:", data);

    // update context state so Chat component can display it
            setReply(data.reply);
            }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to prevchats
   useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);

    const handleProfileClick=()=>{
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatwindow">
            <div className="navbar">
                <span>SigmaGpt<i className="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv" onClick ={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i className="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i className="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }
            <Chat></Chat>
            <ScaleLoader color="white" loading={loading}></ScaleLoader>
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                            value={prompt}
                            onChange={(e)=> setPrompt(e.target.value)}
                            onKeyDown={(e)=>e.key==='Enter' ? getReply(): ''}
                            >                            
                            </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <div className="info">
                    SigmaGpt can make mistakes. Check important info. see cookie preferences
                </div>

            </div>
        </div>
    );
}
export default Chatwindow;
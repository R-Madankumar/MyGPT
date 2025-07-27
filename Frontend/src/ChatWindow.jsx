import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext ,useState,useEffect } from "react";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
  const{prompt,setPrompt,reply,setReply,currentThreadId,setPrevChats} = useContext(MyContext);
  const [loading, setLoading] =useState(false);
  
  const getReply = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currentThreadId
      })
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat" , options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(prompt && reply){
      setPrevChats(prevChats => (
        [...prevChats,{
          role:"user",
          content:prompt
        },{
          role:"assistant",
          content:reply
        }]
      ))
    }
  },[reply]);

  return (
    <div className="chatwindow">
      <div className="navbar">
        <span>SigmaGPT <i className="fa-solid fa-chevron-down"></i></span>
        <div className="userIconDiv">
          <span className="userIcon"><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
      <Chat></Chat>
      {loading && (
        <div className="loader-container">
          <ScaleLoader 
            color="#fff"
            loading={true}
            height={35}
            width={4}
            radius={2}
            margin={2}
          />
        </div>
      )}
      <div className="chatInput">
            <div className="inputBox">
              <input placeholder="Ask anything" 
                  value={prompt} 
                  onChange={(e)=> setPrompt(e.target.value)} 
                  onKeyDown={(e)=> e.key === 'Enter' ? getReply():''}
                />
            </div>
            <div id="submit" onClick={getReply}>
                <i className="fa-solid fa-paper-plane"></i>
            </div>
      </div>
      <p className="info">
        SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
      </p>
    </div>
  );
}
export default ChatWindow;
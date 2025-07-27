import './App.css'
import Sidebar from "./Sidebar.jsx"
import ChatWindow from "./ChatWindow.jsx"
import {MyContext} from "./MyContext.jsx"
import { useState } from 'react'
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt , setPrompt] = useState("");
  const [reply , setReply] = useState(null);
  const [currentThreadId, setCurrThreadId]= useState(uuidv1());
  const [prevChats , setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);


  const providerValues = {
    prompt,setPrompt,
    reply,setReply,
    currentThreadId,setCurrThreadId,
    newChat,setNewChat,
    prevChats,setPrevChats,
  };

  return (
    <div className='main'>
      <MyContext.Provider value={providerValues}>
        <Sidebar/>
        <ChatWindow/>
      </MyContext.Provider>
    </div>
  )
}

export default App;

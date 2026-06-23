
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import React, { useState } from 'react';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [ticketForm,setTicketForm]=useState(false)
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [issue,setIssue]=useState("");
  
    const handleSend = async () => {
      if (!question.trim()) return;
  
      const currentQuestion = question;
  
      setQuestion("");
  
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: currentQuestion,
        },
      ]);
  
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question: currentQuestion,
            }),
          }
        );
  
        const data = await response.json();
  
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: data.answer,
          },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Failed to connect to server.",
          },
        ]);
      }
  
    
    };
    const handleTicketSubmit=async(e)=>{
      e.preventDefault();
      // console.log(name);
      // console.log(email);
      // console.log(issue);
  
     const response = await fetch(
      "http://127.0.0.1:8000/ticket",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          issue,
        }),
      }
    );
  
    const data = await response.json();
  
    alert(data.message);
    console.log(data.message);
    
      
  
    }
  return (
    <div className="w-full h-screen bg-[#020617] text-white flex flex-col overflow-hidden">

      
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-700">

        <div>
          <h1 className="text-2xl font-bold">
            AI Support Bot
          </h1>

          <p className="text-slate-400 text-sm">
            Ask me anything, I am here to help you !!
          </p>
        </div>

        <div className="flex items-center gap-2 border border-green-500 px-2 py-1 rounded-md">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>

          <span className="text-green-400 text-sm">
            Online
          </span>
        </div>

      </div>

      {/* Chat Area */}
      <div className="flex-1 m-3 bg-[#0F172A] rounded-2xl border border-slate-700 flex flex-col overflow-hidden">

        <div className="flex-1 overflow-y-auto p-4">

          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-slate-500">
              Start a conversation...
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
               {/* Bot Icon */}
               {msg.role === "bot" && (
                 <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center m-1">
                   🤖
                 </div>
               )}
              <div

                className={`px-4 py-3 rounded-2xl max-w-[60%] ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm " 
                    : "bg-slate-700 text-white rounded-bl-sm"
                }`}
                

              >
               
                {msg.text}
                
                {msg.role === "bot" &&
                 msg.text === "I don't have enough information." && (
                  <button className="bg-orange-500 mt-3 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300 hover:scale-105"
                    onClick={() => setTicketForm(true)}>
                    <i className="fa-solid fa-ticket mr-2"></i>
                    Create Ticket
                  </button>
                )}
                
               
              </div>
               {/* User Icon */}
               {msg.role === "user" && (
                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center m-1">
                   👤
                 </div>
               )}
            </div>
          ))}
           

           {/* Ticket form */}
           {ticketForm&&(
            <div className="ml-10 p-3 bg-[#243447] rounded-sm border border-slate-400 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]">
              <h2 className="font-bold">Create support Ticket</h2>
                  <form className="flex flex-col" onSubmit={handleTicketSubmit}>
                  <label className="text-sm mb-1">Name</label>
                  <input value={name} type="text" placeholder="Enter your name" className="bg=[#334155] border border-slate-400 pl-1 rounded-sm mb-1 outline-none"
                  onChange={(e)=>setName(e.target.value)} required/>
                  <label className="text-sm mb-1">Email</label>
                  <input value={email} type="email" placeholder="Enter valid email" className="border border-slate-400 pl-1 rounded-sm mb-1 outline-none"
                  onChange={(e)=>setEmail(e.target.value)} required/>
                  <label className="text-sm mb-1">Description</label>
                  <textarea value={issue} placeholder="Enter description" className="border border-slate-400 pl-1 rounded-sm mb-1 outline-none"
                  onChange={(e)=>setIssue(e.target.value)} required/>
                  <button className="bg-green-600 p-1.5 mt-1 w-fit rounded-sm" type="submit"> <i className="fa-solid fa-paper-plane text-sm pr-2"></i>Submit Ticket</button>
                  </form> 
                  </div>
                )}
                

        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-slate-700">

          <div className="bg-[#1E293B] rounded-xl border border-slate-600 flex items-center gap-2 p-3">

            <textarea
              className="flex-1 resize-none bg-transparent outline-none text-white"
              placeholder="Ask a question..."
              value={question}
              rows="1"
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 rounded-lg text-white"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>

          </div>

        </div>

      </div>

    </div>
   
  )
}

export default ChatPage
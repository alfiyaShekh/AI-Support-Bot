import { useState } from "react";

function App() {
  // const [answer, setAnswer] = useState("");
  const [messages,setMessages]=useState([]);
  const [question, setQuestion] = useState("");
  // const [sources,setSources] = useState([]);

  const handleSend = async () => {

     setMessages([
    ...messages,
    {
      role: "user",
      text: question,
    },
  ]);
    const response = await fetch(
      "http://127.0.0.1:8000/chat",

      {
        method: "POST",
        headers: { // used to tell backend that the data IU am sending is in Json format
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  //Converts JavaScript object into JSON string
          question: question,
        }),
      }
    );

  console.log(response);

    const data = await response.json();
    setMessages((prevMessages) => [
  ...prevMessages,
  {
    role: "bot",
    text: data.answer,
    sources: data.sources,
  },
]);
    console.log(data);
    

    setAnswer(data.answer);
    setSources(data.sources);
  };

  return (
    <div>
      <h1>AI Support Bot</h1>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question"
      />

      <button onClick={handleSend}>
        Send
      </button>

            {messages.map((msg, index) => (
  <div key={index}>

    <h4>
      {msg.role === "user" ? "👤 User" : "🤖 Bot"}
    </h4>

    <p>{msg.text}</p>

    {msg.role === "bot" && msg.sources && (
      <>
        <h5>Sources:</h5>

        <ul>
          {msg.sources.map((source, i) => (
            <li key={i}>{source}</li>
          ))}
        </ul>
      </>
    )}

    <hr />

  </div>
))}

      </div>
  );
}

export default App;
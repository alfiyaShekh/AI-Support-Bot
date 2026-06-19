import { useState } from "react";

function App() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [sources,setSources] = useState([]);

  const handleSend = async () => {
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

      <p>{answer}</p>

      <h3>Sources:</h3>

       <ul>
         {sources.map((source, index) => (
           <li key={index}>{source}</li>
         ))}
       </ul>
      </div>
  );
}

export default App;
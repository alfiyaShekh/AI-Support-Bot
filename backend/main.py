from fastapi import FastAPI #import fast api class
from fastapi.middleware.cors import CORSMiddleware #import cors and middleware for backend and fronthend communication
from pydantic import BaseModel
from rag_chatbot import get_answer
import os
import json

app = FastAPI() # create backend server

class ChatRequest(BaseModel): # creating a request model
    question: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # location where react is running
    allow_credentials=True,
    allow_methods=["*"], # allow methos with get ,post, delete,put
    allow_headers=["*"],
)

@app.get("/") # it is endpoint when someone visits run the below function
def home():
    return {"message": "Backend is running"}

 # when somone sends the post requset run the below function
@app.post("/chat")
def chat(request: ChatRequest):

    answer, sources = get_answer(
        request.question
    )

    return {
        "answer": answer,
        "sources": sources
    }

class Ticket(BaseModel):
    name:str
    email:str
    issue:str

@app.post("/ticket")
def create_ticket(ticket:Ticket):
    ticket_data={
        "name":ticket.name,
        "email": ticket.email,
        "issue": ticket.issue
    }
    file_name=ticket.json

    if os.path.exists(file_name):
        with open(file_name,"r+") as f:
            ticket=json.load(f)
            ticket.append(ticket_data)
            f.seek(0)   # move cursor to beginning
            json.dump(ticket, f, indent=4)
            f.truncate()   # remove old leftover data
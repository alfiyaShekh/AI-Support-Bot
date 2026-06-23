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



# category detection
def detect_category(issue):

    issue = issue.lower()

    if "payment" in issue:
        return "Payment"

    elif "login" in issue:
        return "Account"

    elif "delivery" in issue:
        return "Shipping"

    elif "bug" in issue:
        return "Technical"

    else:
        return "General"

# priority detection
def detect_priority(issue):

    issue = issue.lower()

    if any(word in issue for word in [
        "payment",
        "refund",
        "urgent",
        "critical",
        "error"
    ]):
        return "High"

    elif any(word in issue for word in [
        "login",
        "password",
        "account"
    ]):
        return "Medium"

    else:
        return "Low"

@app.post("/ticket")
def create_ticket(ticket:Ticket):
   
    category=detect_category(ticket.issue)
    priority=detect_priority(ticket.issue)
    ticket_data={
        "name":ticket.name,
        "email": ticket.email,
        "issue": ticket.issue,
        "category": category,
        "priority":priority
    }
   
    file_name="tickets.json"

    if os.path.exists(file_name):

        with open(file_name, "r+") as f:

            tickets = json.load(f)

            tickets.append(ticket_data)

            f.seek(0)

            json.dump(
                tickets,
                f,
                indent=4
            )

            f.truncate()

    else:

        with open(file_name, "w") as f:

            json.dump(
                [ticket_data],
                f,
                indent=4
            )

    return {
        "message": "Ticket created successfully"
    }


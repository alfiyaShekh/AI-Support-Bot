from fastapi import FastAPI #import fast api class
from fastapi.middleware.cors import CORSMiddleware #import cors and middleware for backend and fronthend communication
from pydantic import BaseModel

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

@app.post("/chat") # wehn somone sends the post requset run the below function
@app.post("/chat")
def chat(request: ChatRequest):

    return {
        "answer": request.question
    }
from sentence_transformers import SentenceTransformer
import faiss
import pickle

import google.generativeai as genai
from dotenv import load_dotenv
import os

# -----------------------------
# Load Gemini API Key
# -----------------------------
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

gemini_model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

# -----------------------------
# Load Embedding Model
# -----------------------------
embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# -----------------------------
# Load FAISS Index
# -----------------------------
index = faiss.read_index(
    "../faiss_index.bin"
)

# -----------------------------
# Load Documents
# -----------------------------
with open(
    "../document_store.pkl",
    "rb"
) as f:

    data = pickle.load(f)

documents = data["documents"]
file_names = data["file_names"]

# -----------------------------
# User Question
# -----------------------------
question = input("Ask a question: ")

# -----------------------------
# Convert Question to Embedding
# -----------------------------
query_embedding = embedding_model.encode(
    [question]
)

# -----------------------------
# Search Top 3 Documents
# -----------------------------
distances, indices = index.search(
    query_embedding,
    k=3
)

print("\nDistances:")
print(distances)

# -----------------------------
# Threshold Check
# -----------------------------
THRESHOLD = 2.0

if distances[0][0] > THRESHOLD:
    print("\nNo relevant information found.")
    exit()

# -----------------------------
# Build Context
# -----------------------------
context = ""
sources=[]

for idx in indices[0]:
    context += documents[idx]
    context += "\n\n"
    sources.append(file_names[index])

# -----------------------------
# Show Sources
# -----------------------------
print("\nRetrieved Sources:")

for idx in indices[0]:
    print(file_names[idx])

# -----------------------------
# Build Prompt
# -----------------------------
prompt = f"""
You are a professional customer support assistant.

Rules:
1. Use only the context provided.
2. Do not use outside knowledge.
3. If the answer is not available in the context,
   reply:
   "I don't have enough information."
4. Be concise and professional.

Context:
{context}

Question:
{question}

Answer:
"""

# -----------------------------
# Gemini Response
# -----------------------------
try:

    response = gemini_model.generate_content(
        prompt
    )

    print("\nAnswer:")
    print(response.text)
    print(sources)

except Exception as e:

    print("Something went wrong.")
    print(e)

def get_answer(question):
    return f"You asked: {question}", ["test.txt"]
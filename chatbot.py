import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")

with open("faqs.txt", "r") as file:
    faq_content = file.read()

question = input("Ask your question: ")

prompt = f"""
You are a professional customer support assistant.

Rules:
1. Answer only using the FAQ information provided.
2. Do not make up answers.
3. If the answer is not found in the FAQs, respond:
   "I don't have enough information to answer that."
4. Be polite and concise.

FAQs:
{faq_content}

Question:
{question}

Answer:
"""

try:
    response = model.generate_content(prompt)
    print("\nBot:")
    print(response.text)
except Exception as e:
    print("somthing went wrong")
    print(e)
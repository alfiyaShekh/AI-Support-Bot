from sentence_transformers import SentenceTransformer
import faiss
import pickle

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load FAISS index
index = faiss.read_index("faiss_index.bin")

# Load documents
with open("document_store.pkl", "rb") as f:
    data = pickle.load(f)

documents = data["documents"]
file_names = data["file_names"]

# User question
query = input("Ask a question: ")

# Convert question to embedding
query_embedding = model.encode([query])

# Search FAISS
distances, indices = index.search(query_embedding, k=1)

# Get best match
matched_doc = documents[indices[0][0]]
matched_file = file_names[indices[0][0]]

print("\nMost Relevant Document:")
print(matched_file)

print("\nContent:")
print(matched_doc)
from sentence_transformers import SentenceTransformer
import faiss
import os
import pickle

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

documents = []
file_names = []

folder_path = "documents"

# Read all documents
for file in os.listdir(folder_path):
    if file.endswith(".txt"):
        with open(
            os.path.join(folder_path, file),
            "r",
            encoding="utf-8"
        ) as f:

            text = f.read()

            documents.append(text)
            file_names.append(file)

# Convert documents to embeddings
embeddings = model.encode(documents)

# Create FAISS index
dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

# Add embeddings to FAISS
index.add(embeddings)

# Save FAISS index
faiss.write_index(
    index,
    "faiss_index.bin"
)

# Save document mapping
with open(
    "document_store.pkl",
    "wb"
) as f:

    pickle.dump(
        {
            "documents": documents,
            "file_names": file_names
        },
        f
    )

print("FAISS database created successfully!")
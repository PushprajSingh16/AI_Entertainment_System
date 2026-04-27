"""
RAG (Retrieval-Augmented Generation) Pipeline

What is RAG?
-----------
RAG combines retrieval and generation:
1. RETRIEVAL: Find relevant documents from a knowledge base using semantic search
2. AUGMENTATION: Combine retrieved documents with the user query
3. GENERATION: Pass augmented prompt to LLM for better, informed responses

How it works:
1. Documents are converted to embeddings (vectors) using sentence-transformers
2. Embeddings are stored in FAISS (Facebook AI Similarity Search) - a fast vector database
3. When user asks a question, we convert their query to an embedding
4. We search FAISS for the K most similar documents (semantic search)
5. These documents become "context" for the LLM
6. The LLM generates a response using both the context and the query

Benefits:
- More accurate responses (LLM uses real knowledge)
- Reduced hallucinations (grounded in actual documents)
- Fast retrieval (FAISS is optimized for similarity search)
- No internet required (documents stored locally)
"""

import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from typing import List, Tuple
import os
import pickle

class RAGPipeline:
    """
    RAG Pipeline for retrieving relevant documents and augmenting LLM responses
    """
    
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        """
        Initialize RAG Pipeline
        
        Args:
            model_name: Sentence transformer model to use for embeddings
                       'all-MiniLM-L6-v2' is small, fast, and accurate
        """
        print("[RAG] Initializing RAG Pipeline...")
        
        # Initialize embedding model
        self.model = SentenceTransformer(model_name)
        print(f"[RAG] ✓ Loaded embedding model: {model_name}")
        
        # FAISS index (will be created after loading documents)
        self.index = None
        self.documents = []
        self.embeddings = None
        
        # Load sample documents
        self._load_sample_documents()
        self._create_index()
        
        print("[RAG] ✓ RAG Pipeline ready!")
    
    def _load_sample_documents(self):
        """
        Load sample entertainment documents
        These are the documents that will be searched and used as context
        """
        self.documents = [
            # Movie Recommendations
            "The Shawshank Redemption is a masterpiece about hope and friendship. Tim Robbins and Morgan Freeman deliver outstanding performances in this prison drama that explores themes of redemption and perseverance.",
            "Inception is a mind-bending sci-fi thriller starring Leonardo DiCaprio. It features complex dream sequences, stunning visual effects, and explores the nature of reality and dreams.",
            "The Dark Knight is a superhero film that transcends the genre. Christian Bale's Batman and Heath Ledger's Joker create an iconic rivalry in this gripping crime thriller.",
            "Pulp Fiction is a non-linear crime film with outstanding dialogue and memorable characters. Quentin Tarantino's directorial masterpiece features an ensemble cast and interconnected storylines.",
            "Interstellar explores space, time, and human connection. Christopher Nolan directs this epic sci-fi drama about saving humanity through dimensional travel and love.",
            
            # Entertainment Guides
            "For entertainment planning, consider the mood you want. Action movies provide excitement, dramas offer emotional depth, and comedies bring laughter. Mix different genres for variety.",
            "Creative entertainment ideas include: movie marathons with themed snacks, game nights with friends, outdoor adventures, reading discussion groups, and DIY craft projects.",
            "Streaming platforms offer diverse content. Netflix has dramas and documentaries, Disney+ features family content, HBO Max offers premium shows, and Amazon Prime has indie films.",
            "Live entertainment options include concerts, theater productions, comedy shows, sports events, and festivals. These offer social connection and immersive experiences.",
            "Virtual entertainment has grown with online gaming, streaming concerts, webinars, and social media content. It provides accessibility and convenience.",
            
            # Script Templates
            "A three-act script structure: Act 1 (Setup) introduces characters and conflict, Act 2 (Confrontation) escalates tension and develops characters, Act 3 (Resolution) resolves the conflict and concludes the story.",
            "Dialogue writing tips: Make each character's voice distinct, use subtext to add depth, avoid exposition dumps, and ensure dialogue moves the plot forward.",
            "Screenplay formatting: Use proper margins (1 inch), 12pt Courier font, include scene headings (INT./EXT., LOCATION, TIME), action lines, character names, parentheticals, and dialogue.",
            "Character development: Create compelling backstories, define clear motivations, show character growth through the story, and make character choices believable and consequential.",
            "Scene structure: Every scene needs purpose, clear conflict or revelation, emotional beats, and should advance the plot. Avoid static or pointless scenes.",
            
            # Entertainment Categories
            "Comedy entertains through humor. Types include situational comedy, dark comedy, slapstick, and witty banter. Comedy breaks tension and brings joy.",
            "Horror and thriller genres create suspense and fear. They explore human psychology and danger. Effective horror uses atmosphere, tension, and unexpected scares.",
            "Fantasy and sci-fi expand imagination. Fantasy creates magical worlds, sci-fi explores future technology and possibilities. Both offer escapism and wonder.",
            "Documentary entertainment educates while entertaining. True stories, historical events, and real-life drama engage audiences through authenticity.",
            "Animation offers creative freedom in storytelling. Animated films can target any age group and explore themes impossible in live-action.",
        ]
        
        print(f"[RAG] ✓ Loaded {len(self.documents)} sample documents")
    
    def _create_index(self):
        """
        Convert documents to embeddings and create FAISS index
        
        Process:
        1. Convert each document to an embedding (vector)
        2. Stack all embeddings into a matrix
        3. Create FAISS index for fast similarity search
        """
        print("[RAG] Creating embeddings for documents...")
        
        # Convert documents to embeddings
        # Each embedding is a 384-dimensional vector (for all-MiniLM-L6-v2)
        self.embeddings = self.model.encode(self.documents, convert_to_numpy=True)
        
        print(f"[RAG] ✓ Created {len(self.embeddings)} embeddings")
        print(f"[RAG] Embedding dimension: {self.embeddings.shape[1]}")
        
        # Create FAISS index
        # IndexFlatL2 uses L2 distance (Euclidean) for similarity
        # For each query, it finds the documents with smallest L2 distance
        dimension = self.embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dimension)
        
        # Add embeddings to index
        # FAISS requires float32 dtype
        self.index.add(self.embeddings.astype('float32'))
        
        print(f"[RAG] ✓ FAISS index created with {self.index.ntotal} documents")
    
    def retrieve(self, query: str, k: int = 3) -> List[Tuple[str, float]]:
        """
        Retrieve top-k relevant documents for a query using semantic search
        
        Args:
            query: User's question or search term
            k: Number of documents to retrieve (default: 3)
            
        Returns:
            List of (document, similarity_score) tuples
            Lower score = higher similarity (L2 distance)
        """
        # Convert query to embedding
        query_embedding = self.model.encode([query], convert_to_numpy=True)
        
        # Search FAISS index
        # Returns distances and indices
        distances, indices = self.index.search(query_embedding.astype('float32'), k)
        
        # Package results
        results = []
        for idx, distance in zip(indices[0], distances[0]):
            if idx >= 0:  # Valid index
                document = self.documents[idx]
                # Convert distance to similarity score (inverse)
                # Lower distance = higher similarity
                similarity = 1 / (1 + distance)  # Normalize to 0-1 range
                results.append((document, similarity))
        
        return results
    
    def get_context(self, query: str, k: int = 3) -> str:
        """
        Get formatted context string for LLM augmentation
        
        Args:
            query: User's query
            k: Number of documents to retrieve
            
        Returns:
            Formatted context string to prepend to LLM prompt
        """
        results = self.retrieve(query, k)
        
        if not results:
            return ""
        
        # Format context
        context_lines = ["## Relevant Knowledge Base:\n"]
        
        for i, (doc, score) in enumerate(results, 1):
            context_lines.append(f"[Document {i}] {doc}")
            context_lines.append("")
        
        context = "\n".join(context_lines)
        return context
    
    def augment_prompt(self, user_query: str, k: int = 3) -> str:
        """
        Create an augmented prompt combining context + user query
        
        Args:
            user_query: Original user question
            k: Number of context documents
            
        Returns:
            Augmented prompt for the LLM
        """
        context = self.get_context(user_query, k)
        
        if context:
            augmented = f"""{context}

Based on the knowledge above, please answer this question:
{user_query}"""
        else:
            augmented = user_query
        
        return augmented


# Global RAG instance (created once on startup)
_rag_pipeline = None

def get_rag_pipeline() -> RAGPipeline:
    """
    Get or create the global RAG pipeline instance
    
    Returns:
        RAGPipeline instance
    """
    global _rag_pipeline
    
    if _rag_pipeline is None:
        print("[RAG] Creating global RAG pipeline instance...")
        _rag_pipeline = RAGPipeline()
    
    return _rag_pipeline


def retrieve_context(query: str, k: int = 3) -> str:
    """
    Convenience function to retrieve context for a query
    
    Args:
        query: User's question
        k: Number of documents to retrieve
        
    Returns:
        Context string
    """
    rag = get_rag_pipeline()
    return rag.get_context(query, k)


def augment_query(query: str, k: int = 3) -> str:
    """
    Convenience function to augment a query with context
    
    Args:
        query: User's question
        k: Number of context documents
        
    Returns:
        Augmented prompt
    """
    rag = get_rag_pipeline()
    return rag.augment_prompt(query, k)

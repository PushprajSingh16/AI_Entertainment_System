"""
Simple RAG Module - No Heavy ML Dependencies
Uses basic text similarity and token matching
No sentence-transformers, transformers, or other heavy packages needed
"""

from typing import List


# Simple knowledge base for demo
KNOWLEDGE_BASE = [
    "Entertainment includes movies, TV shows, games, music, and live performances.",
    "Movies can be watched on streaming services like Netflix, Amazon Prime, and Disney+.",
    "Music genres include rock, pop, jazz, classical, electronic, and hip-hop.",
    "Video games range from casual mobile games to complex AAA titles.",
    "Live entertainment includes concerts, theater, comedy shows, and sporting events.",
    "Social media platforms help discover entertainment content and recommendations.",
    "Podcasts are audio shows that cover various topics and entertainment.",
    "Streaming services provide on-demand access to movies and TV shows.",
]


def simple_tokenize(text: str) -> List[str]:
    """Simple word tokenizer"""
    return text.lower().split()


def jaccard_similarity(tokens1: List[str], tokens2: List[str]) -> float:
    """Calculate Jaccard similarity between two token lists"""
    set1, set2 = set(tokens1), set(tokens2)
    if not set1 or not set2:
        return 0.0
    intersection = len(set1 & set2)
    union = len(set1 | set2)
    return intersection / union if union > 0 else 0.0


def augment_query(user_query: str, k: int = 3) -> str:
    """
    Simple RAG: augment query with relevant knowledge base passages
    Uses Jaccard similarity for matching (no ML model needed)
    
    Args:
        user_query: User's question/message
        k: Number of relevant documents to retrieve
    
    Returns:
        Augmented prompt with relevant context
    """
    try:
        # Tokenize user query
        query_tokens = simple_tokenize(user_query)
        
        # Calculate similarity with each KB entry
        similarities = []
        for i, doc in enumerate(KNOWLEDGE_BASE):
            doc_tokens = simple_tokenize(doc)
            sim = jaccard_similarity(query_tokens, doc_tokens)
            similarities.append((sim, i))
        
        # Get top k most similar documents
        similarities.sort(reverse=True)
        top_indices = [idx for _, idx in similarities[:k] if similarities[similarities.index((_, idx))][0] > 0]
        
        if not top_indices:
            # If no similar docs found, use first k
            top_indices = list(range(min(k, len(KNOWLEDGE_BASE))))
        
        # Build augmented prompt
        relevant_docs = [KNOWLEDGE_BASE[i] for i in top_indices[:k]]
        context = "\n".join([f"• {doc}" for doc in relevant_docs])
        
        augmented_prompt = f"""You are an entertainment AI assistant.

Consider this context while answering:
{context}

User query: {user_query}"""
        
        print(f"[RAG] ✓ Retrieved {len(relevant_docs)} relevant documents")
        return augmented_prompt
        
    except Exception as e:
        print(f"[RAG] Error: {e}")
        # Fallback to original query
        return user_query


def retrieve_documents(query: str, k: int = 3) -> List[str]:
    """
    Retrieve relevant documents from knowledge base
    
    Args:
        query: Search query
        k: Number of documents to return
    
    Returns:
        List of relevant documents
    """
    try:
        query_tokens = simple_tokenize(query)
        similarities = []
        
        for i, doc in enumerate(KNOWLEDGE_BASE):
            doc_tokens = simple_tokenize(doc)
            sim = jaccard_similarity(query_tokens, doc_tokens)
            similarities.append((sim, i))
        
        similarities.sort(reverse=True)
        top_indices = [idx for _, idx in similarities[:k]]
        
        return [KNOWLEDGE_BASE[i] for i in top_indices]
        
    except Exception as e:
        print(f"[RAG] Error retrieving documents: {e}")
        return KNOWLEDGE_BASE[:k]

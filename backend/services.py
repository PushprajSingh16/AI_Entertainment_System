import asyncio
import httpx
from config import GROQ_API_KEY, GROQ_MODEL
from genai.rag import augment_query

async def get_ai_response(user_input: str, use_rag: bool = True) -> str:
    """
    Get AI-generated response using Groq API with optional RAG augmentation
    
    RAG Pipeline:
    1. Retrieve relevant documents from knowledge base
    2. Augment user query with retrieved context
    3. Send augmented prompt to Groq LLM
    4. Return enhanced response
    
    Args:
        user_input: User's message
        use_rag: Whether to use RAG augmentation (default: True)
        
    Returns:
        str: AI-generated response
    """
    try:
        print(f"[GROQ] Processing message: {user_input}")
        
        # Step 1: Augment query with RAG context if enabled
        if use_rag:
            print("[RAG] Retrieving relevant context...")
            augmented_prompt = augment_query(user_input, k=3)
            prompt_to_send = augmented_prompt
            print("[RAG] ✓ Context retrieved and augmented")
        else:
            prompt_to_send = user_input
        
        # Step 2: Send to Groq LLM with augmented prompt
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": GROQ_MODEL,
                    "messages": [
                        {
                            "role": "user",
                            "content": prompt_to_send
                        }
                    ],
                    "max_tokens": 500,
                    "temperature": 0.7
                }
            )
            
            data = response.json()
            
            if response.status_code == 200:
                response_text = data["choices"][0]["message"]["content"]
                print(f"[GROQ] Response generated: {response_text[:100]}...")
                return response_text
            else:
                error_msg = data.get("error", {}).get("message", "Unknown error")
                print(f"[GROQ] API Error: {error_msg}")
                raise Exception(f"Groq API error: {error_msg}")
        
    except Exception as e:
        print(f"[GROQ] Error: {str(e)}")
        raise Exception(f"AI service error: {str(e)}")

async def generate_entertainment_plan(topic: str) -> str:
    """
    Generate entertainment plan using Groq API with RAG
    
    Args:
        topic: Entertainment topic
        
    Returns:
        str: Entertainment plan
    """
    try:
        print(f"[GROQ] Generating plan for topic: {topic}")
        
        # Augment with RAG context
        prompt = f"Create an entertainment plan about: {topic}. Be creative and detailed."
        augmented_prompt = augment_query(prompt, k=2)
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": GROQ_MODEL,
                    "messages": [
                        {
                            "role": "user",
                            "content": augmented_prompt
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.8
                }
            )
            
            data = response.json()
            
            if response.status_code == 200:
                plan_text = data["choices"][0]["message"]["content"]
                print(f"[GROQ] Plan generated: {plan_text[:100]}...")
                return plan_text
            else:
                error_msg = data.get("error", {}).get("message", "Unknown error")
                print(f"[GROQ] API Error: {error_msg}")
                raise Exception(f"Groq API error: {error_msg}")
        
    except Exception as e:
        print(f"[GROQ] Error: {str(e)}")
        raise Exception(f"Plan generation error: {str(e)}")


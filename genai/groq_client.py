"""
Groq API Client

Handles all Groq API interactions:
- Initialization
- API calls
- Response extraction
- Error handling
"""

import traceback
from groq import Groq

# ✅ Fixed import (clean and professional)
from backend.config import GROQ_API_KEY, GROQ_MODEL


def extract_message_content(output) -> str:
    """Extract text content from Groq API response."""
    if hasattr(output, 'choices') and output.choices:
        choice = output.choices[0]
        if hasattr(choice, 'message') and hasattr(choice.message, 'content'):
            return choice.message.content
        if hasattr(choice, 'text'):
            return choice.text
    return ''


class GroqClient:
    """Groq API Client wrapper."""
    
    def __init__(self, api_key: str = None, model: str = None):
        """Initialize Groq client with API key and model."""
        self.api_key = api_key or GROQ_API_KEY
        self.model = model or GROQ_MODEL
        
        if not self.api_key:
            raise ValueError(
                "GROQ_API_KEY is not configured. Please set it in .env or environment variables."
            )
        
        self.client = Groq(api_key=self.api_key)
    
    def call(self, messages: list, temperature: float = 0.7, max_tokens: int = 800) -> str:
        """
        Call Groq API and return response text.
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            temperature: Model temperature (0.0-2.0)
            max_tokens: Maximum tokens in response
            
        Returns:
            Response text from Groq API
            
        Raises:
            Exception: If API call fails
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            
            content = extract_message_content(response)
            if not content:
                raise ValueError("Received empty response from Groq.")
            
            return content
            
        except Exception as e:
            print(f"Groq API call failed: {e}")
            traceback.print_exc()
            raise
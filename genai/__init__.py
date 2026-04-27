"""
GenAI Module - Groq API Integration

Responsible for:
- Groq API client initialization
- Prompt template management
- Response extraction and formatting
"""

from .groq_client import GroqClient, extract_message_content
from .prompt_templates import PromptTemplates

__all__ = ["GroqClient", "PromptTemplates", "extract_message_content"]

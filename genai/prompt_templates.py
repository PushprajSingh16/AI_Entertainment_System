"""
Prompt Templates

Central location for all prompts used by GenAI and Agent modules.
"""


class PromptTemplates:
    """Collection of prompt templates."""
    
    @staticmethod
    def understanding_prompt(user_message: str) -> str:
        """Prompt to analyze and understand user intent."""
        return f"""
Please analyze the following user request and summarize the main intent, context, and any clarifying details:

User message: "{user_message}"

Provide a concise analysis.
"""
    
    @staticmethod
    def response_prompt(user_message: str, understanding: str) -> str:
        """Prompt to generate helpful response based on understanding."""
        return f"""
User input: {user_message}

Analysis: {understanding}

Please generate a helpful, friendly, and engaging response.
"""
    
    @staticmethod
    def system_understanding() -> str:
        """System prompt for intent extraction."""
        return "You are an assistant that extracts intent and context from the user's text."
    
    @staticmethod
    def system_response() -> str:
        """System prompt for response generation."""
        return "You are a helpful AI assistant for an entertainment system."

"""
Agentic AI Agent

Implements multi-step reasoning:
1. Understand user input
2. Plan response strategy
3. Generate response via GenAI
4. Format and return result
"""

import traceback
from genai import GroqClient, PromptTemplates
from .planner import Planner


class Agent:
    """Agentic AI Agent with multi-step reasoning."""
    
    def __init__(self):
        """Initialize agent with GenAI client and planner."""
        try:
            self.genai = GroqClient()
            self.planner = Planner()
        except ValueError as e:
            print(f"Agent initialization error: {e}")
            self.genai = None
            self.planner = None
    
    async def process(self, user_message: str) -> dict:
        """
        Process user message through multi-step reasoning.
        
        Steps:
        1. Validate input
        2. Understand intent
        3. Plan response
        4. Generate response
        5. Format result
        
        Args:
            user_message: User input message
            
        Returns:
            dict with success, response, model, and error fields
        """
        # Step 1: Validate input
        if not user_message or not user_message.strip():
            return {
                "success": False,
                "response": "Please provide a valid message.",
                "error": "empty_message"
            }
        
        # Step 2: Check GenAI availability
        if self.genai is None:
            return {
                "success": False,
                "response": "AI service is unavailable because the API key is missing.",
                "error": "missing_api_key"
            }
        
        try:
            # Step 3: Understand user intent
            understanding = await self._understand_input(user_message)
            
            # Step 4: Plan response strategy
            plan = await self._plan_response(user_message, understanding)
            
            # Step 5: Generate response via GenAI
            response = await self._generate_response(user_message, understanding, plan)
            
            # Step 6: Format and return
            return {
                "success": True,
                "response": response,
                "model": self.genai.model,
            }
            
        except Exception as e:
            print(f"Agent processing failed: {e}")
            traceback.print_exc()
            return {
                "success": False,
                "response": "Unable to generate an AI response at this time. Please try again later.",
                "error": str(e)
            }
    
    async def _understand_input(self, user_message: str) -> str:
        """
        Step 1: Understand and analyze user input.
        
        Returns:
            Analysis of user intent
        """
        try:
            prompt = PromptTemplates.understanding_prompt(user_message)
            messages = [
                {
                    "role": "system",
                    "content": PromptTemplates.system_understanding()
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
            
            understanding = self.genai.call(
                messages=messages,
                temperature=0.2,
                max_tokens=300
            )
            
            return understanding.strip() if understanding else "Unable to extract context from the message."
            
        except Exception as e:
            print(f"Understanding step failed: {e}")
            return "Unable to analyze user input."
    
    async def _plan_response(self, user_message: str, understanding: str) -> str:
        """
        Step 2: Plan response strategy based on understanding.
        
        Returns:
            Response plan
        """
        return await self.planner.plan(user_message, understanding)
    
    async def _generate_response(self, user_message: str, understanding: str, plan: str = None) -> str:
        """
        Step 3: Generate actual response via GenAI.
        
        Returns:
            Generated response text
        """
        try:
            prompt = PromptTemplates.response_prompt(user_message, understanding)
            messages = [
                {
                    "role": "system",
                    "content": PromptTemplates.system_response()
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
            
            response = self.genai.call(
                messages=messages,
                temperature=0.7,
                max_tokens=800
            )
            
            return response.strip() if response else "Unable to generate response."
            
        except Exception as e:
            print(f"Response generation failed: {e}")
            raise

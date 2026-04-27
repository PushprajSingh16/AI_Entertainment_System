# GenAI Module

**Responsible for:** Groq API integration and LLM interactions

## Structure

```
genai/
├── __init__.py           # Module exports
├── groq_client.py        # Groq API client wrapper
└── prompt_templates.py   # Prompt management
```

## Components

### groq_client.py
- `GroqClient`: Wrapper around Groq API
  - `__init__(api_key, model)`: Initialize with credentials
  - `call(messages, temperature, max_tokens)`: Call Groq LLM

- `extract_message_content(output)`: Helper to extract text from API response

### prompt_templates.py
- `PromptTemplates`: Static prompt templates
  - `understanding_prompt()`: Analyze user intent
  - `response_prompt()`: Generate response
  - `system_understanding()`: System prompt for intent extraction
  - `system_response()`: System prompt for response generation

## Usage

```python
from genai import GroqClient, PromptTemplates

client = GroqClient()
prompt = PromptTemplates.understanding_prompt("user message")
response = client.call(messages=[...])
```

## Environment

- `GROQ_API_KEY`: Groq API key
- `GROQ_MODEL`: Model name (default: `llama-3.1-8b-instant`)

## Error Handling

- Validates API key on initialization
- Raises `ValueError` if key is missing
- Logs and re-raises API call exceptions
- Returns empty string if extraction fails

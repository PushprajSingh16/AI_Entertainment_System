# Agent Module

**Responsible for:** Multi-step reasoning and agentic AI

## Architecture

```
agent/
├── __init__.py           # Module exports
├── agent.py              # Main agent with reasoning
└── planner.py            # Response planning
```

## Agent Flow

```
1. Validate Input
   ↓
2. Understand Intent (GenAI call)
   ↓
3. Plan Response (Planner)
   ↓
4. Generate Response (GenAI call)
   ↓
5. Format Result
```

## Components

### agent.py
- `Agent`: Orchestrates multi-step reasoning
  - `__init__()`: Initialize with GenAI client and Planner
  - `process(user_message)`: Main entry point
  - `_understand_input()`: Analyze user intent
  - `_plan_response()`: Plan response strategy
  - `_generate_response()`: Generate actual response

### planner.py
- `Planner`: Response strategy planning
  - `plan(user_message, understanding)`: Create response plan
  - `_detect_intent()`: Identify intent from understanding
  - `_select_strategy()`: Choose response strategy

## Usage

```python
from agent import Agent

agent = Agent()
result = await agent.process("user message")
# Returns: {
#   "success": True/False,
#   "response": "...",
#   "model": "...",
#   "error": "..." (if failed)
# }
```

## Multi-Step Reasoning

The agent implements chain-of-thought reasoning:
1. **Understanding**: Extract user intent and context
2. **Planning**: Decide on response strategy
3. **Generation**: Create response with GenAI
4. **Formatting**: Structure output for backend

## Error Handling

- Returns structured error responses
- Logs full exception traces
- Gracefully handles missing GenAI key
- Validates all inputs before processing

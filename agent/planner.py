async def create_plan(topic: str):
    # Yahan aap apna LLM logic (Groq/Gemini) daal sakte hain
    # Filhaal basic implementation:
    if "movie" in topic.lower():
        return "Suggested Plan: 1. Watch 'Inception' 2. Order Pizza 3. Discussion session."
    elif "game" in topic.lower():
        return "Suggested Plan: 1. Play 'Indian Bikes Driving 3D' 2. Complete 3 missions."
    else:
        return f"I have created a special plan for {topic}, including 3 activities and dinner."
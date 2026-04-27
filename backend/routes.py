from fastapi import APIRouter
from pydantic import BaseModel
from services import get_ai_response

router = APIRouter()

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class AgentRequest(BaseModel):
    message: str


@router.post("/signup")
async def signup(data: SignupRequest):
    return {
        "success": True,
        "user_id": 1,
        "name": data.name,
        "email": data.email,
        "token": "dummy_token"
    }


@router.post("/login")
async def login(data: LoginRequest):
    return {
        "success": True,
        "user_id": 1,
        "email": data.email,
        "token": "dummy_token"
    }


@router.post("/agent")
async def agent(data: AgentRequest):
    try:
        print(f"[AGENT] Received message: {data.message}")
        
        # Get AI response using Groq
        ai_response = await get_ai_response(data.message)
        
        print(f"[AGENT] Sending response to frontend")
        
        return {
            "success": True,
            "response": ai_response
        }
    except Exception as e:
        print(f"[AGENT] Error: {str(e)}")
        return {
            "success": False,
            "response": f"Error: {str(e)}"
        }


@router.get("/health")
async def health():
    return {"status": "ok"}
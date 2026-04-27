import os
from dotenv import load_dotenv

load_dotenv()

# ================= GROQ CONFIG =================
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("❌ GROQ_API_KEY not found in .env file")

# ✅ Stable & supported model
GROQ_MODEL = "llama-3.1-8b-instant"


# ================= SERVER CONFIG =================
HOST = "0.0.0.0"
PORT = 8001
DEBUG = True


# ================= CORS CONFIG =================
ALLOWED_ORIGINS = ["*"]


# ================= DATABASE (FUTURE) =================
DATABASE_URL = "sqlite:///./ai_entertainment.db"
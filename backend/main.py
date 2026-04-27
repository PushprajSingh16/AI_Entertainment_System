from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI(title="AI Entertainment System API")

# CORS Setup: Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes ko include karna (Prefix /api frontend se match hona chahiye)
app.include_router(router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "AI Entertainment Backend is running!"}

@app.get("/api/health")
async def health_root():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
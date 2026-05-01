from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI(title="AI Entertainment System API")

# CORS Setup: Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes include (with /api prefix)
app.include_router(router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "AI Entertainment Backend is running!"}


# ✅ Health endpoint
@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/health")
async def health_api():
    return {"status": "ok"}


# Local development run
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
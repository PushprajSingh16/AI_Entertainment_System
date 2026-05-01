#  AI Entertainment System

A production-ready **Agentic AI, GenAI & DevOps -integrated** full-stack application combining React, FastAPI, Groq LLM, FAISS Vector Database, and modern DevOps practice


##  Project Built With

- ** Agentic AI** - Multi-step reasoning agents for complex entertainment queries
- ** Generative AI (GenAI)** - Groq LLM (Llama 3.1) for intelligent responses
- ** RAG (Retrieval-Augmented Generation)** - FAISS vector database with semantic search
- ** DevOps Integrated** - Docker, Docker Compose, GitHub Actions CI/CD, containerized deployment

##  Features

- ** Secure Authentication** - User login/signup with session management
- ** AI Chat Interface** - Real-time chat with Groq AI (Llama 3.1-8b)
- ** Agentic AI Architecture** - Multi-step reasoning with agent-based problem solving
- ** RAG-Enhanced Responses** - Retrieved knowledge augmented generation for accurate, grounded answers
- ** Vector Database** - FAISS + Sentence-Transformers for semantic search
- ** Dashboard** - User activity tracking and analytics
- ** Modern UI** - Glassmorphism design with Framer Motion animations
- ** Docker & Docker Compose** - Production-ready containerization
- ** DevOps CI/CD Pipeline** - GitHub Actions automated testing, building, and deployment
- ** Responsive Design** - Works seamlessly across all devices
- ** Performance Optimized** - Fast inference with FAISS indexing

##  Project Structure

```
AI_Entertainment_System/
├── frontend/                 # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components (Login, Chat, Dashboard)
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main app with routing
│   ├── Dockerfile           # Frontend Docker image
│   └── package.json
├── backend/                  # FastAPI + Python (Running on port 8001)
│   ├── main.py              # FastAPI app initialization
│   ├── routes.py            # API endpoints
│   ├── services.py          # Business logic & Groq AI integration
│   ├── config.py            # Configuration management
│   ├── genai/               # Generative AI Module
│   │   ├── __init__.py
│   │   ├── rag.py           #  RAG Pipeline (FAISS + Embeddings)
│   │   └── groq_client.py   # Groq API client
│   ├── Dockerfile           # Backend Docker image
│   └── requirements.txt      # Python dependencies
├── agent/                    # Agentic AI Module
│   ├── agent.py             # Multi-step reasoning agent
│   ├── planner.py           # Task planning & orchestration
│   └── README.md
├── database/                # Database schemas & migrations
├── devops/                  # DevOps configurations
│   ├── docker-compose.yml
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # GitHub Actions CI/CD pipeline
├── TEST_RAG.py              #  RAG system verification script
├── RAG_IMPLEMENTATION.md    #  Detailed RAG documentation
<<<<<<< HEAD
├── RAG_QUICK_REFERENCE.md  #  RAG quick start guide
=======
├── RAG_QUICK_REFERENCE.md  # RAG quick start guide
>>>>>>> 65dddbd (Final update: Docker setup, RAG optional, project cleanup)
├── docker-compose.yml       # Orchestration for all services
└── README.md                # This file
```


## Quick Start


### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose (optional)
- Groq API Key ([Get one here](https://console.groq.com))

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a .env file
cp .env.example .env

# Add your Groq API key to .env
# GROQ_API_KEY=your_api_key_here

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend
python main.py
```

Backend will be available at `http://localhost:8000`


##  AI Architecture


### Agentic AI System
The project implements a multi-step reasoning agent architecture:
- **Agent Layer** (`agent/agent.py`) - Manages multi-step reasoning tasks
- **Planner** (`agent/planner.py`) - Orchestrates task execution and planning
- **Tool Integration** - Agents use RAG and LLM as tools for problem solving

### Generative AI (GenAI) Integration
- **LLM Provider**: Groq API (Llama 3.1-8b-instant)
- **Response Quality**: Fast (50-200ms), high-quality entertainment content generation
- **Context Awareness**: Uses RAG for informed, accurate responses

### RAG (Retrieval-Augmented Generation) Pipeline
**How it works:**
1. **Document Retrieval** - FAISS vector database searches for relevant documents
2. **Semantic Embeddings** - Uses sentence-transformers (all-MiniLM-L6-v2) for 384-dimensional vectors
3. **Context Augmentation** - Retrieved documents are combined with user queries
4. **Enhanced Generation** - LLM generates responses using both context and query

**Example Flow:**
```
User: "What are the best movies?"
  ↓
[RAG] Search FAISS → Find: "Shawshank Redemption", "Inception", "Dark Knight"
  ↓
[Augment] Combine: "Knowledge: [movies] ... Answer: best movies"
  ↓
[GenAI] Send to Groq LLM → Generate informed response
  ↓
Response: "Based on entertainment knowledge, I recommend..."
```

**Benefits:**
-  Grounded responses (no hallucinations)
-  Current knowledge (updated by adding documents)
-  Fast retrieval (<10ms)
-  Production-ready

### DevOps Integration
- **Containerization** - Docker images for frontend, backend, database
- **Orchestration** - Docker Compose for local development & testing
- **CI/CD** - GitHub Actions for automated testing, building, and deployment
- **Monitoring** - Logging and health checks integrated



```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file (optional)
echo VITE_API_URL=http://localhost:8000 > .env.local

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

### 3. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs


## Docker Deployment


### Using Docker Compose (Recommended)

```bash
# From the root directory
cd backend
cp .env.example .env
# Add your GROQ_API_KEY to backend/.env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:5432
- Redis: localhost:6379

### Individual Docker Images

**Backend:**
```bash
cd backend
docker build -t ai-entertainment-backend .
docker run -p 8000:8000 --env-file .env ai-entertainment-backend
```

**Frontend:**
```bash
cd frontend
docker build -t ai-entertainment-frontend .
docker run -p 3000:3000 ai-entertainment-frontend
```


## API Endpoints


### Authentication
- `POST /signup` - Register a new user
- `POST /login` - User login

### Chat
- `POST /agent` - Send message to AI agent

### Health
- `GET /health` - Health check endpoint

### Documentation
- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc documentation


## Environment Variables


### Backend (.env)

```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=False

# Database Configuration (for production)
DATABASE_URL=sqlite:///./ai_entertainment.db
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:8000
```


## Tech Stack


**Frontend:**
- React 19
- Vite
- Tailwind CSS 4
- Framer Motion
- React Router v7
- Lucide React Icons

**Backend:**
- FastAPI
- Uvicorn
- Groq Python SDK (LLM)
- Pydantic
- Python-dotenv

**Generative AI & ML:**
-  **Groq LLM** - llama-3.1-8b-instant for fast inference
-  **FAISS** - Facebook AI Similarity Search for vector indexing
-  **Sentence-Transformers** - all-MiniLM-L6-v2 for embeddings
-  **Agentic AI** - Multi-step reasoning agents
-  **RAG Pipeline** - Retrieval-Augmented Generation system

**DevOps & Deployment:**
- Docker & Docker Compose
- GitHub Actions CI/CD
- PostgreSQL (optional)
- Redis (optional)

## CI/CD Pipeline

The GitHub Actions pipeline includes:

1. **Frontend Checks**
   - ESLint validation
   - Build verification
   - Artifact upload

2. **Backend Checks**
   - Black formatter check
   - Flake8 linting
   - Unit tests with coverage
   - Coverage reporting

3. **Docker Builds**
   - Build and push to GitHub Container Registry
   - Automatic on main/develop branch push

4. **Security Scanning**
   - Trivy vulnerability scanning
   - SARIF report generation

## Testing

### Frontend
```bash
cd frontend
npm run lint       # Run ESLint
npm run build      # Build production bundle
```

### Backend
```bash
cd backend
source venv/bin/activate
pytest             # Run tests
black .            # Format code
flake8 .           # Lint code
```

###  RAG System Testing

The project includes comprehensive RAG (Retrieval-Augmented Generation) testing:

**Run RAG Verification:**
```bash
# Test RAG system without needing API key (demonstrates all components)
python TEST_RAG.py
```

**What it tests:**
-  NumPy and FAISS integration
-  Sentence-Transformers embedding model
-  Document embeddings creation
-  FAISS index construction
-  Semantic search accuracy
-  Query augmentation with context
-  Performance metrics

**Test API Endpoint with RAG:**
```bash
curl -X POST http://localhost:8001/api/agent \
  -H "Content-Type: application/json" \
  -d '{"message": "What are some good movie recommendations?"}'
```

**RAG Documentation:**
-  [RAG_IMPLEMENTATION.md](RAG_IMPLEMENTATION.md) - Complete technical documentation
-  [RAG_QUICK_REFERENCE.md](RAG_QUICK_REFERENCE.md) - Quick start guide

##  API Examples

### Signup
```bash
curl -X POST http://localhost:8001/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Chat with RAG-Enhanced AI
```bash
curl -X POST http://localhost:8001/api/agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Recommend some good entertainment options"
  }'
```

**Response includes RAG-retrieved context:**
```json
{
  "success": true,
  "response": "Based on entertainment knowledge from our database... [enhanced response using retrieved documents]"
}
```

### Send Message (RAG-Enhanced)
```bash
curl -X POST http://localhost:8001/api/agent \
  -H "Content-Type: application/json" \
  -d '{"message": "What are some good movies to watch?"}'
```

##  Advanced Features

### RAG (Retrieval-Augmented Generation) in Action

The system combines three layers for intelligent responses:

**Layer 1: Document Retrieval (FAISS)**
- Searches vector database for relevant documents
- Uses semantic similarity (not keyword matching)
- Returns top-3 most relevant documents

**Layer 2: Context Augmentation**
- Combines retrieved documents with user query
- Creates rich context for the LLM
- Ensures factual grounding

**Layer 3: Generative Response**
- LLM generates response using context
- Produces accurate, informative answers
- No hallucinations (grounded in knowledge base)

**Example: User asks "best movies"**
```
RAG Retrieval → [Shawshank Redemption, Inception, Dark Knight]
Augmentation  → "Context: [3 movies]... Answer: best movies"
GenAI Output  → "Based on knowledge: Shawshank is great for..."
```

### Customizing RAG Knowledge Base

**Add new documents:**
```python
# backend/genai/rag.py - in RAGPipeline._load_sample_documents()
self.documents = [
    # ... existing documents ...
    "Your new entertainment recommendation...",
    "Your new script guide...",
]

# Restart backend - FAISS index rebuilds automatically
```

**Adjust retrieval:**
```python
# backend/services.py - change k parameter
augmented_prompt = augment_query(user_input, k=5)  # Get 5 docs instead of 3
```

**Disable RAG (for comparison):**
```python
# backend/services.py
ai_response = await get_ai_response(data.message, use_rag=False)
```



### Code Quality

**Format code:**
```bash
# Backend
cd backend
black .

# Frontend
cd frontend
npm run lint -- --fix
```

##  Performance

- **Frontend Build**: ~2.24s
- **Backend Startup**: ~3-5s (includes RAG pipeline initialization)
- **RAG Retrieval**: <10ms (FAISS search)
- **Embedding Creation**: ~50ms (first run, cached after)
- **LLM Response**: <500ms (Groq API)
- **Total API Latency**: <600ms
- **Docker Build Time**: <3min

##  Troubleshooting

### Backend won't start
- Check if port 8001 is available
- Verify Python version (3.11+)
- Ensure GROQ_API_KEY is set in .env
- Check virtual environment is activated

### RAG System Issues
- First run downloads embedding model (~30MB) - be patient
- FAISS requires numpy compatibility - run: `pip install --upgrade numpy faiss-cpu`
- Documents not updating? Restart backend to rebuild index

### Frontend connection issues
- Verify backend is running on port 8001
- Check VITE_API_URL in .env.local (should be http://localhost:8001)
- Clear browser cache and reload
- Check browser console for CORS errors

### Docker issues
- Ensure Docker daemon is running
- Check disk space for images
- Remove old containers: `docker system prune`

##  Security

- Environment variables for sensitive data
- CORS enabled for frontend-backend communication
- Token-based authentication
- Password validation (minimum 6 characters)
- Input validation on all endpoints

##  License

MIT License - see LICENSE file for details

##  Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

##  Support

For issues and feature requests, please open an issue on GitHub.

##  Acknowledgments

- [Groq](https://groq.com/) for the AI API
- [FastAPI](https://fastapi.tiangolo.com/) framework
- [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

---


###  Project Classification

This is a **production-grade Agentic AI & GenAI-integrated project** featuring:

 **Agentic AI** - Multi-step reasoning agents for complex task orchestration  
 **Generative AI** - Groq LLM integration for intelligent content generation  
 **RAG System** - Retrieval-Augmented Generation for grounded, factual responses  
 **DevOps Integrated** - Complete containerization and CI/CD pipeline  
 **Enterprise-Ready** - Production deployment configurations included  

**Perfect for:**
- Learning Agentic AI architectures
- Understanding RAG implementation
- Building GenAI applications
- DevOps best practices
- Full-stack AI system development

##  Team Members

- Prabal Shukla (EN22CS301713)
- Pratik Koushal (EN22CS301747)
- Priyansh Chouhan (EN22CS301759)
- Pushpraj Singh Chouhan (EN22CS301774)
- Rajat Malviya (EN22CS301783)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import properties, inspections, auth, upload, disputes
from app.core.config import settings

app = FastAPI(
    title="Real Estate SaaS API",
    description="Backend API for Property Inspection Platform",
    version="1.0.0",
)

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Real Estate SaaS API is running", "docs": "/docs"}

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(properties.router, prefix="/properties", tags=["Properties"])
app.include_router(inspections.router, prefix="/inspections", tags=["Inspections"])
app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(disputes.router, prefix="/disputes", tags=["Disputes"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

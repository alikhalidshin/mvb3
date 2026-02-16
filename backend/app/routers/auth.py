from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(creds: LoginRequest):
    # Mock login logic matching frontend
    if creds.password == "password123":
        if creds.username == "owner":
            return {"access_token": "mock-token-owner", "token_type": "bearer", "role": "owner"}
        elif creds.username == "analyst":
            return {"access_token": "mock-token-analyst", "token_type": "bearer", "role": "analyst"}
        elif creds.username == "tenant":
            return {"access_token": "mock-token-tenant", "token_type": "bearer", "role": "tenant"}
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth
from app.core.firebase import db

security = HTTPBearer()

def get_current_user(res: HTTPAuthorizationCredentials = Depends(security)):
    token = res.credentials
    try:
        # Verify Firebase Token
        # decoded_token = auth.verify_id_token(token)
        # uid = decoded_token['uid']
        # return {"uid": uid, "role": "owner"} # Mock return for now
        
        # MOCK IMPLEMENTATION FOR DEMO (Since we don't have real tokens yet)
        if token == "mock-token-owner":
            return {"uid": "owner123", "role": "owner"}
        elif token == "mock-token-analyst":
            return {"uid": "analyst123", "role": "analyst"}
        elif token == "mock-token-tenant":
            return {"uid": "tenant123", "role": "tenant"}
        
        # Real implementation would be:
        # decoded_token = auth.verify_id_token(token)
        # return decoded_token
        
        # For now, allow any token as valid generic user if not specific mock
        return {"uid": "generic_user", "role": "user"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def require_role(role: str):
    def role_checker(user: dict = Depends(get_current_user)):
        if user.get("role") != role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted for role {user.get('role')}"
            )
        return user
    return role_checker

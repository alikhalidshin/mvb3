from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.models import Property, PropertyCreate
from app.core.security import get_current_user, require_role
from app.services.mock_db import mock_db

router = APIRouter()

@router.post("/", response_model=Property)
def create_property(prop: PropertyCreate, user: dict = Depends(require_role("owner"))):
    return mock_db.create_property(prop)

@router.get("/", response_model=List[Property])
def get_properties(user: dict = Depends(get_current_user)):
    # In real app, filter by user.uid if owner
    return mock_db.get_properties()

@router.get("/{id}", response_model=Property)
def get_property(id: str, user: dict = Depends(get_current_user)):
    prop = mock_db.get_property(id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return prop

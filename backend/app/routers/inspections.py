from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.models import Inspection, InspectionCreate, InspectionItem, InspectionItemCreate
from app.core.security import get_current_user
from app.services.mock_db import mock_db
import uuid

router = APIRouter()

@router.post("/", response_model=Inspection)
def create_inspection(insp: InspectionCreate, user: dict = Depends(get_current_user)):
    return mock_db.create_inspection(insp)

@router.get("/", response_model=List[Inspection])
def get_inspections(user: dict = Depends(get_current_user)):
    return mock_db.get_inspections()

@router.get("/{id}", response_model=Inspection)
def get_inspection(id: str, user: dict = Depends(get_current_user)):
    insp = mock_db.get_inspection(id)
    if not insp:
        raise HTTPException(status_code=404, detail="Inspection not found")
    return insp

@router.post("/{id}/items", response_model=InspectionItem)
def add_inspection_item(id: str, item: InspectionItemCreate, user: dict = Depends(get_current_user)):
    insp = mock_db.get_inspection(id)
    if not insp:
        raise HTTPException(status_code=404, detail="Inspection not found")
    
    new_item = {**item.dict(), "id": str(uuid.uuid4()), "inspection_id": id, "images": []}
    if "items" not in insp:
        insp["items"] = []
    insp["items"].append(new_item)
    return new_item

@router.post("/{id}/calculate-damage")
def calculate_damage(id: str, user: dict = Depends(get_current_user)):
    # Mock logic for damage calculation
    insp = mock_db.get_inspection(id)
    if not insp:
        raise HTTPException(status_code=404, detail="Inspection not found")
    
    total_damage = 150.00 # Mock result
    return {
        "inspection_id": id,
        "total_damage": total_damage,
        "details": "Calculated based on depreciation logic."
    }

@router.get("/{id}/report")
def generate_report(id: str, user: dict = Depends(get_current_user)):
    insp = mock_db.get_inspection(id)
    if not insp:
        raise HTTPException(status_code=404, detail="Inspection not found")
    
    return {
        "report_id": str(uuid.uuid4()),
        "generated_at": "2026-02-16T14:30:00",
        "inspection": insp,
        "pdf_url": "https://storage.firebase.com/reports/sample.pdf"
    }

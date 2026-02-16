from fastapi import APIRouter, Depends, HTTPException
from app.schemas.models import Dispute, DisputeCreate
from app.core.security import get_current_user
from app.services.mock_db import mock_db
import uuid

router = APIRouter()

@router.post("/", response_model=Dispute)
def create_dispute(dispute: DisputeCreate, user: dict = Depends(get_current_user)):
    new_dispute = {**dispute.dict(), "id": str(uuid.uuid4()), "status": "Open"}
    mock_db.disputes.append(new_dispute)
    return new_dispute

@router.get("/{id}", response_model=Dispute)
def get_dispute(id: str, user: dict = Depends(get_current_user)):
    res = next((d for d in mock_db.disputes if d["id"] == id), None)
    if not res:
        raise HTTPException(status_code=404, detail="Dispute not found")
    return res

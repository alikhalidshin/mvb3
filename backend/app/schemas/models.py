from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Literal
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    OWNER = "owner"
    ANALYST = "analyst"
    TENANT = "tenant"

# --- Property Models ---
class PropertyBase(BaseModel):
    owner_id: str
    tenant_id: Optional[str] = None
    address: str
    type: str
    area: float
    image_url: Optional[str] = None

class PropertyCreate(PropertyBase):
    pass

class Property(PropertyBase):
    id: str
    created_at: datetime

# --- Inspection Item Models ---
class InspectionItemBase(BaseModel):
    category: Literal["walls", "floors", "doors", "windows", "plumbing", "electrical", "appliances", "other"]
    condition_score: int # 1-5
    notes: Optional[str] = None
    estimated_value: Optional[float] = 0.0
    annual_depreciation: Optional[float] = 0.0

class InspectionItemCreate(InspectionItemBase):
    pass

class InspectionItem(InspectionItemBase):
    id: str
    inspection_id: str
    images: List[str] = []

# --- Inspection Models ---
class InspectionStatus(str, Enum):
    DRAFT = "Draft"
    SCHEDULED = "Scheduled"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    AWAITING_APPROVAL = "Awaiting Approval"
    APPROVED = "Approved"
    DISPUTED = "Disputed"
    CLOSED = "Closed"

class InspectionBase(BaseModel):
    property_id: str
    analyst_id: str
    type: str # Initial / Exit
    date: datetime
    status: InspectionStatus = InspectionStatus.DRAFT

class InspectionCreate(InspectionBase):
    pass

class Inspection(InspectionBase):
    id: str
    created_at: datetime
    items: List[InspectionItem] = []

# --- Dispute Models ---
class DisputeBase(BaseModel):
    inspection_id: str
    raised_by: str
    reason: str

class DisputeCreate(DisputeBase):
    pass

class Dispute(DisputeBase):
    id: str
    status: str = "Open"
    neutral_analyst_id: Optional[str] = None
    final_decision: Optional[str] = None

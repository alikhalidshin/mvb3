from datetime import datetime
import uuid

# In-memory mock DB for prototype
class MockDB:
    def __init__(self):
        self.properties = []
        self.inspections = []
        self.items = []
        self.disputes = []

    def create_property(self, data):
        new_prop = {**data.dict(), "id": str(uuid.uuid4()), "created_at": datetime.now()}
        self.properties.append(new_prop)
        return new_prop

    def get_properties(self):
        return self.properties

    def get_property(self, prop_id):
        return next((p for p in self.properties if p["id"] == prop_id), None)

    def create_inspection(self, data):
        new_insp = {**data.dict(), "id": str(uuid.uuid4()), "created_at": datetime.now(), "items": []}
        self.inspections.append(new_insp)
        return new_insp
    
    def get_inspections(self):
        return self.inspections

    def get_inspection(self, insp_id):
        return next((i for i in self.inspections if i["id"] == insp_id), None)

mock_db = MockDB()

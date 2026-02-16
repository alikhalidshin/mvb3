import firebase_admin
from firebase_admin import credentials, firestore, storage
from app.core.config import settings
import os

# Initialize Firebase
# NOTE: For demo purposes, we will mock this if credentials don't exist
# In production, ensure serviceAccountKey.json exists

try:
    if os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
        firebase_admin.initialize_app(cred, {
            'storageBucket': settings.FIREBASE_STORAGE_BUCKET
        })
        db = firestore.client()
        bucket = storage.bucket()
        print("Firebase initialized successfully.")
    else:
        print("WARNING: Firebase credentials not found. Using Mock DB.")
        db = None
        bucket = None
except Exception as e:
    print(f"Error initializing Firebase: {e}")
    db = None
    bucket = None

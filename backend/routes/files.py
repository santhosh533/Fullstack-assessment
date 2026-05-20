from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import get_db
from models import UploadedFile
import os, shutil

router = APIRouter()
UPLOAD_DIR = "/tmp/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"]

@router.post("/upload")
async def upload_files(
    user_name: str,
    user_id: int,
    file1: UploadFile = File(...),
    file2: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    results = []
    for file in [file1, file2]:
        if file.content_type not in ALLOWED_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"{file.filename} - Invalid file type. Only PDF, PNG, JPEG allowed"
            )
        new_filename = f"{user_name}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, new_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        record = UploadedFile(
            user_id=user_id,
            filename=new_filename,
            file_type=file.content_type
        )
        db.add(record)
        db.commit()
        results.append({"filename": new_filename, "status": "uploaded"})
    return {"uploaded": results}

@router.get("/download-sample")
def download_sample():
    sample_path = "/tmp/sample_file.txt"
    if not os.path.exists(sample_path):
        with open(sample_path, "w") as f:
            f.write("This is a sample download file.")
    return FileResponse(sample_path, filename="sample_file.txt")
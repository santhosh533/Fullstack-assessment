from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from database import get_db
from models import UploadedFile
import cloudinary
import cloudinary.uploader
import os

router = APIRouter()

# Cloudinary config
cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET")
)

ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"]

@router.post("/upload")
def upload_files(
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

        # Cloudinary la upload pannu
        file_bytes = file.file.read()
        public_id = f"{user_name}_{file.filename.split('.')[0]}"

        # PDF ah resource_type raw, image ah image
        resource_type = "raw" if file.content_type == "application/pdf" else "image"

        upload_result = cloudinary.uploader.upload(
            file_bytes,
            public_id=public_id,
            resource_type=resource_type
        )

        file_url = upload_result.get("secure_url")

        # DB la save pannu
        record = UploadedFile(
            user_id=user_id,
            filename=f"{user_name}_{file.filename}",
            file_type=file.content_type,
            file_url=file_url
        )
        db.add(record)
        db.commit()

        results.append({
            "filename": f"{user_name}_{file.filename}",
            "url": file_url,
            "status": "uploaded"
        })

    return {"uploaded": results}


@router.get("/download-sample")
def download_sample():
    # Cloudinary la hosted sample file URL
    sample_url = "https://res.cloudinary.com/demo/raw/upload/sample.pdf"
    return RedirectResponse(url=sample_url)
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    address = Column(Text, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    mobile = Column(String(15), nullable=False)
    password = Column(String(255), nullable=False)

class UploadedFile(Base):
    __tablename__ = "uploaded_files"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)
    file_url = Column(String(500), nullable=True)
    upload_timestamp = Column(DateTime, server_default=func.now())
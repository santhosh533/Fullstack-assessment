from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Production (Vercel) la environment variable use pannும்
# Local la Railway DB direct connect pannும்
DATABASE_URL = os.environ.get("DATABASE_URL", "mysql+pymysql://root:KdcBnvPyxGKcccRWUmSKnrhHFvvIVWcD@autorack.proxy.rlwy.net:59366/railway")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
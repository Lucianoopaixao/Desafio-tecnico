#importacoes necessarias
from sqlalchemy import  Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

#carregamento e endereçamentos
load_dotenv()

DATABASE_URL=os.getenv("DATABASE_URL", "sqlite:///./recursos.db")

engine = create_engine(os.getenv("DATABASE_URL"), connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

#base do desafio
class Recurso(Base):
    __tablename__ = "recursos"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    descricao = Column(String)
    tipo = Column(String) 
    url = Column(String)
    tags = Column(String) 

Base.metadata.create_all(bind=engine)
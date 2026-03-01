from pydantic import BaseModel
from typing import List

#resposta inteligente
class SmartAssistRequest(BaseModel):
    titulo: str
    tipo: str

#criando recurso banco
class RecursoCreate(BaseModel):
    titulo: str
    descricao: str
    tipo: str
    url: str
    tags: str

# esquema para enviar pela API pro front
class RecursoResponse(BaseModel):
    id: int
    titulo: str
    descricao: str
    tipo: str
    url: str
    tags: str

    class Config:
        from_attributes = True
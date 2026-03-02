#importacoes necessarias
import time
import json
import logging
import os
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import google.generativeai as genai
from dotenv import load_dotenv
import schemas
from database import SessionLocal, Recurso
from fastapi.middleware.cors import CORSMiddleware


load_dotenv() #carregamento

#configuracao genai
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI() #inicializacao

#evitar erros de autorizacao
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #qualquer origem
    allow_credentials=True,
    allow_methods=["*"], #qualquer metodo
    allow_headers=["*"], # qualquer cabecalho
)

#configurando logs estruturados
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SmartHub")

#inicializacao google ai
model= genai.GenerativeModel('gemini-2.5-flash')

# banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/health") # observabilidade
def health_check():
    return {"status": "ok"}

#recursos

@app.post("/recursos/", response_model=schemas.RecursoResponse)
def criar_recurso(recurso: schemas.RecursoCreate, db: Session = Depends(get_db)):
    db_recurso = Recurso(**recurso.model_dump())
    db.add(db_recurso)
    db.commit()
    db.refresh(db_recurso)
    return db_recurso

@app.get("/recursos/") # listagem com paginacao
def listar_recursos(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    recursos = db.query(Recurso).offset(skip).limit(limit).all()
    return recursos


#editar recursos

@app.put("/recursos/{recurso_id}", response_model=schemas.RecursoResponse)
def atualizar_recurso(recurso_id: int, recurso: schemas.RecursoCreate, db: Session = Depends(get_db)):
    db_recurso = db.query(Recurso).filter(Recurso.id == recurso_id).first()
    if not db_recurso:
        raise HTTPException(status_code=404, detail="Recurso não encontrado")
    
    for key, value in recurso.model_dump().items():
        setattr(db_recurso, key, value)
    
    db.commit()
    db.refresh(db_recurso)
    return db_recurso

#deletar recursos

@app.delete("/recursos/{recurso_id}")
def excluir_recurso(recurso_id: int, db: Session = Depends(get_db)):
    db_recurso = db.query(Recurso).filter(Recurso.id == recurso_id).first()
    if not db_recurso:
        raise HTTPException(status_code=404, detail="Recurso não encontrado")
    
    db.delete(db_recurso)
    db.commit()
    return {"message": "Recurso excluído com sucesso"}

#configuracao da SMARTAI

@app.post("/smart-assist")
async def smart_assist(request: schemas.SmartAssistRequest):
    start_time = time.time()
    
    #AI como assistente pedagogico
    prompt = f"""

    Atue como um Assistente Pedagógico.

    Com base no título "{request.titulo}" e no tipo de material "{request.tipo}",

    gere uma descrição curta e educativa (máximo 200 caracteres) e 3 tags relevantes.

    Responda APENAS em formato JSON estrito:

    {{"descricao": "string", "tags": ["tag1", "tag2", "tag3"]}}

    """
    
    try:
        #tentativa de chamar AI
        response = model.generate_content(prompt)
        
        #limpagem de resposta (contencao de erros)
        json_data = response.text.strip().replace('```json', '').replace('```', '')
        ai_data = json.loads(json_data)
        logger.info(f"[INFO] AI respondeu: Title='{request.titulo}', Latency={round(time.time() - start_time, 2)}s")
        return ai_data

    except Exception as e:
        # chave falha.
        logger.warning(f"[WARN] Ai falhou. Erro: {str(e)}")
        
        # delay pensamento AI
        time.sleep(1) 

        #mock caso falhe
        mock_data = {
            "descricao": f"Conteúdo explicativo sobre {request.titulo}. Material do tipo {request.tipo} estruturado a fim de facilitar o aprendizado.",
            "tags": ["Educação", request.tipo, "Aprendizado"]
        }
        
        latency = round(time.time() - start_time, 2)
        logger.info(f"[INFO] Requisição AI MOCK: Title='{request.titulo}', Latency={latency}s")
        
        return mock_data
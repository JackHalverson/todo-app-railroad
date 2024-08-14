from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session

import crud
from database import get_db
from models import Todo
from schemas import CreateTodoRequest


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # The origin of the frontend app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def get_todos(db: Session = Depends(get_db)) -> list[Todo]:
    return crud.get_todos(db)


@app.post("/")
async def create_todo(todo: CreateTodoRequest, db: Session = Depends(get_db)) -> Todo:
    return crud.create_todo(db=db, todo=todo)

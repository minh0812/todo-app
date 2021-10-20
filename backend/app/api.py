import json
import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models.Todo import TodoItem
import starlette.responses as _responses

app = FastAPI()

# chỉ các địa chỉ sau có thể truy cập api. Nếu muốn cho tất cả các host thì điền dấu *

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

todos = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
# lấy địa chỉ của file data
folder = Path(__file__).parent
my_path_file = os.path.join(folder, "todo.json")


# lấy data từ file json
def read_todo_data():
    with open(my_path_file, 'r') as the_file:
        data = the_file.read()

    return json.loads(data)


@app.get("/", tags=["root"])
async def root():
    return _responses.RedirectResponse("/redoc")


@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    data = read_todo_data()
    return {"data": data}


@app.get("/todo/{id}", tags=["todos"])
async def get_todo(id: str) -> dict:
    data = read_todo_data()
    for todo in data:
        if todo["id"] == id:
            return todo

    return {
        "data": f"Todo with id {id} not found."
    }


@app.post("/todo", tags=["todos"])
async def add_todo(todo: TodoItem) -> dict:
    data = read_todo_data()
    data.insert(0, {
        'id': todo.id,
        'title': todo.title,
        'status': todo.status
    })
    # save data
    with open(my_path_file, 'w') as the_file:
        json.dump(data, the_file, indent=4)
    return {
        "data": {"Todo added."}
    }


@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: str, body: TodoItem) -> dict:
    data = read_todo_data()
    for todo in data:
        if todo["id"] == id:
            todo["title"] = body.title
            todo["status"] = body.status

            with open(my_path_file, 'w') as the_file:
                json.dump(data, the_file, indent=4)

            return {
                "data": f"Todo with id {id} has been updated."
            }

    return {
        "data": f"Todo with id {id} not found."
    }


@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: str) -> dict:
    data = read_todo_data()
    for todo in data:
        if todo["id"] == id:
            data.remove(todo)

            with open(my_path_file, 'w') as the_file:
                json.dump(data, the_file, indent=4)

            return {
                "data": f"Todo with id {id} has been remove"
            }

    return {
        "data": f"Todo with id {id} not found."
    }

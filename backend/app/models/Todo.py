from pydantic import BaseModel


class TodoItem(BaseModel):
    id: str
    title: str
    status: str

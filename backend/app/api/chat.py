from fastapi import APIRouter
from pydantic import BaseModel
import os
import json

router = APIRouter()

BASE_PATH = "D:/llm_chats"  # You can update this path or make it configurable later

class SaveChatBody(BaseModel):
    project_name: str = ""
    project_id: str = ""
    chat_name: str
    messages: list

@router.post("/chat/save")
async def save_chat(body: SaveChatBody):
    if body.project_name and body.project_id:
        folder = os.path.join(BASE_PATH, f"{body.project_name}_{body.project_id}")
    else:
        folder = os.path.join(BASE_PATH, "global_chats")
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, f"{body.chat_name}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(body.messages, f, indent=2)
    return {"success": True}
from fastapi import UploadFile, File, Form
from fastapi.responses import JSONResponse

@router.post("/chat/import")
async def import_chat(
    file: UploadFile = File(...),
    project_name: str = Form(""),
    project_id: str = Form(""),
    chat_name: str = Form("")
):
    # Determine folder
    if project_name and project_id:
        folder = os.path.join(BASE_PATH, f"{project_name}_{project_id}")
    else:
        folder = os.path.join(BASE_PATH, "global_chats")
    os.makedirs(folder, exist_ok=True)
    
    # Use provided chat_name or filename without extension
    base_name = chat_name or os.path.splitext(file.filename)[0]
    path = os.path.join(folder, f"{base_name}.json")

    # Save uploaded file
    contents = await file.read()
    try:
        data = json.loads(contents.decode("utf-8"))
    except Exception:
        return JSONResponse(content={"success": False, "error": "Invalid JSON format"}, status_code=400)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    return {"success": True, "path": path}

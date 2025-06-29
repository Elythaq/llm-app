from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.models.text_generator import generate_text
from app.models.text_to_image import generate_image
from app.models.image_to_3d import image_to_3d
from app.models.text_to_3d import text_to_3d
from app.models.text_to_video import text_to_video
from app.models.code_generator import generate_code

from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router

app = FastAPI()

# --- CORS middleware for frontend-backend communication ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev. In prod: ["http://localhost:3000"] etc.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate-text")
async def api_generate_text(request: PromptRequest):
    return {"response": generate_text(request.prompt)}

@app.post("/generate-image")
async def api_generate_image(request: PromptRequest):
    img_path = generate_image(request.prompt)
    return FileResponse(img_path, media_type="image/png")

@app.post("/image-to-3d")
async def api_image_to_3d(file: UploadFile = File(...)):
    tmp = f"/tmp/{file.filename}"
    with open(tmp, "wb") as f:
        f.write(await file.read())
    obj_path = image_to_3d(tmp)
    return FileResponse(obj_path, media_type="model/obj")

@app.post("/text-to-3d")
async def api_text_to_3d(request: PromptRequest):
    obj_path = text_to_3d(request.prompt)
    return FileResponse(obj_path, media_type="model/obj")

@app.post("/text-to-video")
async def api_text_to_video(request: PromptRequest):
    video_path = text_to_video(request.prompt)
    return FileResponse(video_path, media_type="video/mp4")

@app.post("/generate-code")
async def api_generate_code(request: PromptRequest):
    return {"response": generate_code(request.prompt)}

# --- Mount chat save/import endpoints ---
app.include_router(chat_router)

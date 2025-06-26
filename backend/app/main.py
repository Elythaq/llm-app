# D:\development_tools\llm-app\backend\app\main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.models.text_generator import generate_text

app = FastAPI()

# Enable CORS for local development (allows frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate(prompt_request: PromptRequest):
    output = generate_text(prompt_request.prompt)
    return {"response": output}

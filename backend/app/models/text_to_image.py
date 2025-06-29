# models/text_to_image.py
from diffusers import StableDiffusionPipeline
import torch
import uuid

pipe = StableDiffusionPipeline.from_pretrained(
    "stabilityai/sdxl-turbo",
    torch_dtype=torch.float16,
    variant="fp16"
).to("cuda")

def generate_image(prompt: str) -> str:
    image = pipe(prompt).images[0]
    fname = f"/tmp/{uuid.uuid4().hex}.png"
    image.save(fname)
    return fname

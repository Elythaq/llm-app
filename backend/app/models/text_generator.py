# models/text_generator.py
from transformers import pipeline

generator = pipeline(
    "text-generation",
    model="Qwen/Qwen2-1.5B",
    torch_dtype="auto",
    device=0,
    max_new_tokens=512
)

def generate_text(prompt: str) -> str:
    result = generator(prompt, max_length=1024, num_return_sequences=1)
    return result[0]["generated_text"]

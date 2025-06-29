# models/code_generator.py
from transformers import pipeline

coder = pipeline(
    "text-generation",
    model="deepseek-ai/deepseek-coder-1.3b-base",
    torch_dtype="auto",
    device=0,
    max_new_tokens=512
)

def generate_code(prompt: str) -> str:
    result = coder(prompt, max_length=1024, num_return_sequences=1)
    return result[0]["generated_text"]

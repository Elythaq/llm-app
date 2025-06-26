# D:\development_tools\llm-app\backend\app\models\text_generator.py

from transformers import pipeline

# Loads once at startup, so generation is fast on each call.
generator = pipeline("text-generation", model="gpt2", device=0)

def generate_text(prompt: str) -> str:
    results = generator(prompt, max_length=200, num_return_sequences=1)
    return results[0]["generated_text"]

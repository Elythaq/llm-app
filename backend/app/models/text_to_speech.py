# models/text_to_speech.py
from TTS.api import TTS
import uuid

tts = TTS("tts_models/en/xtts_v2")

def text_to_speech(prompt: str) -> str:
    fname = f"/tmp/{uuid.uuid4().hex}.wav"
    tts.tts_to_file(text=prompt, file_path=fname)
    return fname

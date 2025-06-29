# models/text_to_audio.py
from audiocraft.models import MusicGen
import uuid
import torchaudio

model = MusicGen.get_pretrained('facebook/musicgen-small')

def text_to_audio(prompt: str) -> str:
    fname = f"/tmp/{uuid.uuid4().hex}.wav"
    wav = model.generate([prompt])
    torchaudio.save(fname, wav[0].cpu(), 32000)
    return fname

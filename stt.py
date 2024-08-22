import asyncio
import io

import aiofiles
import openai
from aiohttp import web
import aiohttp_cors
client = openai.AsyncClient(
    api_key="sk-96Q3xExGXtFPYtTA6cD80a7c59Ff495783C7E98e244300C9",
    base_url="https://api.rcouyi.com/v1"
)


async def run_stt(audio_data):
    audio_file = io.BytesIO(audio_data)
    audio_file.name = "audio.mp3"  # 设置文件名
    transcription = await client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        language="zh"
    )
    print(transcription.text)
    return transcription.text


async def upload_audio(request):
    reader = await request.multipart()
    field = await reader.next()
    audio_data = await field.read()

    text = await run_stt(audio_data)
    return web.json_response({'text': text})


app = web.Application()
app.router.add_post('/upload_audio', upload_audio)

# CORS configuration
cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
        allow_credentials=True,
        expose_headers="*",
        allow_headers="*"
    )
})
for route in list(app.router.routes()):
    cors.add(route)

if __name__ == '__main__':
    web.run_app(app)

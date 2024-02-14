from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from fastapi.responses import JSONResponse
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel

import json
import openai


class Settings(BaseSettings):
    openai_api_key: str
    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = openai.Client(api_key=settings.openai_api_key)
aclient = openai.AsyncClient(api_key=settings.openai_api_key)
system_prompt = """
The following is a conversation with an AI assistant. 
The assistant is helpful, creative, clever, and very friendly.\n\n
Human: Hello, who are you?\n
AI: I am an AI created by OpenAI. How can I help you today?
\nHuman: 
"""


class Prompt(BaseModel):
    message: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/prompt")
async def prompt_response(prompt: Prompt):
    openai_response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {
                "role": "system", 
                "content": system_prompt
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt.message},
                ],
            }
        ],
    )
    return {"response": openai_response.choices[0].message.content}


@app.post("/prompt/stream")
async def prompt_response_stream(prompt: Prompt):
    openai_response = await aclient.chat.completions.create(
        model="gpt-4-1106-preview",
        stream=True,
        messages=[
            {
                "role": "system", 
                "content": system_prompt
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt.message},
                ],
            }
        ],
    )
    
    async def generate():
        async for token in openai_response:
            content = token.choices[0].delta.content
            if content is not None:
                yield content

    return StreamingResponse(generate(), media_type="text/event-stream")


@app.get("/example-response")
async def get_example_response():
    with open("example-response.json") as f:
        data = json.load(f)
    return JSONResponse(status_code=200, content={"response": [data, data, data, data, data]})


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if file.filename.endswith(".pdf"):
        contents = await file.read()
        if len(contents) < 1e6:
            with open(f"{file.filename}", "wb") as f:
                f.write(contents)
            return JSONResponse(status_code=200, content={"response": "File has been uploaded successfully"})
        else:
            return JSONResponse(status_code=400, content={"message": "File size exceeds limit"})
    else:
        return JSONResponse(status_code=400, content={"message": "File is not a PDF"})
    
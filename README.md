# co:helm

![Demo](demo.gif)

Project made with:
- [<a href="https://github.com/shadcn/next-template">Shadcn - Next JS Template</a>](https://github.com/shadcn/next-template)
- [<a href="https://github.com/waseemhnyc/fastapi-openai-render">FastAPI template</a>](https://github.com/waseemhnyc/fastapi-openai-render)

## Installation 🛠️

1. Clone the repository
```bash
git clone https://github.com/waseemhnyc/cohelm.git
```
2. Navigate to the frontend directory
```bash
cd frontend
```
3. Install packages
```bash
pnpm install
```
4. Copy `.env.exmaple` 
```bash
cp .env.example .env.local
```
5. Run Next JS app
```bash
pnpm dev
```

Now that the frontend is working, it's time to get the backend up and running.

6. Move back one directory, create a virutalenv and source the environment

```bash
cd ..
python3 -m venv venv
source venv/bin/activate
```

7. Install libraries

```bash
pip install -r requirements.txt
```

8. NOT REQUIRED - Create a .env file and input your OpenAI API Key in the file

```bash
cp .env.example .env
```

9. Run local server
```bash
uvicorn main:app --host 0.0.0.0 --reload
```

## Usage 🎉

Web Interface
- Open your web browser and navigate to `http://localhost:3000/`

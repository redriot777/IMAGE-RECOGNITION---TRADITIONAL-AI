import os
import shutil
import uuid
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from ai_engine.classifier import run_traditional_ai_pipeline

app = FastAPI(title="Traditional AI Image Recognition")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return JSONResponse(status_code=400, content={"error": "Unsupported file format."})
    
    file_id = str(uuid.uuid4())
    ext = os.path.splitext(file.filename)[1]
    filename = f"{file_id}{ext}"
    filepath = os.path.join("uploads", filename)
    
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    try:
        result = run_traditional_ai_pipeline(filepath, file_id)
        result["filename"] = file.filename
        return result
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": "Analysis failed."})

@app.post("/analyze/batch")
async def analyze_batch(files: list[UploadFile] = File(...)):
    results = []
    for file in files:
        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            results.append({"filename": file.filename, "error": "Unsupported file format."})
            continue
        
        file_id = str(uuid.uuid4())
        ext = os.path.splitext(file.filename)[1]
        filename = f"{file_id}{ext}"
        filepath = os.path.join("uploads", filename)
        
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        try:
            res = run_traditional_ai_pipeline(filepath, file_id)
            res["filename"] = file.filename
            results.append(res)
        except Exception as e:
            results.append({"filename": file.filename, "error": "Analysis failed."})
            
    return results

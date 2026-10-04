# Traditional AI Image Recognition

This is a standalone web application demonstrating a Traditional AI / Symbolic AI approach to image recognition and scene classification.

## Concept: Traditional AI vs Machine Learning

Unlike modern deep learning models (like ResNet or YOLO) which learn patterns from vast datasets and operate as a "black box," this system uses **Traditional Artificial Intelligence (Symbolic AI)**. 

It works by:
1. Extracting explicit mathematical measurements (features) from an image.
2. Converting these measurements into qualitative, symbolic facts (e.g., `brightness_is_low`) using defined thresholds.
3. Passing these facts into a Working Memory.
4. Using an Inference Engine with deterministic IF-THEN rules to perform Forward Chaining.
5. Firing rules to generate new facts and ultimately derive a final, explainable classification.

## Features
- **Upload & Analyze**: Test with single images or batches.
- **Explainable Reasoning**: See exactly which rules fired, which failed, and why a classification was reached.
- **No Machine Learning**: 100% transparent and deterministic. No neural networks, no hidden embeddings, no dataset required.
- **Visual Preprocessing**: See the exact steps used to extract edge density, brightness, and contrast.
- **Multi-page Architecture**: Clean separation of Features, Knowledge Base, Rules, and Reasoning.

## Technology Stack
- **Backend**: Python, FastAPI, OpenCV, NumPy, Pillow, Uvicorn
- **Frontend**: React, Vite, React Router, Lucide React

## Setup & Installation (Windows)

### 1. Backend Setup

Open PowerShell or Command Prompt, and navigate to the `backend` directory:

```powershell
cd traditional-ai-image-recognition\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
The backend API will run on `http://localhost:8000`.

### 2. Frontend Setup

Open a new PowerShell or Command Prompt window, navigate to the `frontend` directory:

```powershell
cd traditional-ai-image-recognition\frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173` (or similar, check console output).

## Limitations
This system performs scene and visual-characteristic classification (e.g., "Night-like scene", "High-contrast scene") rather than specific object detection. It does not magically recognize arbitrary objects because it relies on manually engineered rules, not learned datasets.

## Viva Explanation
* **Why is this Traditional AI?** It uses explicitly defined rules, handcrafted features, and forward-chaining logic instead of learned model parameters.
* **What is Forward Chaining?** It is an inference strategy that starts with known facts and repeatedly applies rules to derive new facts until a goal is reached.
* **Is there any Machine Learning?** No. There are no probabilities, just deterministic rule support scoring.

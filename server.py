import os.path
import datetime
import pickle
import numpy as np
import os
import cv2
import face_recognition
from fastapi import FastAPI, File, UploadFile,Form
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_dir = './db'
log_path = './log.txt'

@app.post("/login")
async def login(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.fromstring(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    unknown_encoding = face_recognition.face_encodings(img)[0]
    
    for filename in os.listdir(db_dir):
        if filename.endswith(".jpg"):
            known_image = face_recognition.load_image_file(os.path.join(db_dir, filename))
            known_encoding = face_recognition.face_encodings(known_image)[0]
            
            results = face_recognition.compare_faces([known_encoding], unknown_encoding)
            
            if results[0]:
                name = os.path.splitext(filename)[0]
                with open(log_path, 'a') as f:
                    f.write(f'{name},{datetime.datetime.now()},in\n')
                return {"name": name}

    return {"name": "unknown_person"}

@app.post("/register")
async def register(file: UploadFile = File(...), name: str = Form(...)):
    contents = await file.read()
    nparr = np.fromstring(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    cv2.imwrite(os.path.join(db_dir, f'{name}.jpg'), img)
    return {"message": "User registered successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
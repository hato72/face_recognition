### face_recognition
```sh
face_recognition C:/Users/hatot/.vscode/face_recognition/examples/known_peoples C:/Users/hatot/.vscode/face_recognition/examples/unknown_peoples
```
### スタンドアロン型
python main.py

### webアプリ型
```sh
cd frontend
npm run dev
```

```sh
cd backend
python server.py
```

#### dlibのインストール
```sh
pip install -r requirements.txt
cd C:\
rmdir /s /q dlib
git clone https://github.com/davisking/dlib
cd C:\dlib
python setup.py build --no DLIB_GIF_SUPPORT
python setup.py install --no DLIB_GIF_SUPPORT
```

#### face_recognitionのインストール
```sh
pip install wheel
pip install face_recognition
```

<!-- https://github.com/computervisioneng/face-attendance-system/blob/master/main.py -->

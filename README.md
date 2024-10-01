### face_recognition
face_recognition C:/Users/hatot/.vscode/face_recognition/examples/known_peoples C:/Users/hatot/.vscode/face_recognition/examples/unknown_peoples

### 顔認証システム
python main.py


#### dlibのインストール
pip install cmake

cd C:\

rmdir /s /q dlib

git clone https://github.com/davisking/dlib

cd C:\dlib

python setup.py build --no DLIB_GIF_SUPPORT

python setup.py install --no DLIB_GIF_SUPPORT

#### face_recognitionのインストール
pip install wheel
pip install face_recognition


<!-- https://github.com/computervisioneng/face-attendance-system/blob/master/main.py -->
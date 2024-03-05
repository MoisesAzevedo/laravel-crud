powershell -WindowStyle Minimized -Command "Start-Process cmd -ArgumentList '/c %~f0' -WindowStyle Hidden"


cd back
start serve.bat
cd ..
cd front
npm start
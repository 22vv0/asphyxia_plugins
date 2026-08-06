@echo off
for /r "webui\asset\audio" %%a in (*.wma) do (
	echo Converting "%%~fa"
	ffmpeg -loglevel error -y -i "%%~fa" -vn -ar 44100 -ac 2 -b:a 192k "%%~dpa%%~na.mp3"
	del "%%~fa"
)
@echo on
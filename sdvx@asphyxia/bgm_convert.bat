@echo off
for /f %%a in ('dir "webui\asset\audio\" /b /s /a-d ^| findstr ".wma"') do (
	ffmpeg -i "%%~fa" -vn -ar 44100 -ac 2 -b:a 192k "%%~dpa%%~na.mp3"
	del %%~fa
)
@echo on
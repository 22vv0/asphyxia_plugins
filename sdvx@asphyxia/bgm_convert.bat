@echo off
for /f %%a in ('dir "webui\asset\audio\*.s3p" /s /b') do (
	echo "%%~fa"
	s3p_extract %%~fa
	ffmpeg -i "%%~fa.out\0.wma" -vn -ar 44100 -ac 2 -b:a 192k "%%~fa.out\..\0.mp3"
	ffmpeg -i "%%~fa.out\1.wma" -vn -ar 44100 -ac 2 -b:a 192k "%%~fa.out\..\1.mp3"
	rmdir /s /q "%%~fa.out"
	del %%~fa
)
@echo on
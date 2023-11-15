find . -type f -name "*.wma" -exec bash -c 'echo "Converting $1" && ffmpeg -loglevel error -y -i $1 -vn -ar 44100 -ac 2 -b:a 192k ${1%.wma}.mp3 && rm $1' bash {} \;

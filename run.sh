# /bin/bash

# This is a simple script to install dependencies, compile and execute the program.
# Author: http://jesuslugo2002.github.io/

jsFile=./dist/index.js

npm install > npm-install-log.txt
npx tsc

if [ -f "$jsFile" ]; then
    node "$jsFile"
else
    echo "ERROR: Executable file not found."
fi
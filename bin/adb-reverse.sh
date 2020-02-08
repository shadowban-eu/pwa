#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Please invoke this with two parameters REMOTE_PORT, LOCAL_PORT"
  echo "e.g. \`./adb-reverse 3000 8080\` will serve your local port 3000 as localhost:8080 on the device."
  exit 1;
fi

REMOTE_PORT=$1
LOCAL_PORT=$2

echo "Creating reverse connection localhost:$REMOTE_PORT:localhost:$LOCAL_PORT"
adb reverse tcp:$REMOTE_PORT tcp:$LOCAL_PORT
adb reverse --list

echo "Press any key to exit and close the reverse connection"
read
echo "Closing reverse connection localhost:$REMOTE_PORT:localhost:$LOCAL_PORT"
adb reverse --remove tcp:$REMOTE_PORT
adb reverse --list

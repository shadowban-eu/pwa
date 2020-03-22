#!/usr/bin/env bash

if [ $# -ne 2 ]; then
  echo "Using default ports:"
  echo "Remote: 3000"
  echo "Local: 3000"
  echo "Override with ./adb-reverse.sh REMOTE_PORT LOCAL_PORT"
  echo "Note: API mocks only work when using same ports for local and remote!"
  REMOTE_PORT=3000
  LOCAL_PORT=3000
else
  REMOTE_PORT=$1
  LOCAL_PORT=$2
fi

echo -e "\nCreating reverse connection localhost:$REMOTE_PORT:localhost:$LOCAL_PORT"
adb reverse tcp:$REMOTE_PORT tcp:$LOCAL_PORT
adb reverse --list

read -p "Press any key to exit and close the reverse connection"
echo "Closing reverse connection localhost:$REMOTE_PORT:localhost:$LOCAL_PORT"
adb reverse --remove tcp:$REMOTE_PORT
REVERSE_LIST=`adb reverse --list`
if [ "$REVERSE_LIST" ]; then
  echo $REVERSE_LIST
fi

#!/bin/bash

echo "Upgrading libs..."
npm install

echo "Start app"
#npm start
#ng serve --port 80 --host 0.0.0.0
ng serve --host 0.0.0.0

while true
do
  sleep 20
done

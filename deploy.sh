#!/bin/bash
./node_modules/@ionic/cli/bin/ionic build --prod
 ./node_modules/firebase-tools/lib/bin/firebase.js deploy

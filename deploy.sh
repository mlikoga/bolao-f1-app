#!/bin/bash
./node_modules/@ionic/cli/bin/ionic build --prod
firebase deploy

# bolao-f1-app

Online: https://bolao-f1-2019.firebaseapp.com

Progressive Web App with ionic v4
Using Firebase Firestore and Firebase Hosting

## Changelog

Check the full changelog [here](CHANGELOG.md).

## Development

**Requirements:**

- node v14+ `nvm use 20` (tested until v20.11.1)
- ionic v6
- Angular v15
- Typescript 4.9

These CLI versions were tested to work. You can try the latest as it is usually recommeded, but if you encounter any issues, you can use those that are guaranteed to work:

- ionic-cli v7 `npm install @ionic/cli@7.2 --save-dev`
- Firebase CLI v13 (to deploy) `npm install firebase-tools@v13 --save-dev`

**To initialize:**
`npm install`

**To run app in local browser:**
`npm start`

**To run tests:**
`npm test`

**To deploy:**

The first time you have to config Firebase, with:
`./node_modules/firebase-tools/lib/bin/firebase.js login`

Then, just run:
`./deploy.sh`

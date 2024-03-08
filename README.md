# bolao-f1-app

Online: https://bolao-f1-2019.firebaseapp.com

Progressive Web App with ionic v4
Using Firebase Firestore and Firebase Hosting

## Changelog

Check the full changelog [here](CHANGELOG.md).

## Development

**Requirements:**
- node v10 `nvm use 10`
- ionic-cli v6 `npm install @ionic/cli@6`
- Firebase CLI v9 (to deploy) `npm install firebase-tools@9`

**To initialize:**
`npm install`

**To run app in local browser:**
`npm start`

**To run tests:**
`npm test`

**To deploy:**

The first time you have to config Firebase, with:
`firebase login`

Then, just run:
`./deploy.sh`

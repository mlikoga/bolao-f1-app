# bolao-f1-app

Online: https://bolao-f1-2019.firebaseapp.com

Progressive Web App with ionic v4
Using Firebase Firestore and Firebase Hosting

## Changelog

Check the full changelog [here](CHANGELOG.md).

## Development

**Requirements:**
- node v10
- ionic `npm install -g @ionic/cli`
- Firebase CLI (to deploy) `npm install -g firebase-tools@9.23.3`

**If you are using nodeenv, first create the environment:**
`nodeenv --node=10.24.1 --with-npm bolao`

**Then activate it:**
`. bolao/bin/activate`

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

# bolao-f1-app

Online: https://bolao-f1-2019.firebaseapp.com

App with ionic v4
Using Firebase Firestore and Firebase Hosting

## Changelog

1.17 - 2019.07.09
- Login via email

1.16 - 2019.06.30
- Show last GP name on standings page
- Prints all bets as JSON string for backup purposes

1.15 - 2019.05.27
- Logout
- Exact bet highlight

1.14 - 2019.05.22
- Verify updates

1.13.1 - 2019.05.22
- Bug fix: do not show stats of current race when betting is enabled

1.13 - 2019.05.21
- Missing bets upload option to admins

1.12 - 2019.05.12
- Bets statistics

1.11.1 - 2019.05.10
- Bug fix: Last race bet for users that did not bet was not considered on points calculation.

1.11 - 2019.04.28
- Race results upload

1.10 - 2019.04.08
- Up/down positions on standings page

1.9 - 2019.03.31
- Total points for each user on bet list
- Highlight current user on standings

1.8 - 2019.03.30
- Use last race bet if someone did not bet on current race

1.7 - 2019.03.29
- Current bet appears on bet page

1.6 - 2019.03.28
- PWA

1.5 - 2019.03.26
- Race selection on Bet list
- Current race automatically selected

1.4 - 2019.03.21
- Detailed points

1.3 - 2019.03.20
- Standings
- Shows current GP on top of most pages

1.2 - 2019.03.16
- Caching

1.1 - 2019.03.15
- Bet list - you can view bet from all users

1.0 - 2019.03.14
- Simple login
- Bet
- Firebase firestore
- Firebase hosting

## Development

To run app in local browser:
`ionic serve`

To run tests:
`ng test`

To deploy:
`./deploy.sh`

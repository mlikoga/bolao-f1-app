# bolao-f1-app

## Changelog

7.0.1 - 2024.08.18 - Bugfix race order

- FIX: races were being ordered as string, so 10, 11, 12, etc would come before 2 in some screens
- Changed circuit name in Calendar screen to lightgray

7.0.0 - 2024.03.19 - Big lib versions update!

- ionic from v4 to v6
- Angular from v7 to v15
- node compatibility v14+ (it only worked in v10 before)
- Typescript from v3 to v4.9

6.0.1 - 2024.03.08

- FIX: when changing bet during bet period, the prior bet was being read from cache.
- FIX: No bet message when user did not place a bet.

6.0.0 - 2024.03.05

- NEW: Calendar screen with all races and dates!
  - Each race has its own screen with circuit image, times for all practices, qualifying and race
  - Times are editable by Admins
- NEW: Indicator if user has already done bet or not while in bet period
- Races are now in Firestore, not hard-coded; this means that changes like race cancellations can be made without a new app version;
- NEW: Hall of Fame
- Updates on bets and points:
  - Pre-season initial bet update: bet on 5 first drivers and teams. Points are 50, 40, 30, 20 and 10 respectively;
  - Bet deadline is now until start of qualifying
  - No more bet on Sprint race
  - No more extra 2 points per driver on the first 10
  - Fastest lap changed from 10 to 1 point  
  - Bet on first 3 of qualifying
  - User can bet in any future race, not just the next one

5.1.0 - 2023.07.23
- Chrome recently rolled out the Popover API. Unfortunately some old code that Ionic had used in ion-popover conflicted with the Popover API, causing a bug. We removed the use of popover. More info: https://github.com/ionic-team/ionic-framework/issues/27599#issuecomment-1584711091 
- Fixed bug in stats screen that prevented frow showing bars with more than 12 people.
- Updated drivers colors

5.0.0 - 2023.02.28
- Season 2023

4.0.0 - 2022.03.13
- Season 2022
- Initial bet now is only champion driver and team.

3.1.3 - 2021.10.03
- Calendar updated: Qatar added

3.1.2 - 2021.06.15
- Canada GP canceled

3.1.1 - 2021.05.07
- Fix: Stats page was showing first race instead of last

3.1.0 - 2021.03.27
- Changed colors

3.0.3 - 2021.03.26
- Fix: initial bet view was blank

3.0.2 - 2021.03.23
- Fix: initial bet ended sooner than expected

3.0.1 - 2021.03.15
- Fix: initial bet did not update (cache issue)

**3.0.0 - 2021.03.13 - Season 2021**
- Updated data to season 2021
- Removed hardcoded code  related to season 2020
- Fixed countdown bug
- Added option to edit initial bet
- Allow usename edit before season starts

2.7.0 - 2020.12.12
- Added initial bet (season) points

2.6.1 - 2020.12.03
- Added Fittipaldi and Aitken (temporary drivers)

2.6 - 2020.09.26
- **New:** Winners of each GP component

2.5 - 2020.08.14
- **Fix:** Bet list refresh for past races fixed
- Stats show up to 5 position

2.4.1 - 2020.08.08
- **Fix:** countdown bug fixes

2.4 - 2020.08.07
- **New:** countdown to bet period end!
- Updated calendar 2020 with races rounds 9 to 12

2.3 - 2020.07.31
- Added Hulkenberg

2.2 - 2020.07.18
- User points extract
- Refresh on bet list

2.1 - 2020.07.13
- Initial Bet View
- Initial Bet Stats

2.0 - 2020.03.08
- Season 2020
- Initial Bet for whole season
- Reset password

1.20 - 2019.12.01
- Race tab for everyone
- Race selector on race tab

1.19 - 2019.10.13
- Fixed cache bug
- Fixed timezone bug

1.18 - 2019.10.01
- Fix showing more than 1000 points at standings page
- Improved performance at standings page

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
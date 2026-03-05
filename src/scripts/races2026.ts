import * as admin from "firebase-admin"
import serviceAccount from "../../service-account.json"
// service-acccount.json is a private key file generated in Firebase Console → Project Settings → Service Accounts
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

export const db = admin.firestore()

const pre_season = {
  season: 2026,
  number: 0,
  name: "Temporada 2026",
  qualifyingStartsAt: "2026-03-05T22:30:00-03:00",
}

const races = [

  {
    number: 1,
    name: "Austrália",
    linkName: "australia",
    circuitName: "Albert Park Grand Prix Circuit",
    flag: "🇦🇺",
    season: 2026,
    practice1StartsAt: "2026-03-05T22:30:00-03:00",
    practice2StartsAt: "2026-03-06T02:00:00-03:00",
    practice3StartsAt: "2026-03-06T22:30:00-03:00",
    qualifyingStartsAt: "2026-03-07T02:00:00-03:00",
    raceStartsAt: "2026-03-08T01:00:00-03:00"
  },

  {
    number: 2,
    name: "China",
    linkName: "china",
    circuitName: "Shanghai International Circuit",
    flag: "🇨🇳",
    season: 2026,
    practice1StartsAt: "2026-03-13T00:30:00-03:00",
    sprintShootoutStartsAt: "2026-03-13T04:30:00-03:00",
    sprintStartsAt: "2026-03-14T00:00:00-03:00",
    qualifyingStartsAt: "2026-03-14T04:00:00-03:00",
    raceStartsAt: "2026-03-15T04:00:00-03:00"
  },

  {
    number: 3,
    name: "Japão",
    linkName: "japan",
    circuitName: "Suzuka Circuit",
    flag: "🇯🇵",
    season: 2026,
    practice1StartsAt: "2026-03-26T23:30:00-03:00",
    practice2StartsAt: "2026-03-27T03:00:00-03:00",
    practice3StartsAt: "2026-03-27T23:30:00-03:00",
    qualifyingStartsAt: "2026-03-28T03:00:00-03:00",
    raceStartsAt: "2026-03-29T02:00:00-03:00"
  },

  {
    number: 4,
    name: "Bahrein",
    linkName: "bahrain",
    circuitName: "Bahrain International Circuit",
    flag: "🇧🇭",
    season: 2026,
    practice1StartsAt: "2026-04-10T08:30:00-03:00",
    practice2StartsAt: "2026-04-10T12:00:00-03:00",
    practice3StartsAt: "2026-04-11T09:30:00-03:00",
    qualifyingStartsAt: "2026-04-11T13:00:00-03:00",
    raceStartsAt: "2026-04-12T12:00:00-03:00"
  },

  {
    number: 5,
    name: "Arábia Saudita",
    linkName: "saudi-arabia",
    circuitName: "Jeddah Corniche Circuit",
    flag: "🇸🇦",
    season: 2026,
    practice1StartsAt: "2026-04-17T10:30:00-03:00",
    practice2StartsAt: "2026-04-17T14:00:00-03:00",
    practice3StartsAt: "2026-04-18T10:30:00-03:00",
    qualifyingStartsAt: "2026-04-18T14:00:00-03:00",
    raceStartsAt: "2026-04-19T14:00:00-03:00"
  },

  {
    number: 6,
    name: "Miami",
    linkName: "miami",
    circuitName: "Miami International Autodrome",
    flag: "🇺🇸",
    season: 2026,
    practice1StartsAt: "2026-05-01T13:30:00-03:00",
    sprintShootoutStartsAt: "2026-05-01T17:30:00-03:00",
    sprintStartsAt: "2026-05-02T13:00:00-03:00",
    qualifyingStartsAt: "2026-05-02T17:00:00-03:00",
    raceStartsAt: "2026-05-03T17:00:00-03:00"
  },

  {
    number: 7,
    name: "Canadá",
    linkName: "canada",
    circuitName: "Circuit Gilles Villeneuve",
    flag: "🇨🇦",
    season: 2026,
    practice1StartsAt: "2026-05-22T13:30:00-03:00",
    sprintShootoutStartsAt: "2026-05-22T17:30:00-03:00",
    sprintStartsAt: "2026-05-23T13:00:00-03:00",
    qualifyingStartsAt: "2026-05-23T17:00:00-03:00",
    raceStartsAt: "2026-05-24T17:00:00-03:00"
  },

  {
    number: 8,
    name: "Mônaco",
    linkName: "monaco",
    circuitName: "Circuit de Monaco",
    flag: "🇲🇨",
    season: 2026,
    practice1StartsAt: "2026-06-05T08:30:00-03:00",
    practice2StartsAt: "2026-06-05T12:00:00-03:00",
    practice3StartsAt: "2026-06-06T07:30:00-03:00",
    qualifyingStartsAt: "2026-06-06T11:00:00-03:00",
    raceStartsAt: "2026-06-07T10:00:00-03:00"
  },

  {
    number: 9,
    name: "Espanha",
    linkName: "spain",
    circuitName: "Circuit de Barcelona-Catalunya",
    flag: "🇪🇸",
    season: 2026,
    practice1StartsAt: "2026-06-12T08:30:00-03:00",
    practice2StartsAt: "2026-06-12T12:00:00-03:00",
    practice3StartsAt: "2026-06-13T07:30:00-03:00",
    qualifyingStartsAt: "2026-06-13T11:00:00-03:00",
    raceStartsAt: "2026-06-14T10:00:00-03:00"
  },

  {
    number: 10,
    name: "Áustria",
    linkName: "austria",
    circuitName: "Red Bull Ring",
    flag: "🇦🇹",
    season: 2026,
    practice1StartsAt: "2026-06-26T08:30:00-03:00",
    practice2StartsAt: "2026-06-26T12:00:00-03:00",
    practice3StartsAt: "2026-06-27T07:30:00-03:00",
    qualifyingStartsAt: "2026-06-27T11:00:00-03:00",
    raceStartsAt: "2026-06-28T10:00:00-03:00"
  },

  {
    number: 11,
    name: "Reino Unido",
    linkName: "great-britain",
    circuitName: "Silverstone Circuit",
    flag: "🇬🇧",
    season: 2026,
    practice1StartsAt: "2026-07-03T08:30:00-03:00",
    sprintShootoutStartsAt: "2026-07-03T12:30:00-03:00",
    sprintStartsAt: "2026-07-04T08:00:00-03:00",
    qualifyingStartsAt: "2026-07-04T12:00:00-03:00",
    raceStartsAt: "2026-07-05T11:00:00-03:00"
  },

  {
    number: 12,
    name: "Bélgica",
    linkName: "belgium",
    circuitName: "Spa-Francorchamps",
    flag: "🇧🇪",
    season: 2026,
    practice1StartsAt: "2026-07-17T08:30:00-03:00",
    practice2StartsAt: "2026-07-17T12:00:00-03:00",
    practice3StartsAt: "2026-07-18T07:30:00-03:00",
    qualifyingStartsAt: "2026-07-18T11:00:00-03:00",
    raceStartsAt: "2026-07-19T10:00:00-03:00"
  },

  {
    number: 13,
    name: "Hungria",
    linkName: "hungary",
    circuitName: "Hungaroring",
    flag: "🇭🇺",
    season: 2026,
    practice1StartsAt: "2026-07-24T08:30:00-03:00",
    practice2StartsAt: "2026-07-24T12:00:00-03:00",
    practice3StartsAt: "2026-07-25T07:30:00-03:00",
    qualifyingStartsAt: "2026-07-25T11:00:00-03:00",
    raceStartsAt: "2026-07-26T10:00:00-03:00"
  },

  {
    number: 14,
    name: "Holanda",
    linkName: "netherlands",
    circuitName: "Circuit Zandvoort",
    flag: "🇳🇱",
    season: 2026,
    practice1StartsAt: "2026-08-21T08:30:00-03:00",
    sprintShootoutStartsAt: "2026-08-21T12:30:00-03:00",
    sprintStartsAt: "2026-08-22T08:00:00-03:00",
    qualifyingStartsAt: "2026-08-22T12:00:00-03:00",
    raceStartsAt: "2026-08-23T10:00:00-03:00"
  },

  {
    number: 15,
    name: "Itália",
    linkName: "italy",
    circuitName: "Monza",
    flag: "🇮🇹",
    season: 2026,
    practice1StartsAt: "2026-09-04T07:30:00-03:00",
    practice2StartsAt: "2026-09-04T11:00:00-03:00",
    practice3StartsAt: "2026-09-05T07:30:00-03:00",
    qualifyingStartsAt: "2026-09-05T11:00:00-03:00",
    raceStartsAt: "2026-09-06T10:00:00-03:00"
  },

  {
    number: 16,
    name: "Espanha",
    linkName: "madrid",
    circuitName: "Madring",
    flag: "🇪🇸",
    season: 2026,
    practice1StartsAt: "2026-09-11T08:30:00-03:00",
    practice2StartsAt: "2026-09-11T12:00:00-03:00",
    practice3StartsAt: "2026-09-12T07:30:00-03:00",
    qualifyingStartsAt: "2026-09-12T11:00:00-03:00",
    raceStartsAt: "2026-09-13T10:00:00-03:00"
  },

  {
    number: 17,
    name: "Azerbaijão",
    linkName: "azerbaijan",
    circuitName: "Baku City Circuit",
    flag: "🇦🇿",
    season: 2026,
    practice1StartsAt: "2026-09-24T05:30:00-03:00",
    practice2StartsAt: "2026-09-24T09:00:00-03:00",
    practice3StartsAt: "2026-09-25T05:30:00-03:00",
    qualifyingStartsAt: "2026-09-25T09:00:00-03:00",
    raceStartsAt: "2026-09-26T08:00:00-03:00"
  },

  {
    number: 18,
    name: "Singapura",
    linkName: "singapore",
    circuitName: "Marina Bay Street Circuit",
    flag: "🇸🇬",
    season: 2026,
    practice1StartsAt: "2026-10-09T05:30:00-03:00",
    sprintShootoutStartsAt: "2026-10-09T09:30:00-03:00",
    sprintStartsAt: "2026-10-10T06:00:00-03:00",
    qualifyingStartsAt: "2026-10-10T10:00:00-03:00",
    raceStartsAt: "2026-10-11T09:00:00-03:00"
  },

  {
    number: 19,
    name: "Estados Unidos",
    linkName: "usa",
    circuitName: "Circuit of the Americas",
    flag: "🇺🇸",
    season: 2026,
    practice1StartsAt: "2026-10-23T14:30:00-03:00",
    practice2StartsAt: "2026-10-23T18:00:00-03:00",
    practice3StartsAt: "2026-10-24T14:30:00-03:00",
    qualifyingStartsAt: "2026-10-24T18:00:00-03:00",
    raceStartsAt: "2026-10-25T17:00:00-03:00"
  },

  {
    number: 20,
    name: "México",
    linkName: "mexico",
    circuitName: "Autódromo Hermanos Rodríguez",
    flag: "🇲🇽",
    season: 2026,
    practice1StartsAt: "2026-10-30T15:30:00-03:00",
    practice2StartsAt: "2026-10-30T19:00:00-03:00",
    practice3StartsAt: "2026-10-31T14:30:00-03:00",
    qualifyingStartsAt: "2026-10-31T18:00:00-03:00",
    raceStartsAt: "2026-11-01T17:00:00-03:00"
  },

  {
    number: 21,
    name: "Brasil",
    linkName: "brazil",
    circuitName: "Autódromo José Carlos Pace",
    flag: "🇧🇷",
    season: 2026,
    practice1StartsAt: "2026-11-06T12:30:00-03:00",
    practice2StartsAt: "2026-11-06T16:00:00-03:00",
    practice3StartsAt: "2026-11-07T11:30:00-03:00",
    qualifyingStartsAt: "2026-11-07T15:00:00-03:00",
    raceStartsAt: "2026-11-08T14:00:00-03:00"
  },

  {
    number: 22,
    name: "Las Vegas",
    linkName: "las-vegas",
    circuitName: "Las Vegas Strip Circuit",
    flag: "🇺🇸",
    season: 2026,
    practice1StartsAt: "2026-11-19T21:30:00-03:00",
    practice2StartsAt: "2026-11-20T01:00:00-03:00",
    practice3StartsAt: "2026-11-20T21:30:00-03:00",
    qualifyingStartsAt: "2026-11-21T01:00:00-03:00",
    raceStartsAt: "2026-11-22T01:00:00-03:00"
  },

  {
    number: 23,
    name: "Catar",
    linkName: "qatar",
    circuitName: "Lusail International Circuit",
    flag: "🇶🇦",
    season: 2026,
    practice1StartsAt: "2026-11-27T10:30:00-03:00",
    practice2StartsAt: "2026-11-27T14:00:00-03:00",
    practice3StartsAt: "2026-11-28T11:30:00-03:00",
    qualifyingStartsAt: "2026-11-28T15:00:00-03:00",
    raceStartsAt: "2026-11-29T13:00:00-03:00"
  },

  {
    number: 24,
    name: "Abu Dhabi",
    linkName: "abu-dhabi",
    circuitName: "Yas Marina Circuit",
    flag: "🇦🇪",
    season: 2026,
    practice1StartsAt: "2026-12-04T06:30:00-03:00",
    practice2StartsAt: "2026-12-04T10:00:00-03:00",
    practice3StartsAt: "2026-12-05T07:30:00-03:00",
    qualifyingStartsAt: "2026-12-05T11:00:00-03:00",
    raceStartsAt: "2026-12-06T10:00:00-03:00"
  }

];

async function populateRaces() {
  const batch = db.batch()

  races.forEach(r => {
    const ref = db.collection("races").doc(`${r.season}.${r.number}`)
    batch.set(ref, r)
  })

  await batch.commit()
  console.log(`Inserted ${races.length} races`)
}

async function populatePreSeason() {
  const ref = db.collection("races").doc(`${pre_season.season}.${pre_season.number}`)
  await ref.set(pre_season)
  console.log(`Inserted pre-season`)
}

populatePreSeason()
populateRaces()

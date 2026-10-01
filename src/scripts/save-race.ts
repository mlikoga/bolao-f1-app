import * as admin from "firebase-admin"
import serviceAccount from "../../service-account.json"
// service-acccount.json is a private key file generated in Firebase Console → Project Settings → Service Accounts
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

export const db = admin.firestore()

const race = 
  {
    number: 17.5,
    name: "Bahrein na Malásia",
    linkName: "bahrain",
    circuitName: "Sepang International Circuit",
    circuitImageUrl: "https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000001/common/f1/2026/track/2026trackkualalumpurdetailed.webp",
    flag: "🇧🇭",
    season: 2026,
    practice1StartsAt: "2026-10-02T01:30:00-03:00",
    practice2StartsAt: "2026-10-02T05:00:00-03:00",
    practice3StartsAt: "2026-10-03T01:30:00-03:00",
    qualifyingStartsAt: "2026-10-03T05:00:00-03:00",
    raceStartsAt: "2026-10-04T04:00:00-03:00"
  };

async function saveRace() {
  const ref = db.collection("races").doc(`${race.season}.${race.number}`)
  await ref.set(race, { merge: true })
  console.log(`Saved race ${race.season}.${race.number} (${race.name})`)
}

saveRace()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })


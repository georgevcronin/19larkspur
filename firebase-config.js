// Firebase configuration for the favour points ledger.
//
// HOW TO ENABLE CLOUD SYNC (one-off setup, ~5 minutes):
//
//  1. Go to https://console.firebase.google.com and "Add project"
//     (call it e.g. "larkspur-terrace"; Google Analytics not needed).
//  2. In the project, open Build > Firestore Database > "Create database"
//     and choose a location (europe-west2 is London).
//  3. Under the database's "Rules" tab, paste and publish:
//
//       rules_version = '2';
//       service cloud.firestore {
//         match /databases/{database}/documents {
//           match /favours/{entry} {
//             allow read, write: if true;
//           }
//         }
//       }
//
//     NOTE: this lets anyone who has the site URL read and edit the
//     ledger. Fine for a house scoreboard; do not reuse for anything
//     sensitive.
//  4. Project settings (gear icon) > "Your apps" > add a Web app (</>).
//     Firebase shows a config object - copy its values over the
//     placeholders below and push this file.
//
// The apiKey is not a secret (it only identifies the project; access is
// controlled by the rules above), so committing it here is fine.
//
// While the placeholders below are unchanged, the ledger automatically
// falls back to saving in each browser's localStorage.

const FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

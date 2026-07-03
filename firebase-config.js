// Firebase configuration for the favour points ledger.
//
// Project: larkspur-terrace-favours (created via `firebase projects:create`)
// Firestore database: eur3, Native mode, free tier.
//
// ONE REMAINING MANUAL STEP — enabling Google Sign-In:
//   Google Sign-In is turned on from the Firebase console (this specific
//   toggle isn't exposed to non-interactive tooling, and is the kind of
//   identity-provider change worth a human's eyes anyway):
//     1. Open https://console.firebase.google.com/project/larkspur-terrace-favours/authentication/providers
//     2. Click "Google" in the provider list, toggle Enable, pick a
//        support email, Save.
//   That's it — no other configuration needed. The page already calls
//   signInWithPopup(GoogleAuthProvider), and Firestore's rules already
//   restrict access to the five housemates' emails (see firestore.rules).
//
// Security model:
//   - Firestore rules only allow reads and writes from a signed-in user
//     whose Google account email is one of the five housemates'
//     addresses. Everyone else is refused by the database itself,
//     regardless of what the page does.
//   - The apiKey below is not a secret — it only identifies the project;
//     access is controlled entirely by the rules above. Safe to commit.

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDu2Sj7pBalrfg6gyXbL4nYeNW6cutSNhE",
  authDomain: "larkspur-terrace-favours.firebaseapp.com",
  projectId: "larkspur-terrace-favours",
  storageBucket: "larkspur-terrace-favours.firebasestorage.app",
  messagingSenderId: "632602985094",
  appId: "1:632602985094:web:f5967c2f375f07aeff8707"
};

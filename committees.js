// 19 Larkspur Terrace — committee register data.
// This file is the single place to update when elections are held.
// A committee with an empty `members` array is vacant; the disturbance
// report tool then routes to all five housemates.

const HOUSEMATES = {
  "george-cronin":  { name: "George Cronin",        email: "georgevcronin@gmail.com" },
  "george-bale":    { name: "George Bale",          email: "bale.george22@gmail.com" },
  "alexander-pear": { name: "Alexander Pear",       email: "alexpear18@outlook.com" },
  "freddie-smith":  { name: "Freddie Austin Smith", email: "freddieasmith291@gmail.com" },
  "oliver-shawyer": { name: "Oliver Shawyer",       email: "Oli24sha07@gmail.com" }
};

const COMMITTEES = [
  { id: "kitchen",     nameEn: "Kitchen Committee",               nameTr: "Mutfak Komitesi",                seats: 2, cycleEn: "Monthly",               cycleTr: "Aylık",                    members: [] },
  { id: "living-room", nameEn: "Living Room Committee",           nameTr: "Oturma Odası Komitesi",          seats: 2, cycleEn: "Monthly",               cycleTr: "Aylık",                    members: [] },
  { id: "corridor",    nameEn: "Corridor Committee",              nameTr: "Koridor Komitesi",               seats: 2, cycleEn: "Monthly",               cycleTr: "Aylık",                    members: [] },
  { id: "stairs",      nameEn: "Stairs Committee",                nameTr: "Merdiven Komitesi",              seats: 2, cycleEn: "Monthly",               cycleTr: "Aylık",                    members: [] },
  { id: "bathroom-1",  nameEn: "Bathroom Committee (1st floor)",  nameTr: "Banyo Komitesi (1. kat)",        seats: 3, cycleEn: "Fixed by constitution",  cycleTr: "Anayasayla sabit",         members: ["alexander-pear", "freddie-smith", "oliver-shawyer"] },
  { id: "bathroom-2",  nameEn: "Bathroom Committee (2nd floor)",  nameTr: "Banyo Komitesi (2. kat)",        seats: 2, cycleEn: "Fixed by constitution",  cycleTr: "Anayasayla sabit",         members: ["george-cronin", "george-bale"] },
  { id: "bedroom",     nameEn: "Bedroom Committee",               nameTr: "Yatak Odası Komitesi",           seats: 2, cycleEn: "Monthly",               cycleTr: "Aylık",                    members: [] },
  { id: "committee",   nameEn: "Committee Committee",             nameTr: "Komite Komitesi",                seats: 2, cycleEn: "Bi-monthly (staggered)", cycleTr: "İki ayda bir (kademeli)",  members: [] },
  { id: "rules",       nameEn: "Rules Committee",                 nameTr: "Kurallar Komitesi",              seats: 2, cycleEn: "Monthly",               cycleTr: "Aylık",                    members: [] },
  { id: "pass",        nameEn: "Pass Committee",                  nameTr: "Pasolar Komitesi",               seats: 2, cycleEn: "Monthly",               cycleTr: "Aylık",                    members: [] },
  { id: "location",    nameEn: "Location Committee",              nameTr: "Konum Komitesi",                 seats: 2, cycleEn: "Monthly",               cycleTr: "Aylık",                    members: [] },
  { id: "foreign",     nameEn: "Foreign Affairs Committee",       nameTr: "Dışişleri Komitesi",             seats: 2, cycleEn: "Monthly",               cycleTr: "Aylık",                    members: [] }
];

// Which committee has jurisdiction over each reportable location.
const ROOM_TO_COMMITTEE = {
  "kitchen":     "kitchen",
  "living-room": "living-room",
  "corridor":    "corridor",
  "stairs":      "stairs",
  "bathroom-1":  "bathroom-1",
  "bathroom-2":  "bathroom-2",
  "bedroom":     "bedroom"
};

function committeeById(id) {
  return COMMITTEES.find(function (c) { return c.id === id; });
}

// Emails for a committee's current members; falls back to every
// housemate while the committee is vacant.
function committeeEmails(id) {
  var c = committeeById(id);
  var members = (c && c.members.length) ? c.members : Object.keys(HOUSEMATES);
  return members.map(function (m) { return HOUSEMATES[m].email; });
}

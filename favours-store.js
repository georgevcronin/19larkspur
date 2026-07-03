// Storage engine for the favour points ledger.
// Uses Firestore (live-synced across devices) when firebase-config.js
// has real values; otherwise falls back to this browser's localStorage.

var FavourStore = (function () {
  var LOCAL_KEY = "larkspur-favours";
  var FIREBASE_CDN = "https://www.gstatic.com/firebasejs/10.12.0/";
  var backend = null;
  var cache = [];
  var changeCb = function () {};
  var modeCb = function () {};

  function isConfigured() {
    return typeof FIREBASE_CONFIG === "object" &&
      FIREBASE_CONFIG.apiKey &&
      FIREBASE_CONFIG.apiKey.indexOf("PASTE") === -1;
  }

  function emit() { changeCb(cache.slice()); }

  // --- localStorage backend -------------------------------------------
  function startLocal() {
    function load() {
      try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; }
      catch (e) { return []; }
    }
    function save(entries) { localStorage.setItem(LOCAL_KEY, JSON.stringify(entries)); }
    backend = {
      mode: "local",
      add: function (e) {
        e.id = Date.now() + "-" + Math.random().toString(36).slice(2, 7);
        var entries = load();
        entries.push(e);
        save(entries);
        cache = entries;
        emit();
      },
      remove: function (id) {
        cache = load().filter(function (e) { return e.id !== id; });
        save(cache);
        emit();
      },
      clear: function () { save([]); cache = []; emit(); }
    };
    cache = load();
    modeCb("local");
    emit();
  }

  // --- Firestore backend ----------------------------------------------
  function startFirestore() {
    Promise.all([
      import(FIREBASE_CDN + "firebase-app.js"),
      import(FIREBASE_CDN + "firebase-firestore.js")
    ]).then(function (mods) {
      var appMod = mods[0], fs = mods[1];
      var app = appMod.initializeApp(FIREBASE_CONFIG);
      var db = fs.getFirestore(app);
      var col = fs.collection(db, "favours");
      fs.onSnapshot(fs.query(col, fs.orderBy("date", "desc")),
        function (snap) {
          cache = snap.docs.map(function (d) {
            var e = d.data(); e.id = d.id; return e;
          });
          modeCb("firestore");
          emit();
        },
        function (err) {
          console.error("Firestore subscription failed; using local storage.", err);
          startLocal();
        });
      backend = {
        mode: "firestore",
        add: function (e) {
          fs.addDoc(col, e).catch(function (err) { console.error("add failed", err); });
        },
        remove: function (id) {
          fs.deleteDoc(fs.doc(db, "favours", id)).catch(function (err) { console.error("delete failed", err); });
        },
        clear: function () {
          cache.forEach(function (e) {
            fs.deleteDoc(fs.doc(db, "favours", e.id)).catch(function (err) { console.error("delete failed", err); });
          });
        }
      };
    }).catch(function (err) {
      console.error("Firebase SDK failed to load; using local storage.", err);
      startLocal();
    });
  }

  return {
    init: function (onChange, onMode) {
      changeCb = onChange || changeCb;
      modeCb = onMode || modeCb;
      if (isConfigured()) startFirestore(); else startLocal();
    },
    entries: function () { return cache.slice(); },
    add: function (e) { backend && backend.add(e); },
    remove: function (id) { backend && backend.remove(id); },
    clear: function () { backend && backend.clear(); },
    configured: isConfigured
  };
})();

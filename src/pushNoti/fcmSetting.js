const admin = require("firebase-admin");

let serviceAccount = require("../config/firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

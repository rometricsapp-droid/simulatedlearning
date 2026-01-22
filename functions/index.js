const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.createCustomToken = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { idToken } = req.body;
      const decoded = await admin.auth().verifyIdToken(idToken);
      const customToken = await admin.auth().createCustomToken(decoded.uid);
      res.json({ customToken });
    } catch (e) {
      res.status(401).json({ error: "Invalid token" });
    }
  });
});

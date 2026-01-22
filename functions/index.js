const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createCustomToken = functions.https.onRequest(async (req, res) => {
  try {
    const { idToken } = req.body;
    const decoded = await admin.auth().verifyIdToken(idToken);
    const customToken = await admin.auth().createCustomToken(decoded.uid);
    res.json({ customToken });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

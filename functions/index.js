const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

initializeApp();

const db = getFirestore();
const bucket = getStorage().bucket();

const deleteEntries = async (uid) => {
  const entries = db.collection('users').doc(uid).collection('entries');
  let deleted = 0;

  while (true) {
    const snapshot = await entries.limit(450).get();
    if (snapshot.empty) break;

    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    deleted += snapshot.size;
  }

  return deleted;
};

exports.deleteUserData = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be signed in to delete account data.');
  }

  const uid = request.auth.uid;
  const deletedEntries = await deleteEntries(uid);
  await bucket.deleteFiles({ prefix: `users/${uid}/images/`, force: true });

  return { success: true, deletedEntries };
});

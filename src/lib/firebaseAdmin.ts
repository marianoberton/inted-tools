import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

if (!admin.apps.length) {
  try {
    // Construct the path to the service account key file
    // Assumes the key file is in the project root, and this file is in src/lib/
    const keyFileName = 'procesos-inted-firebase-adminsdk-qwt8a-8324a99c15.json';
    const keyFilePath = path.resolve(process.cwd(), keyFileName);

    if (!fs.existsSync(keyFilePath)) {
      throw new Error(`Service account key file not found at ${keyFilePath}. Please ensure the file '${keyFileName}' exists in the project root.`);
    }

    const serviceAccountString = fs.readFileSync(keyFilePath, 'utf8');
    const serviceAccount = JSON.parse(serviceAccountString);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    // Optional: Log success on the server during development
    // console.log(`Firebase Admin SDK initialized successfully using ${keyFileName}.`);
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization error:', error.message);
    // Depending on your error handling strategy, you might want to re-throw the error
    // or ensure that components using this module can handle an uninitialized SDK.
  }
}

// Export firestore instance.
// It's important to check if admin.apps.length > 0 before trying to use firestore
// if there's a chance of initialization failure and you want to handle it gracefully elsewhere.
// For this dashboard, if init fails, firestore calls will fail, and the page should show an error or empty state.
const firestore = admin.apps.length ? admin.firestore() : null;

export { firestore, admin as defaultAdmin }; 
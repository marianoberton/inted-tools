import admin from 'firebase-admin';

let firestore: admin.firestore.Firestore | null = null;

if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!process.env.FIREBASE_PROJECT_ID) {
      console.error('Firebase Admin: FIREBASE_PROJECT_ID is not set.');
    } else if (!privateKey) {
      console.error('Firebase Admin: FIREBASE_PRIVATE_KEY is not set or invalid.');
    } else if (!process.env.FIREBASE_CLIENT_EMAIL) {
      console.error('Firebase Admin: FIREBASE_CLIENT_EMAIL is not set.');
    }
    // Add checks for other essential variables if necessary (e.g., client_id, private_key_id)
    
    if (process.env.FIREBASE_PROJECT_ID && privateKey && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY_ID && process.env.FIREBASE_CLIENT_ID) {
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: privateKey,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
        token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.FIREBASE_CLIENT_EMAIL || "")}`
      } as admin.ServiceAccount;

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      firestore = admin.firestore();
      console.log('Firebase Admin initialized successfully using environment variables.');
    } else {
      console.error('Firebase Admin: Missing essential environment variables for initialization. Ensure FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY_ID, and FIREBASE_CLIENT_ID are set.');
    }
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
  }
} else {
  // If already initialized, get the default app's firestore instance
  firestore = admin.app().firestore();
}

export { firestore }; 
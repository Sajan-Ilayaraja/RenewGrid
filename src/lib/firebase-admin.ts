
import * as admin from 'firebase-admin';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

function initializeFirebaseAdmin() {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceAccount) {
    console.warn('Missing FIREBASE_SERVICE_ACCOUNT environment variable. Firebase Admin SDK features will be limited.');
    // In a development or CI/CD environment where service account is not set,
    // we can return a mock or limited functionality instance, or simply return null.
    // For now, we'll just prevent the app from crashing.
    if (admin.apps.length === 0) {
        // Initialize with no credentials if none are provided.
        // This will have very limited permissions.
        admin.initializeApp();
    }
    return admin.app();
  }

  // Prevent re-initialization
  if (admin.apps.length > 0) {
    return admin.app();
  }
  
  try {
    const parsedServiceAccount = JSON.parse(serviceAccount);

    return admin.initializeApp({
      credential: admin.credential.cert(parsedServiceAccount),
    });
  } catch (e: any) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT. Make sure it is a valid JSON string.', e);
    // Do not throw here, to allow the app to run in a degraded state.
    if (admin.apps.length === 0) {
        admin.initializeApp();
    }
    return admin.app();
  }
}

function getInitializedAdmin() {
  if (admin.apps.length === 0) {
    initializeFirebaseAdmin();
  }
  return admin;
}


export const getAdminAuth = () => {
    // Before returning auth, check if the service account was actually loaded.
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccount) {
        // This function will be called by parts of the app that need admin rights.
        // If the service account isn't there, we can't provide auth.
        throw new Error('Firebase Admin SDK is not initialized. Please set FIREBASE_SERVICE_ACCOUNT.');
    }
    return getInitializedAdmin().auth();
};

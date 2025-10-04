
import { config } from 'dotenv';
config();

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc, getDocs, query as firestoreQuery, where, Timestamp } from 'firebase/firestore';
import { energyData, alerts, anomalies, userDetails, transactions, systemStatus } from '../lib/data';
import { app } from '../lib/firebase';

const db = getFirestore(app);

async function clearCollection(collectionName: string) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  if (snapshot.empty) return;

  const batch = writeBatch(db);
  snapshot.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  console.log(`Cleared collection: ${collectionName}`);
}

async function seedDatabase() {
  console.log('Starting to seed database...');
  
  // Clear existing data to prevent duplicates
  console.log('Clearing existing data...');
  await clearCollection('energy_data');
  await clearCollection('alerts');
  await clearCollection('anomalies');
  console.log('Cleared general collections.');

  const batch = writeBatch(db);
  // Seed energy_data with timestamps
  const energyCol = collection(db, 'energy_data');
  energyData.forEach((data, index) => {
    const docRef = doc(energyCol);
    // Create timestamps that are in the past
    const timestamp = Timestamp.fromMillis(Date.now() - (energyData.length - index) * 2 * 60 * 60 * 1000); // 2 hours apart
    batch.set(docRef, { ...data, generation: data.solarGeneration + data.windGeneration, time: timestamp.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}), timestamp });
  });
  console.log('energy_data prepared for batch.');

  // Seed alerts
  const alertsCol = collection(db, 'alerts');
  alerts.forEach((alertData) => {
    const docRef = doc(alertsCol);
    const timestamp = Timestamp.fromMillis(Date.now() - Math.random() * 60 * 60 * 1000);
    batch.set(docRef, { ...alertData, id: docRef.id, timestamp });
  });
  console.log('alerts prepared for batch.');

  // Seed anomalies
  const anomaliesCol = collection(db, 'anomalies');
  anomalies.forEach((anomaly) => {
    const docRef = doc(anomaliesCol);
    batch.set(docRef, { description: anomaly });
  });
  console.log('anomalies prepared for batch.');
    
  // Seed system status
  const statusDocRef = doc(db, 'system', 'status');
  batch.set(statusDocRef, systemStatus);
  console.log('System status prepared for batch.');

  // NOTE: User-specific data (including the default admin) is now created on first login
  // in the `src/app/dashboard/user/home/page.tsx` and the logic in `createNewUser` action.
  // This removes the need for Firebase Admin SDK during the seed process.

  try {
    await batch.commit();
    console.log('Successfully seeded database with public data!');
  } catch (error) {
    console.error('Error committing batch:', error);
  }
}

seedDatabase();

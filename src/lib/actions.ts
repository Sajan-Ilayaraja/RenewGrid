
'use server';

import { z } from 'zod';
import { app } from './firebase';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAdminAuth } from '@/lib/firebase-admin';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendContactMessage(formData: unknown) {
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, message: 'Invalid form data.' };
  }

  try {
    const db = getFirestore(app);
    await addDoc(collection(db, 'contacts'), parsed.data);
    return { success: true };
  } catch (error) {
    console.error('Error sending message to Firebase:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}

const addUserSchema = z.object({
  phoneNumber: z.string().length(10, 'Please enter a valid 10-digit phone number.'),
  ownerName: z.string().min(2, 'Name must be at least 2 characters.'),
  houseNumber: z.string().min(1, 'House number is required.'),
  address: z.string().min(10, 'Address must be at least 10 characters.'),
});

export async function createNewUser(formData: unknown) {
  const parsed = addUserSchema.safeParse(formData);

  if (!parsed.success) {
      const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ');
      return { success: false, message: `Invalid form data: ${errorMessages}` };
  }

  const { phoneNumber, ownerName, houseNumber, address } = parsed.data;

  try {
    const auth = getAdminAuth();
    // Prepend +91 country code to the 10-digit number
    const formattedPhoneNumber = `+91${phoneNumber}`;
    
    const userRecord = await auth.createUser({
      phoneNumber: formattedPhoneNumber,
      displayName: ownerName,
    });
    
    const user = userRecord;

    const db = getFirestore(app);
    await setDoc(doc(db, 'users', user.uid), {
      ownerName,
      houseNumber,
      address,
      liveMeterReading: 0, // Default live meter reading
      phoneNumber: formattedPhoneNumber
    });

    return { success: true, message: 'User created successfully!' };
  } catch (error: any) {
    console.error('Error creating new user:', error);
     if (error.code === 'auth/phone-number-already-exists') {
      return { success: false, message: 'This phone number is already in use.' };
    }
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}

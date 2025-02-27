import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";

import dotenv from 'dotenv';
dotenv.config();


// Firebase Configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to submit vote
export async function submitVote(option) {
  if (!["Yes", "No"].includes(option)) {
    throw new Error("Invalid vote option");
  }

  const pollRef = doc(db, "polls", "results");

  try {
    await updateDoc(pollRef, {
      [option]: increment(1),
    });
    return { success: true, message: "Vote submitted successfully!" };
  } catch (error) {
    console.error("Error submitting vote:", error);
    return { success: false, message: "Failed to submit vote." };
  }
}

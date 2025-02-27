import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd1JK-vM-9GtO5TTZMjglFX3OOd5MVPsc",
  authDomain: "nickd-184c1.firebaseapp.com",
  projectId: "nickd-184c1",
  storageBucket: "nickd-184c1.firebasestorage.app",
  messagingSenderId: "674720445062",
  appId: "1:674720445062:web:d09de9be138d5e05c25707",
  measurementId: "G-FCH0QNJZ0R"
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

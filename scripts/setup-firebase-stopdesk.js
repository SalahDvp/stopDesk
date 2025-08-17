// Firebase StopDesk Collection Setup Script
// This script helps you set up the StopDesk collection in Firebase Firestore

import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Sample StopDesk data
const sampleStopDesks = [
  {
    uid: "M001",
    address: "123 Rue de la Livraison",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    phoneNumbers: ["+33 1 23 45 67 89", "+33 9 87 65 43 21"],
    googleMapsLink: "https://maps.google.com/?q=123+Rue+de+la+Livraison,+75001+Paris,+France",
  },
  {
    uid: "M002",
    address: "456 Avenue des Champs-Élysées",
    city: "Paris",
    postalCode: "75008",
    country: "France",
    phoneNumbers: ["+33 1 42 56 78 90"],
    googleMapsLink: "https://maps.google.com/?q=456+Avenue+des+Champs-Élysées,+75008+Paris,+France",
  },
  {
    uid: "M003",
    address: "789 Place Bellecour",
    city: "Lyon",
    postalCode: "69002",
    country: "France",
    phoneNumbers: ["+33 4 78 90 12 34", "+33 6 12 34 56 78"],
    googleMapsLink: "https://maps.google.com/?q=789+Place+Bellecour,+69002+Lyon,+France",
  },
]

// Function to create StopDesk documents
async function setupStopDeskCollection() {
  try {
    console.log("Setting up StopDesk collection...")

    for (const stopDesk of sampleStopDesks) {
      const { uid, ...data } = stopDesk
      const docRef = doc(db, "StopDesk", uid)

      await setDoc(docRef, data)
      console.log(`✅ Created StopDesk document: ${uid}`)
      console.log(`   URL: stopdesk.info/${uid}`)
    }

    console.log("\n🎉 StopDesk collection setup complete!")
    console.log("\nAvailable StopDesk URLs:")
    sampleStopDesks.forEach((stopDesk) => {
      console.log(`- stopdesk.info/${stopDesk.uid}`)
    })
  } catch (error) {
    console.error("❌ Error setting up StopDesk collection:", error)
  }
}

// Run the setup
setupStopDeskCollection()

/* 
INSTRUCTIONS FOR USE:

1. Replace the firebaseConfig object above with your actual Firebase configuration
2. Make sure you have Firebase Admin SDK permissions or proper authentication
3. Run this script to populate your Firestore with sample StopDesk data

FIRESTORE COLLECTION STRUCTURE:
Collection: "StopDesk"
Document ID: {uid} (e.g., "demo-stopdesk-001")
Document Fields:
- address: string (required)
- city: string (optional)
- postalCode: string (optional) 
- country: string (optional)
- phoneNumbers: array of strings (required)
- googleMapsLink: string (required)

URL STRUCTURE:
Each StopDesk will be accessible at: stopdesk.info/{uid}
Example: stopdesk.info/demo-stopdesk-001
*/

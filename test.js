const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");

// ⚡ Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA4YsEHLisv0iblWmyH7qE3CQaYv3d-ClI",
    authDomain: "deliverysync-9fdcd.firebaseapp.com",
    projectId: "deliverysync-9fdcd",
    storageBucket: "deliverysync-9fdcd.firebasestorage.app",
    messagingSenderId: "907163553140",
    appId: "1:907163553140:web:48d0127a7a4b3b1b353021",
    measurementId: "G-54MJ3FQZFC"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const sampleStopDesks = [
    {
      uid: "m001",
      address: "123 Rue de la Livraison",
      city: "Paris",
      postalCode: "75001",
      country: "France",
      phoneNumbers: ["+33 1 23 45 67 89", "+33 9 87 65 43 21"],
      googleMapsLink:
        "https://maps.google.com/?q=123+Rue+de+la+Livraison,+75001+Paris,+France",
    },
    {
      uid: "m002",
      address: "456 Avenue des Champs-Élysées",
      city: "Paris",
      postalCode: "75008",
      country: "France",
      phoneNumbers: ["+33 1 42 56 78 90"],
      googleMapsLink:
        "https://maps.google.com/?q=456+Avenue+des+Champs-Élysées,+75008+Paris,+France",
    },
    {
      uid: "m003",
      address: "789 Place Bellecour",
      city: "Lyon",
      postalCode: "69002",
      country: "France",
      phoneNumbers: ["+33 4 78 90 12 34", "+33 6 12 34 56 78"],
      googleMapsLink:
        "https://maps.google.com/?q=789+Place+Bellecour,+69002+Lyon,+France",
    },
  ];
  
  // Function to append StopDesks to Firestore
  async function addStopDesks() {
    try {
      const stopDeskRef = collection(db, "StopDesk");
  
      for (const desk of sampleStopDesks) {
        // Use uid as document ID to avoid duplicates
        await setDoc(doc(stopDeskRef, desk.uid), desk, { merge: true });
        console.log(`✅ Added StopDesk ${desk.uid}`);
      }
  
      console.log("🎉 All StopDesks inserted successfully!");
    } catch (error) {
      console.error("❌ Error adding StopDesks:", error);
    }
  }
  
  // Run immediately
  (async () => {
    await addStopDesks();
    process.exit(0);
  })();
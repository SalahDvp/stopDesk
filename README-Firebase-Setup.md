# Firebase StopDesk Setup Guide

This guide explains how to set up Firebase for the StopDesk application.

## Required Environment Variables

Add these environment variables to your Vercel project or `.env.local` file:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
\`\`\`

## Firebase Setup Steps

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database

2. **Get Configuration**
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click "Web" icon to add a web app
   - Copy the configuration object

3. **Set Up Firestore Rules**
   \`\`\`javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /StopDesk/{document} {
         allow read: if true; // Public read access for StopDesk data
         allow write: if false; // Restrict write access
       }
     }
   }
   \`\`\`

4. **Run Setup Script**
   - Update the `firebaseConfig` in `scripts/setup-firebase-stopdesk.js`
   - Run the script to populate sample data

## Collection Structure

### StopDesk Collection
- **Collection Name**: `StopDesk`
- **Document ID**: UID (e.g., "demo-stopdesk-001")
- **Fields**:
  - `address` (string, required): Full street address
  - `city` (string, optional): City name
  - `postalCode` (string, optional): Postal/ZIP code
  - `country` (string, optional): Country name
  - `phoneNumbers` (array, required): Array of phone number strings
  - `googleMapsLink` (string, required): Google Maps URL
  - `hours` (object, optional): Operating hours
    - `monday`, `tuesday`, etc.: Hour strings (e.g., "8h00 - 18h00")

## URL Structure

Each StopDesk is accessible via: `stopdesk.info/{uid}`

Examples:
- `stopdesk.info/demo-stopdesk-001`
- `stopdesk.info/paris-central-002`
- `stopdesk.info/lyon-bellecour-003`

## Adding New StopDesks

To add a new StopDesk location:

1. Create a new document in the `StopDesk` collection
2. Use a unique UID as the document ID
3. Include required fields: `address`, `phoneNumbers`, `googleMapsLink`
4. The new location will be automatically accessible at `stopdesk.info/{uid}`

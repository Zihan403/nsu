# Cloudinary Setup Guide

## Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up for a free account
3. Go to your **Dashboard** and note:
   - **Cloud Name** (e.g., `di1234abc`)
   - **API Key** (e.g., `123456789`)

## Step 2: Create Upload Preset (No Authentication)
1. Go to **Settings** → **Upload**
2. Scroll to **Upload presets** section
3. Click **Add upload preset**
4. Set:
   - **Name**: `nsu_alumni_photos`
   - **Signing Mode**: `Unsigned` (allows uploads without backend)
5. Click **Save**

## Step 3: Add Environment Variables
Create or update `.env.local` in your `nsu-alumni` folder:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
```

Replace `your_cloud_name_here` with your actual Cloud Name from the Dashboard.

## Step 4: Test It Out
1. Run `npm run dev`
2. Go to Profile page
3. Click "Choose Photo"
4. Select an image
5. Photo should upload and display immediately
6. Click "Save Changes"
7. Profile will update with the photo URL saved to Firebase

## What's Happening?
- **Photo Upload**: Via Cloudinary (their secure servers)
- **Profile Data**: Via Firebase (your existing setup)
- **Photo Preview**: Stored in React state while editing
- **Final Save**: Photo URL + text fields all saved to Firestore at once

No Firebase Storage bucket needed! 🎉

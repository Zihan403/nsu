# NSU Alumni Network

This repository contains a Next.js application for the NSU Alumni Network platform.

## Project Structure

- `nsu-alumni/` - Main Next.js application
- `utils/` - Shared utility files (legacy Firebase config)

## Quick Start

1. **Navigate to the project directory:**
   ```bash
   cd nsu-alumni
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Firebase configuration values in `.env.local`

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Firebase
- **Build Tool:** Turbopack (Next.js default)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

The application uses the following environment variables (add to `.env.local`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Development Notes

- Firebase configuration is loaded from environment variables (see `lib/firebaseConfig.js`)
- Tailwind CSS is configured with custom content paths in `tailwind.config.cjs`
- The app uses the Next.js App Router architecture

## Getting Started with Development

1. Make sure Node.js 18+ is installed
2. Follow the Quick Start steps above
3. Start building components in the `app/` directory
4. Import Firebase services from `lib/firebaseConfig.js` as needed

---

Created with ❤️ for the NSU community
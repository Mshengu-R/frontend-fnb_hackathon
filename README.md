# Lets Learn

Lets Learn is a React Native student-support app for South African learners. It brings together practical guidance for NSFAS and bursary applications, monthly cost planning, student wellbeing, study habits, and accessible low-data learning.

The app uses the Express backend for JWT sign-in, account creation, profile updates, account deletion and AI chat. Chat messages are sent to `POST /api/v1/ai/chat` with the signed-in user's bearer token; the backend determines the user's customer role and configured AI model. Checklists, mood check-ins, and budget inputs remain local to the running app.

## Run on Windows

Open PowerShell or the VS Code terminal in this folder. The `.cmd` suffix avoids PowerShell execution-policy blocks on Windows:

```powershell
npm.cmd install
npm.cmd run web
```

By default, API requests use `http://localhost:5500`. Start the backend from `..\backend` with its configured PostgreSQL database and development environment. To use a different backend, set `EXPO_PUBLIC_API_URL` in a frontend `.env` file, for example `EXPO_PUBLIC_API_URL=http://localhost:5500`.

For Android emulators, use `EXPO_PUBLIC_API_URL=http://10.0.2.2:<port>` because emulator `localhost` points to the emulator itself. For a physical device, use the computer's LAN IP and ensure both devices share a network. Do not use a public or production endpoint over plain HTTP.

To run on a device, start the development server with `npx.cmd expo start`, then scan the QR code with Expo Go. Android Studio and Xcode simulator commands are also available as `npm.cmd run android` and `npm.cmd run ios`.

Native builds use Expo SecureStore for the JWT session. On web, the session uses browser local storage; deploy web over HTTPS and avoid shared devices.

## App structure

- `src/app/(tabs)/index.tsx` — home dashboard and student journey checklist
- `src/app/(tabs)/explore.tsx` — funding, bursary, budget, wellbeing, study, and accessible-learning guidance
- `src/app/(tabs)/profile.tsx` — profile read, update, delete, and sign-out
- `src/app/login.tsx` and `src/app/signup.tsx` — JWT authentication screens
- `src/app/privacy.tsx` — draft privacy and data policy
- `src/app/chat.tsx` — chatbot-ready screen (provider integration pending)
- `src/auth/` and `src/services/api.ts` — authentication state and backend client
- `src/app/_layout.tsx` — authentication-aware app navigation
- `src/components/app-tabs.web.tsx` and `src/components/app-tabs.tsx` — web and native navigation

## Verify the frontend

```powershell
npx.cmd tsc --noEmit
npx.cmd expo export --platform web
```

Funding information is general guidance, not an eligibility decision. Confirm current requirements and deadlines with NSFAS, the relevant funder, or your institution.

The privacy screen is clearly marked as a draft; add your organisation, privacy contact and retention details and have it reviewed before collecting real student data.

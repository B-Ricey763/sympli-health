
# Sympli
**🥉 3RD PLACE WINNER FOR GENERATIVE AI TRACK FOR HACKYLITICS 2025 🌍 AND CREATED IN 36 HOURS ⌛**


## Description
Sympli is a web platform reshaping symptom reporting and chronic disease management by collecting real-time data, using Gemini 2.0 prompts, and generating visual reports to enhance patient care.

- [Try it out yourself!](https://sympli-health.web.app/landing)
- [Read the Devpost Submission](https://devpost.com/software/sympli)
- [Watch the YouTube Demo Video](https://youtu.be/N_uCOOGWHF4)


## Quickstart
Clone the repository, and make sure you are in the root directory. Run `npm i` to get the root dependencies, then run:
```bash
npm run install:all
```
To get the dependencies for both the frontend and backend. 

> NOTE: you will have to create a `.env.development` file in `frontend` with your backend url and firebase credentials (see `frontend/.env.example`) and configure your Gemini key in the backend (also see `backend/.env.example`)

Once your Firebase and GCP project are properly configured, you need to run `gcloud auth application-default login` to make test firebase on the backend. 

Now, you should be able to run `npm run dev` to run both the dev frontend and backend. Visit localhost and see your project!

## Tech Stack
- Frontend:
  - React + TypeScript for building the UI components
  - shadcn/ui for pre-built accessible components
  - Tailwind CSS for styling and responsive design
  - Recharts for data visualization and interactive charts
  - React Router for client-side routing
  - Lucide React for modern icon components
- Backend:
  - TypeScript + NodeJS for type-safe server implementation
  - Google Cloud Run Functions for serverless backend endpoints
  - Firebase services:
    - Authentication for Google sign-in
    - Firestore for real-time data storage
    - Hosting for frontend deployment
- AI/ML:
  - Gemini 2.0 Flash for intelligent chatbot functionality
  - Natural language processing for symptom analysis
- Development:
  - Vite for fast development and building
  - Environment variable management for secure configuration

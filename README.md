# Sympli
_Created in 1.5 days for Hackylitics 2025_

## Description
Sympli is a web platform reshaping symptom reporting and chronic disease management by collecting real-time data, using Gemini 2.0 prompts, and generating visual reports to enhance patient care.

See the [devpost here](https://devpost.com/software/sympli). 

Also, watch the [YouTube Demo Video](https://youtu.be/N_uCOOGWHF4). 


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
- Firebase for google auth, firestore, and frontend hosting
- Google Cloud Run Functions for backend endpoints
- Gemini 2.0 Flash for chatbot functionality
- Frontend: React + shadcn/ui + tailwindcss, and React Router
- Backend: Typescript + NodeJS 


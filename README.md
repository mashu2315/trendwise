TrendWise
TrendWise is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that crawls trending topics from Google Trends, generates SEO-optimized articles using Google’s Gemini AI, and allows users to log in via Google authentication to comment on articles. The application features a responsive frontend, secure authentication with Firebase, and dynamic media embedding (images, YouTube videos, tweets) in articles.
Features

Trend Crawling: Fetches the top 5 trending topics from Google Trends RSS feed.
Article Generation: Uses Gemini AI to generate 500-word SEO-optimized articles with embedded media (images, YouTube videos, tweets).
Authentication: Supports Google Sign-In via Firebase for user authentication.
Commenting System: Authenticated users can post comments on articles, stored in MongoDB.
SEO Optimization: Includes meta tags and sitemap for improved search engine visibility.
Responsive UI: Built with React and Tailwind CSS for a modern, user-friendly interface.

Tech Stack

Frontend: React, React Router, Tailwind CSS, react-spinners, react-helmet-async
Backend: Node.js, Express.js
Database: MongoDB
Authentication: Firebase Authentication (Google Sign-In)
AI: Google Generative AI (Gemini 2.5 Flash)
Crawling: Axios, Cheerio
Deployment: Vercel

Prerequisites

Node.js (v16 or higher)
MongoDB Atlas account
Firebase project with Google Sign-In enabled
Google Cloud account with Gemini API key
Postman (for testing API endpoints)
Vercel account (for deployment)

Installation

Clone the Repository:
git clone <repository-url>
cd trendwise


Set Up Backend:

Navigate to the backend directory:cd backend


Install dependencies:npm install


Create a .env file in the backend directory:MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/trendwise?retryWrites=true&w=majority
GEMINI_API_KEY=your-gemini-api-key
FIREBASE_SERVICE_ACCOUNT=your-firebase-service-account-json
FRONTEND_URL=http://localhost:5173
PORT=5000


Replace MONGODB_URI, GEMINI_API_KEY, and FIREBASE_SERVICE_ACCOUNT with your credentials.


Set Up Frontend:

Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Create a .env file in the frontend directory:VITE_API_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5173
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your-app-id


Replace Firebase credentials with those from your Firebase Console.


Configure Firebase:

Go to Firebase Console > Authentication > Sign-in method.
Enable Google Sign-In.
Add localhost to Authorized Domains in Authentication > Settings.



Running the Application

Start the Backend:
cd backend
npm start


The server will run on http://localhost:5000.
Confirm Server running on port 5000 and MongoDB connected in the console.


Start the Frontend:
cd frontend
npm run dev


The app will run on http://localhost:5173.


Access the Application:

Open http://localhost:5173 in a browser.
Navigate to the homepage to view trending articles.
Use the login page (/login) to sign in with Google.
View an article (/article/:slug) and post comments (requires login).



Testing with Postman
To authenticate and obtain a Firebase ID token for commenting via Postman:

Get a Google Access Token:

Visit Google OAuth 2.0 Playground.
Select scopes: https://www.googleapis.com/auth/userinfo.email, https://www.googleapis.com/auth/userinfo.profile.
Authorize and exchange for an access token.


Sign In with Firebase REST API:

Endpoint: POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key={YOUR_FIREBASE_API_KEY}
Headers:Content-Type: application/json


Body:{
  "postBody": "access_token={YOUR_GOOGLE_ACCESS_TOKEN}&providerId=google.com",
  "requestUri": "http://localhost:5173",
  "returnIdpCredential": true,
  "returnSecureToken": true
}


Response: Copy the idToken from the response.


Save User Data:

Endpoint: POST http://localhost:5000/api/users
Headers:Content-Type: application/json
Authorization: Bearer {YOUR_ID_TOKEN}


Body:{
  "token": "{YOUR_ID_TOKEN}"
}


Response: Confirm user data is saved in MongoDB.


Post a Comment:

Endpoint: POST http://localhost:5000/api/comments
Headers:Content-Type: application/json
Authorization: Bearer {YOUR_ID_TOKEN}


Body:{
  "articleId": "6863747e2b866c0c672c70b1",
  "content": "Test comment from Postman"
}


Replace articleId with a valid ID from the articles collection.
Response: Verify the comment is saved in MongoDB.



Key Components

Crawling Trends (backend/crawlTrends.js):

Fetches top 5 trends from Google Trends RSS feed using Axios and Cheerio.
Example output: [{ title: "Trend Title", link: "https://..." }, ...].


Article Generation (backend/generateArticle.js):

Uses Gemini AI to generate 500-word SEO-optimized articles.
Includes embeddable media (images, YouTube videos, tweets) with validation for valid URLs.
Output format:{
  "title": "Trend Title",
  "meta": { "description": "...", "ogTitle": "...", "ogImage": "..." },
  "media": [
    { "type": "image", "url": "https://example.com/image.jpg" },
    { "type": "youtube", "url": "https://www.youtube.com/embed/video_id" },
    { "type": "tweet", "url": "https://x.com/username/status/123456789" }
  ],
  "content": "<h1>...</h1><p>...</p>"
}




Homepage (frontend/src/pages/HomePage.jsx):

Displays a list of articles fetched from the backend.
Uses RotateLoader from react-spinners for loading state.


Login Page (frontend/src/pages/LoginPage.jsx):

Implements Google Sign-In using Firebase Authentication.
Saves user data to MongoDB via POST /api/users.


Article Page (frontend/src/pages/ArticlePage.jsx):

Renders article content with embedded media (images via <img>, YouTube videos via <iframe>, tweet links).
Includes a comment section for authenticated users.



Deployment

Deploy Backend to Vercel:
cd backend
vercel --prod


Add environment variables in Vercel dashboard (same as backend/.env).


Deploy Frontend to Vercel:
cd frontend
vercel --prod


Add environment variables in Vercel dashboard (same as frontend/.env).


Update Environment Variables:

Replace localhost URLs with Vercel URLs in .env files.
Example:VITE_API_URL=https://your-backend-url.vercel.app
VITE_FRONTEND_URL=https://your-frontend-url.vercel.app





Debugging

Media Links Not Rendering:

Check the media array in MongoDB articles collection.
Verify URLs are valid (e.g., image URLs end in .jpg/.png, YouTube URLs use /embed/, tweet URLs start with https://x.com/).
Ensure ArticlePage.jsx renders media correctly with <img>, <iframe>, or tweet embed scripts.


Authentication Issues:

Verify Firebase configuration in frontend/.env and Firebase Console.
Check console logs for errors (e.g., auth/popup-closed-by-user).
Test Postman authentication as described above.


Article Fetching:

Ensure GET /api/articles returns valid data.
Check MongoDB articles collection for stored articles.



Submission

GitHub Repository: Push all changes to your GitHub repository.
Share Links: Submit the GitHub repository URL and Vercel deployment URLs via Internshala.
Logs: Include any relevant logs (e.g., Firebase errors, Postman responses) if issues persist.

License
MIT License. See LICENSE file for details.
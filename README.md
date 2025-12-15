# Sip My Vibe - AI Beverage Generator

An interactive web application that uses AI to generate personalized drink recommendations based on a fun personality quiz.

## Getting Started

Follow these steps to set up and run the project locally:

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables.
# Copy .env.example to .env and add your OpenAI API key
cp .env.example .env
# Then edit .env and add your VITE_OPENAI_API_KEY

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Configuration

Create a `.env` file in the project root with the following variables:

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```


## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

You can deploy this project to any static hosting service like Vercel, Netlify, or GitHub Pages.

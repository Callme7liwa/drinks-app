import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from '@/components/LoginScreen';
import LandingScreen from '@/components/LandingScreen';
import QuizWizard from '@/components/QuizWizard';
import MixingScreen from '@/components/MixingScreen';
import ResultsScreen from '@/components/ResultsScreen';
import { QuizAnswer } from '@/lib/quiz-data';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AppState = 'login' | 'landing' | 'quiz' | 'mixing' | 'results';

export interface DrinkResult {
  drinkName: string;
  description: string;
  imageUrl: string;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? 'landing' : 'login';
  });
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [result, setResult] = useState<DrinkResult | null>(null);
  
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';

  const handleLoginSuccess = () => {
    setAppState('landing');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setAnswers({});
    setResult(null);
    setAppState('login');
  };

  const handleStartQuiz = () => {
    setAppState('quiz');
  };

  const handleQuizComplete = async (quizAnswers: QuizAnswer) => {
    setAnswers(quizAnswers);
    setAppState('mixing');
    
    // Generate drink with AI
    try {
      const drinkResult = await generateDrink(quizAnswers, apiKey);
      setResult(drinkResult);
      setAppState('results');
    } catch (error) {
      console.error('Error generating drink:', error);
      // Fallback result
      setResult({
        drinkName: "The Mystery Mixer",
        description: "A delightful surprise that matches your unique vibe! This drink combines unexpected flavors that somehow work perfectly together, just like you.",
        imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop"
      });
      setAppState('results');
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setResult(null);
    setAppState('landing');
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {appState === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {appState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <LandingScreen onStart={handleStartQuiz} />
          </motion.div>
        )}

        {appState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <QuizWizard onComplete={handleQuizComplete} onBack={() => setAppState('landing')} onLogout={handleLogout} />
          </motion.div>
        )}

        {appState === 'mixing' && (
          <motion.div
            key="mixing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <MixingScreen />
          </motion.div>
        )}

        {appState === 'results' && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsScreen result={result} onStartOver={handleStartOver} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

async function generateDrink(answers: QuizAnswer, apiKey: string): Promise<DrinkResult> {
  if (!apiKey) {
    // Return mock data if no API key
    return {
      drinkName: "The Cosmic Sipper",
      description: "Based on your unique vibe, we've concocted the perfect drink! This refreshing creation captures your essence with a blend of bold flavors and smooth finish.",
      imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop"
    };
  }

  const prompt = `You are a playful, witty bartender. Based on these details about a person, invent a unique beverage (can be real or completely made up) and give it a creative name:

Age Group: ${answers.ageGroup}
Gender: ${answers.gender}
Region: ${answers.region}
Setting: ${answers.setting}
Time of Day: ${answers.timeOfDay}
Budget: ${answers.budget}
Allergies: ${answers.allergies}

Respond in JSON format with:
- "drinkName": A creative, fun name for the drink
- "description": A witty 2-3 sentence description of why this drink matches their vibe
- "dallePrompt": A detailed prompt for DALL-E to create a Pixar-style 3D cartoon of a ${answers.gender === 'male' ? 'man' : answers.gender === 'female' ? 'woman' : 'person'} aged ${answers.ageGroup} holding this specific drink in a ${answers.setting} setting. Make it colorful and fun.`;

  try {
    // First, get drink details
    const textResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a creative bartender. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    if (!textResponse.ok) {
      throw new Error('Failed to generate drink details');
    }

    const textData = await textResponse.json();
    const drinkInfo = JSON.parse(textData.choices[0].message.content);

    // Then, generate image with DALL-E
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: drinkInfo.dallePrompt || `Pixar-style 3D cartoon of a person holding a colorful drink called "${drinkInfo.drinkName}" in a fun, vibrant setting`,
        n: 1,
        size: '1024x1024',
      }),
    });

    if (!imageResponse.ok) {
      // If image fails, still return the text with a fallback image
      return {
        drinkName: drinkInfo.drinkName,
        description: drinkInfo.description,
        imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop"
      };
    }

    const imageData = await imageResponse.json();

    return {
      drinkName: drinkInfo.drinkName,
      description: drinkInfo.description,
      imageUrl: imageData.data[0].url
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export default Index;

export type QuizAnswer = {
  ageGroup: string;
  gender: string;
  region: string;
  setting: string;
  timeOfDay: string;
  budget: string;
  allergies: string;
};

export const quizQuestions = [
  {
    id: 'ageGroup',
    question: 'How many candles on your birthday cake? 🎂',
    options: [
      { value: '0-10', label: '0-10', emoji: '👶' },
      { value: '11-15', label: '11-15', emoji: '🧒' },
      { value: '16-20', label: '16-20', emoji: '🧑' },
      { value: '21-25', label: '21-25', emoji: '🎉' },
      { value: '26-45', label: '26-45', emoji: '💼' },
      { value: '46-65', label: '46-65', emoji: '🌟' },
      { value: '66-85', label: '66-85', emoji: '🎭' },
      { value: '85+', label: '85+', emoji: '👑' },
    ],
  },
  {
    id: 'gender',
    question: 'What\'s your vibe? ✨',
    options: [
      { value: 'male', label: 'Male', emoji: '🧔' },
      { value: 'female', label: 'Female', emoji: '👩' },
      { value: 'na', label: 'N/A', emoji: '🌈' },
    ],
  },
  {
    id: 'region',
    question: 'Where do you call home? 🏠',
    options: [
      { value: 'us-east', label: 'US East', emoji: '🗽' },
      { value: 'us-west', label: 'US West', emoji: '🌴' },
      { value: 'us-south', label: 'US South', emoji: '🤠' },
      { value: 'us-midwest', label: 'US Midwest', emoji: '🌾' },
      { value: 'international', label: 'International', emoji: '🌍' },
    ],
  },
  {
    id: 'setting',
    question: 'What\'s outside your window? 🪟',
    options: [
      { value: 'city', label: 'City', emoji: '🏙️' },
      { value: 'suburb', label: 'Suburb', emoji: '🏡' },
      { value: 'rural', label: 'Rural', emoji: '🌲' },
      { value: 'beach', label: 'Beach/Nautical', emoji: '🏖️' },
    ],
  },
  {
    id: 'timeOfDay',
    question: 'When are you sipping? ⏰',
    options: [
      { value: 'morning', label: 'Morning', emoji: '🌅' },
      { value: 'afternoon', label: 'Afternoon', emoji: '☀️' },
      { value: 'evening', label: 'Evening', emoji: '🌇' },
      { value: 'latenight', label: 'Late Night', emoji: '🌙' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s the damage? 💸',
    options: [
      { value: '$', label: '$', emoji: '🪙' },
      { value: '$$', label: '$$', emoji: '💵' },
      { value: '$$$', label: '$$$', emoji: '💎' },
      { value: '$$$$', label: '$$$$', emoji: '👑' },
    ],
  },
  {
    id: 'allergies',
    question: 'Any no-go zones? 🚫',
    options: [
      { value: 'none', label: 'None', emoji: '✅' },
      { value: 'dairy', label: 'Dairy', emoji: '🥛' },
      { value: 'nuts', label: 'Nuts', emoji: '🥜' },
      { value: 'gluten', label: 'Gluten', emoji: '🌾' },
      { value: 'multiple', label: 'Multiple', emoji: '⚠️' },
    ],
  },
] as const;

export const loadingMessages = [
  "Distilling your personality...",
  "Consulting the spirits...",
  "Crushing some ice...",
  "Shaking things up...",
  "Adding a splash of magic...",
  "Reading your aura...",
  "Mixing the perfect blend...",
  "Garnishing with flair...",
];

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  reward: string;
  participantsCount: number;
  daysLeft: number;
  providerName: string;
  tags: string[];
}

interface ChallengesState {
  challenges: Challenge[];
  selectedCategory: string;
  searchQuery: string;
  currentChallenge: Challenge | null;
}

const initialChallenges: Challenge[] = [
  {
    id: 'ch-1',
    title: 'AI Smart Waste Management System',
    description: 'Design and prototype an automated IoT and AI system for sorting recyclable waste at urban community collection hubs.',
    category: 'AI & IoT',
    difficulty: 'Advanced',
    reward: '$5,000',
    participantsCount: 42,
    daysLeft: 12,
    providerName: 'EcoTech Innovations',
    tags: ['AI', 'Computer Vision', 'Sustainability', 'IoT'],
  },
  {
    id: 'ch-2',
    title: 'Mobile Telemedicine for Rural Clinics',
    description: 'Develop an offline-first mobile app that enables community healthcare workers to conduct patient triage and diagnosis.',
    category: 'Healthcare',
    difficulty: 'Intermediate',
    reward: '$3,500',
    participantsCount: 28,
    daysLeft: 18,
    providerName: 'Global Health Network',
    tags: ['React Native', 'Healthcare', 'Offline-First'],
  },
  {
    id: 'ch-3',
    title: 'Next-Gen Educational Gamification',
    description: 'Create an engaging math and science interactive module designed for high school students in STEM programs.',
    category: 'Education',
    difficulty: 'Beginner',
    reward: '$2,000',
    participantsCount: 56,
    daysLeft: 7,
    providerName: 'EdVenture Labs',
    tags: ['Gamification', 'STEM', 'UI/UX'],
  },
];

const initialState: ChallengesState = {
  challenges: initialChallenges,
  selectedCategory: 'All',
  searchQuery: '',
  currentChallenge: null,
};

export const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentChallenge: (state, action: PayloadAction<Challenge | null>) => {
      state.currentChallenge = action.payload;
    },
  },
});

export const { setSelectedCategory, setSearchQuery, setCurrentChallenge } =
  challengesSlice.actions;

export default challengesSlice.reducer;

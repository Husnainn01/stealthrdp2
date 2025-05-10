import { Activity } from '@/components/sections/RecentActivityFeed';

// Function to generate a random time within the last 60 minutes
const getRandomRecentTime = (): string => {
  const minutes = Math.floor(Math.random() * 60) + 1;
  return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
};

// Sample names
const names = [
  'Ryan S.', 'Jamie T.', 'Alex M.', 'Emma R.', 'Michael K.',
  'Sarah L.', 'David W.', 'Sophia G.', 'Daniel P.', 'Olivia C.'
];

// Sample actions for each icon type
const actions = {
  server: [
    'deployed a Silver plan',
    'deployed a Gold plan',
    'deployed a Custom plan',
    'scaled their server resources',
    'added a new server instance'
  ],
  repeat: [
    'renewed for 12 months',
    'renewed for 6 months',
    'upgraded their plan',
    'extended their subscription',
    'renewed their annual plan'
  ],
  payment: [
    'completed their payment',
    'subscribed to premium support',
    'purchased additional storage',
    'added backup services',
    'upgraded to business tier'
  ]
};

// Icon colors
const iconColors = ['electric', 'cyber'];

// Generate a random activity
const generateRandomActivity = (): Activity => {
  const iconTypes = Object.keys(actions);
  const iconType = iconTypes[Math.floor(Math.random() * iconTypes.length)] as 'server' | 'repeat' | 'payment';
  const iconColor = iconColors[Math.floor(Math.random() * iconColors.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const action = actions[iconType][Math.floor(Math.random() * actions[iconType].length)];
  const time = getRandomRecentTime();

  return {
    icon: iconType,
    iconColor,
    name,
    action,
    time
  };
};

// Generate a list of random activities
export const generateRecentActivities = (count: number = 3): Activity[] => {
  return Array.from({ length: count }, () => generateRandomActivity());
};

// Fixed list of activities for development and testing
export const sampleRecentActivities: Activity[] = [
  {
    icon: 'server',
    iconColor: 'electric',
    name: 'Ryan S.',
    action: 'deployed a Silver plan',
    time: '3 minutes ago'
  },
  {
    icon: 'repeat',
    iconColor: 'cyber',
    name: 'Jamie T.',
    action: 'renewed for 12 months',
    time: '17 minutes ago'
  },
  {
    icon: 'server',
    iconColor: 'electric',
    name: 'Alex M.',
    action: 'deployed a Custom plan',
    time: '25 minutes ago'
  },
  {
    icon: 'payment',
    iconColor: 'cyber',
    name: 'Emma R.',
    action: 'upgraded to business tier',
    time: '32 minutes ago'
  }
]; 
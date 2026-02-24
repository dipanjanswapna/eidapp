export type NGLUser = {
  username: string;
  pin: string; // Plain text for prototype
  name: string;
  gender: 'male' | 'female' | 'other';
  profession: string;
  createdAt: Date;
};

export type NGLMessage = {
  id: string;
  receiverUsername: string;
  senderTag: string;
  message: string;
  isReplied: boolean;
  reply?: string;
  createdAt: Date;
};

export type EidCard = {
  id: string;
  recipientName: string;
  message: string;
  theme: 'royal-blue' | 'bright-red' | 'golden-yellow';
  bkashNumber?: string;
  nagadNumber?: string;
  rocketNumber?: string;
  targetAmount?: number;
  isPaid?: boolean;
  createdAt: Date;
};

export const foodTypes = ['kacchi-biryani', 'tehari', 'khichuri', 'polao-korma', 'beef-roti', 'chicken-biryani', 'mutton', 'haleem-jilapi', 'mixed-iftar', 'sehri-thali', 'others'] as const;
export type FoodType = typeof foodTypes[number];

export type IftarSpot = {
  id: string;
  masjidName: string;
  area: string;
  foodType: FoodType;
  otherFoodTypeName?: string;
  latitude: number;
  longitude: number;
  likes: number;
  dislikes: number;
  createdAt: Date;
};

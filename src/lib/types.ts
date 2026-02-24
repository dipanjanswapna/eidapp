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
  createdAt: Date;
}

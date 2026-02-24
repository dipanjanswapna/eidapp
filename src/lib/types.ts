export type SalamiProfile = {
  id: string;
  slug: string;
  userName: string;
  salamiMessage: string;
  cardTheme: 'Funny' | 'Cute' | 'Traditional';
  bkashNumber?: string;
  nagadNumber?: string;
  createdAt: Date;
};

export type Wish = {
  id: string;
  slug: string;
  author: string;
  message: string;
  createdAt: Date;
};

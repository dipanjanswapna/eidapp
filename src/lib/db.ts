import type { SalamiProfile, Wish } from './types';

// In-memory store
const profiles: SalamiProfile[] = [
    {
        id: '1',
        slug: 'example-anik',
        userName: 'Anik',
        salamiMessage: 'বড় হয়েছি মানে এই নয় যে সালামি পাবো না!',
        cardTheme: 'Funny',
        bkashNumber: '01700000000',
        nagadNumber: '01800000000',
        createdAt: new Date(),
    }
];
const wishes: Record<string, Wish[]> = {
    'example-anik': [
        { id: '1', slug: 'example-anik', author: 'Boro Bhai', message: 'Ei ne, eid er jonne.', createdAt: new Date(Date.now() - 1000 * 60 * 5) },
        { id: '2', slug: 'example-anik', author: 'Apu', message: 'Happy Eid!', createdAt: new Date(Date.now() - 1000 * 60 * 2) },
    ]
};

let profileIdCounter = profiles.length + 1;
let wishIdCounter = 3;

export async function addProfile(profileData: Omit<SalamiProfile, 'id' | 'createdAt'>): Promise<SalamiProfile> {
  const newProfile: SalamiProfile = {
    ...profileData,
    id: String(profileIdCounter++),
    createdAt: new Date(),
  };
  profiles.push(newProfile);
  return newProfile;
}

export async function getProfileBySlug(slug: string): Promise<SalamiProfile | undefined> {
  return profiles.find((p) => p.slug === slug);
}

export async function addWish(slug: string, wishData: Omit<Wish, 'id'|'slug'|'createdAt'>): Promise<Wish> {
  if (!wishes[slug]) {
    wishes[slug] = [];
  }
  const newWish: Wish = {
    ...wishData,
    id: String(wishIdCounter++),
    slug,
    createdAt: new Date(),
  };
  wishes[slug].push(newWish);
  return newWish;
}

export async function getWishesBySlug(slug: string): Promise<Wish[]> {
  return (wishes[slug] || []).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
}

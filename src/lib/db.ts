import type { SalamiProfile, Wish, NGLUser, NGLMessage } from './types';

// In-memory store for Salami profiles and wishes
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

// In-memory store for NGL (Anonymous Messaging)
const nglUsers: NGLUser[] = [];
const nglMessages: NGLMessage[] = [];
let nglMessageIdCounter = 1;

export async function findNGLUserByUsername(username: string): Promise<NGLUser | undefined> {
    return nglUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
}

export async function addNGLUser(userData: Omit<NGLUser, 'createdAt'>): Promise<NGLUser> {
    const existingUser = await findNGLUserByUsername(userData.username);
    if(existingUser) {
        throw new Error('Username already exists. Please choose another one.');
    }
    const newUser: NGLUser = {
        ...userData,
        createdAt: new Date(),
    };
    nglUsers.push(newUser);
    return newUser;
}

export async function verifyNGLUserPin(username: string, pin: string): Promise<NGLUser | null> {
    const user = await findNGLUserByUsername(username);
    if (user && user.pin === pin) {
        return user;
    }
    return null;
}

export async function addNGLMessage(receiverUsername: string, messageData: { senderTag: string, message: string }): Promise<NGLMessage> {
    const user = await findNGLUserByUsername(receiverUsername);
    if (!user) {
        throw new Error('User not found.');
    }
    const newMessage: NGLMessage = {
        ...messageData,
        id: String(nglMessageIdCounter++),
        receiverUsername,
        isReplied: false,
        createdAt: new Date(),
    };
    nglMessages.push(newMessage);
    return newMessage;
}

export async function getNGLMessagesByUsername(username: string): Promise<NGLMessage[]> {
    return nglMessages
        .filter(m => m.receiverUsername.toLowerCase() === username.toLowerCase())
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function addReplyToNGLMessage(messageId: string, reply: string): Promise<NGLMessage> {
    const messageIndex = nglMessages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) {
        throw new Error('Message not found.');
    }
    nglMessages[messageIndex].reply = reply;
    nglMessages[messageIndex].isReplied = true;
    return nglMessages[messageIndex];
}

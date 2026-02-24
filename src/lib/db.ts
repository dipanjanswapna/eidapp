import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
    getFirestore, 
    collection, 
    doc, 
    addDoc, 
    setDoc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    updateDoc,
    serverTimestamp,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import type { SalamiProfile, Wish, NGLUser, NGLMessage } from './types';

// This config is used for server-side actions
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Helper to convert Firestore timestamps to Date objects in nested objects/arrays
const convertTimestamps = (data: any): any => {
    if (data instanceof Timestamp) {
        return data.toDate();
    }
    if (Array.isArray(data)) {
        return data.map(convertTimestamps);
    }
    if (typeof data === 'object' && data !== null) {
        const newObj: { [key: string]: any } = {};
        for (const key in data) {
            newObj[key] = convertTimestamps(data[key]);
        }
        return newObj;
    }
    return data;
};


export async function addProfile(profileData: Omit<SalamiProfile, 'id' | 'createdAt'>): Promise<SalamiProfile> {
  const newProfileData = {
    ...profileData,
    createdAt: serverTimestamp(),
  };
  const docRef = doc(db, 'profiles', profileData.slug);
  await setDoc(docRef, newProfileData);
  return {
    ...profileData,
    id: docRef.id,
    createdAt: new Date(), // Return a local date for immediate use
  };
}

export async function getProfileBySlug(slug: string): Promise<SalamiProfile | undefined> {
  const docRef = doc(db, 'profiles', slug);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    // Pass the whole document data to convertTimestamps
    return convertTimestamps({ id: docSnap.id, ...data }) as SalamiProfile;
  }
  return undefined;
}

export async function addWish(slug: string, wishData: Omit<Wish, 'id'|'slug'|'createdAt'>): Promise<Wish> {
  const wishesCollection = collection(db, 'profiles', slug, 'wishes');
  const newWishData = {
    ...wishData,
    slug,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(wishesCollection, newWishData);
  return {
    ...wishData,
    id: docRef.id,
    slug,
    createdAt: new Date(),
  };
}

export async function getWishesBySlug(slug: string): Promise<Wish[]> {
  const wishesCollection = collection(db, 'profiles', slug, 'wishes');
  const q = query(wishesCollection, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }) as Wish);
}

// NGL (Anonymous Messaging)
export async function findNGLUserByUsername(username: string): Promise<NGLUser | undefined> {
    const docRef = doc(db, 'ngl_users', username.toLowerCase());
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return convertTimestamps(docSnap.data() as NGLUser);
    }
    return undefined;
}

export async function addNGLUser(userData: Omit<NGLUser, 'createdAt'>): Promise<NGLUser> {
    const lowerCaseUsername = userData.username.toLowerCase();
    const docRef = doc(db, 'ngl_users', lowerCaseUsername);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        throw new Error('Username already exists. Please choose another one.');
    }
    
    const newUserData = {
        ...userData,
        username: lowerCaseUsername, // store lowercase username
        createdAt: serverTimestamp(),
    };
    await setDoc(docRef, newUserData);
    
    return {
        ...userData,
        username: lowerCaseUsername,
        createdAt: new Date(),
    };
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
    const messagesCollection = collection(db, 'ngl_messages');
    const newMessageData = {
        ...messageData,
        receiverUsername: receiverUsername.toLowerCase(),
        isReplied: false,
        reply: '',
        createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(messagesCollection, newMessageData);

    return {
        id: docRef.id,
        receiverUsername: receiverUsername.toLowerCase(),
        isReplied: false,
        createdAt: new Date(),
        ...messageData,
    };
}

export async function getNGLMessagesByUsername(username: string): Promise<NGLMessage[]> {
    const messagesCollection = collection(db, 'ngl_messages');
    const q = query(
        messagesCollection, 
        where('receiverUsername', '==', username.toLowerCase()),
        orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }) as NGLMessage);
}

export async function addReplyToNGLMessage(messageId: string, reply: string): Promise<NGLMessage> {
    const docRef = doc(db, 'ngl_messages', messageId);
    
    await updateDoc(docRef, {
        reply: reply,
        isReplied: true,
    });
    
    const updatedDocSnap = await getDoc(docRef);
    if(!updatedDocSnap.exists()) {
        throw new Error('Message not found after update.');
    }

    return convertTimestamps({ id: updatedDocSnap.id, ...updatedDocSnap.data() }) as NGLMessage;
}

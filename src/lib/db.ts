'use server';
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
    increment,
} from 'firebase/firestore';
import type { NGLUser, NGLMessage, EidCard, IftarSpot, FoodType } from './types';

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
        where('receiverUsername', '==', username.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }) as NGLMessage);

    // Sort messages by creation date in descending order
    messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return messages;
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


// Eid Card
export async function addEidCard(cardData: {
    recipientName: string;
    message: string;
    theme: 'royal-blue' | 'bright-red' | 'golden-yellow';
    bkashNumber?: string;
    nagadNumber?: string;
    rocketNumber?: string;
    targetAmount?: string;
}): Promise<string> {
    const cardsCollection = collection(db, 'eid_cards');
    
    const amount = cardData.targetAmount ? parseInt(cardData.targetAmount, 10) : undefined;
    if (amount !== undefined && (isNaN(amount) || amount < 0)) {
        throw new Error("Invalid target amount.");
    }

    const newCardData = {
        ...cardData,
        targetAmount: amount,
        isPaid: false,
        createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(cardsCollection, newCardData);
    return docRef.id;
}


export async function getEidCardById(cardId: string): Promise<EidCard | null> {
    const docRef = doc(db, 'eid_cards', cardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return convertTimestamps({ id: docSnap.id, ...docSnap.data() }) as EidCard;
    }
    return null;
}

export async function markEidCardAsPaid(cardId: string): Promise<void> {
    const docRef = doc(db, 'eid_cards', cardId);
    await updateDoc(docRef, {
        isPaid: true,
    });
}


// Iftar Spot Finder
const iftarSpotsCollection = collection(db, 'iftar_spots');

export async function addIftarSpot(spotData: Omit<IftarSpot, 'id' | 'createdAt' | 'likes' | 'dislikes'>): Promise<string> {
    const newSpotData = {
        ...spotData,
        likes: 0,
        dislikes: 0,
        createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(iftarSpotsCollection, newSpotData);
    return docRef.id;
}

export async function getIftarSpots(foodType: FoodType | 'all'): Promise<IftarSpot[]> {
    const twentyFourHoursAgo = Timestamp.fromMillis(Date.now() - 24 * 60 * 60 * 1000);
    
    let q;
    if (foodType === 'all') {
        q = query(iftarSpotsCollection, where('createdAt', '>=', twentyFourHoursAgo), orderBy('createdAt', 'desc'));
    } else {
        q = query(iftarSpotsCollection, where('createdAt', '>=', twentyFourHoursAgo), where('foodType', '==', foodType), orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }) as IftarSpot);
}

export async function voteOnSpot(spotId: string, voteType: 'like' | 'dislike'): Promise<void> {
    const docRef = doc(db, 'iftar_spots', spotId);
    if (voteType === 'like') {
        await updateDoc(docRef, { likes: increment(1) });
    } else {
        await updateDoc(docRef, { dislikes: increment(1) });
    }
}

'use server';

import { generateSalamiMessage, GenerateSalamiMessageInput } from "@/ai/flows/generate-salami-message-flow";
import { z } from "zod";
import { addProfile, addWish, addNGLUser, findNGLUserByUsername, verifyNGLUserPin, addNGLMessage, getNGLMessagesByUsername, addReplyToNGLMessage } from "./db";
import { redirect } from "next/navigation";
import type { SalamiProfile, Wish, NGLUser, NGLMessage } from "./types";

const createSalamiSchema = z.object({
  userName: z.string().min(2),
  salamiMessage: z.string().min(5),
  cardTheme: z.enum(['Funny', 'Cute', 'Traditional']),
  bkashNumber: z.string().optional(),
  nagadNumber: z.string().optional(),
});

export async function generateMessageAction(input: GenerateSalamiMessageInput) {
    try {
        const result = await generateSalamiMessage(input);
        return { salamiMessage: result.salamiMessage };
    } catch(error) {
        console.error("AI message generation failed:", error);
        return { error: "Failed to generate message. Please try again."};
    }
}

export async function createSalamiPageAction(values: z.infer<typeof createSalamiSchema>) {
  const validatedFields = createSalamiSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid form data.');
  }

  const { userName, salamiMessage, cardTheme, bkashNumber, nagadNumber } = validatedFields.data;
  
  const slug = `${userName.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString(36)}`;

  const newProfile: Omit<SalamiProfile, 'id' | 'createdAt'> = {
    slug,
    userName,
    salamiMessage,
    cardTheme,
    bkashNumber,
    nagadNumber
  };

  addProfile(newProfile);
  
  redirect(`/salami/${slug}`);
}

const addWishSchema = z.object({
    author: z.string().min(1, 'Name is required.'),
    message: z.string().min(1, 'Message is required.'),
});

export async function addWishAction(slug: string, values: z.infer<typeof addWishSchema>): Promise<Wish> {
    const validatedFields = addWishSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error('Invalid wish data.');
    }

    const { author, message } = validatedFields.data;
    const newWish = await addWish(slug, { author, message });

    return newWish;
}

// NGL Actions
const createNGLProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  username: z.string().min(3, "Username must be at least 3 characters.").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  pin: z.string().min(4, "PIN must be at least 4 digits.").max(6, "PIN can be at most 6 digits."),
  gender: z.enum(['male', 'female', 'other']),
  profession: z.string().min(1, "Profession is required."),
});

export async function createNGLProfileAction(values: z.infer<typeof createNGLProfileSchema>) {
    const validatedFields = createNGLProfileSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }
    
    try {
        await addNGLUser(validatedFields.data);
    } catch(error) {
        return { error: { username: [(error as Error).message] } };
    }
  
    redirect(`/ngl/inbox?username=${validatedFields.data.username}&success=true`);
}

const sendNGLMessageSchema = z.object({
    message: z.string().min(1, "Message cannot be empty."),
    senderTag: z.string(),
});

export async function sendNGLMessageAction(username: string, values: z.infer<typeof sendNGLMessageSchema>) {
    const validatedFields = sendNGLMessageSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid message data.");
    }

    await addNGLMessage(username, validatedFields.data);
}

export async function verifyPinAndGetUserAction(username: string, pin: string): Promise<NGLUser | null> {
    const user = await verifyNGLUserPin(username, pin);
    if (user) {
        // Don't send PIN to client
        const { pin, ...userWithoutPin } = user;
        return userWithoutPin as NGLUser;
    }
    return null;
}

export async function getNGLMessagesAction(username:string, pin: string): Promise<NGLMessage[]> {
    const user = await verifyNGLUserPin(username, pin);
    if (!user) {
        throw new Error("Authentication failed.");
    }
    return await getNGLMessagesByUsername(username);
}

export async function replyToMessageAction(messageId: string, reply: string, username: string, pin: string): Promise<NGLMessage> {
     const user = await verifyNGLUserPin(username, pin);
    if (!user) {
        throw new Error("Authentication failed.");
    }

    if(!reply || reply.trim().length === 0) {
        throw new Error("Reply cannot be empty.");
    }

    return await addReplyToNGLMessage(messageId, reply);
}

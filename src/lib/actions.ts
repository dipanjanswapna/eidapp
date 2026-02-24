'use server';

import { z } from "zod";
import { addNGLUser, verifyNGLUserPin, addNGLMessage, getNGLMessagesByUsername, addReplyToNGLMessage } from "./db";
import { redirect } from "next/navigation";
import type { NGLUser, NGLMessage } from "./types";

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

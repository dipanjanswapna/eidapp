'use server';

import { generateSalamiMessage, GenerateSalamiMessageInput } from "@/ai/flows/generate-salami-message-flow";
import { z } from "zod";
import { addProfile, addWish } from "./db";
import { redirect } from "next/navigation";
import type { SalamiProfile, Wish } from "./types";

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

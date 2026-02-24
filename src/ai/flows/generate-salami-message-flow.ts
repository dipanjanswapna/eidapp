'use server';
/**
 * @fileOverview A Genkit flow for generating creative and humorous 'salami demand' messages.
 *
 * - generateSalamiMessage - A function that handles the generation of salami messages.
 * - GenerateSalamiMessageInput - The input type for the generateSalamiMessage function.
 * - GenerateSalamiMessageOutput - The return type for the generateSalamiMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSalamiMessageInputSchema = z.object({
  userName: z.string().describe("The name of the user requesting 'salami'."),
  targetAudience: z
    .string()
    .optional()
    .describe(
      "An optional description of who the 'salami' is requested from (e.g., 'বড় ভাইদের পকেট ফাঁকা করার মিশন', 'relatives', 'friends')."
    ),
  cardTheme: z
    .enum(['Funny', 'Cute', 'Traditional'])
    .default('Funny')
    .describe(
      "The chosen card theme, influencing the tone of the message. Defaults to 'Funny'."
    ),
  amountDesired: z
    .string()
    .optional()
    .describe('An optional specific amount or a general desire for money.'),
});
export type GenerateSalamiMessageInput = z.infer<
  typeof GenerateSalamiMessageInputSchema
>;

const GenerateSalamiMessageOutputSchema = z.object({
  salamiMessage: z.string().describe('The AI-generated creative and humorous salami message.'),
});
export type GenerateSalamiMessageOutput = z.infer<
  typeof GenerateSalamiMessageOutputSchema
>;

export async function generateSalamiMessage(
  input: GenerateSalamiMessageInput
): Promise<GenerateSalamiMessageOutput> {
  return generateSalamiMessageFlow(input);
}

const salamiMessagePrompt = ai.definePrompt({
  name: 'salamiMessagePrompt',
  input: {schema: GenerateSalamiMessageInputSchema},
  output: {schema: GenerateSalamiMessageOutputSchema},
  prompt: `You are an expert copywriter specializing in creating creative and humorous "Salami" demand messages for social media during Eid.\n\nYour task is to generate a catchy and engaging message that encourages people to send 'Salami' to the user.\n\nUser's Name: {{{userName}}}\n{{#if targetAudience}}Target Audience/From: {{{targetAudience}}}\n{{/if}}{{#if amountDesired}}Desired Salami: {{{amountDesired}}}\n{{/if}}Desired Tone/Card Theme: {{{cardTheme}}}\n\nGenerate a message that is:\n- Creative and humorous.\n- Personalized for "{{{userName}}}".\n- Considers the '{{cardTheme}}' theme, prioritizing humor if the theme is 'Funny'.\n- If a target audience is specified, hint at it in a fun way.\n- If an amount is desired, incorporate it subtly or humorously.\n\nKeep the message concise and impactful for social media sharing.\nOutput only the generated message, without any additional text or formatting.`,
});

const generateSalamiMessageFlow = ai.defineFlow(
  {
    name: 'generateSalamiMessageFlow',
    inputSchema: GenerateSalamiMessageInputSchema,
    outputSchema: GenerateSalamiMessageOutputSchema,
  },
  async (input) => {
    const {output} = await salamiMessagePrompt(input);
    return output!;
  }
);

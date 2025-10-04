'use server';
/**
 * @fileOverview A chatbot flow for answering user queries about their energy usage.
 *
 * - chatbotFlow - A function that handles the chatbot conversation.
 * - ChatbotInput - The input type for the chatbotFlow function.
 * - ChatbotOutput - The return type for the chatbotFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// ✅ Updated schema: added currentDate
const ChatbotInputSchema = z.object({
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
  })).describe("The conversation history."),
  message: z.string().describe('The latest user message.'),
  userDetails: z.string().describe("JSON string of the user's details."),
  transactions: z.string().describe("JSON string of the user's past transactions."),
  currentDate: z.string().describe("The current date in locale string format."), // 👈 added
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

const prompt = ai.definePrompt({
    name: 'chatbotPrompt',
    input: { schema: ChatbotInputSchema },
    output: { schema: ChatbotOutputSchema },
    prompt: `You are a helpful and friendly customer support chatbot for "Microgrid Monitor". Your goal is to answer user questions about their electricity usage, billing, and account details. You can also provide general advice on how to save energy.

    You will be provided with the user's details and their past transaction history in JSON format. Use this information to answer their questions accurately.

    - The current date is {{currentDate}}.
    - All monetary values are in Indian Rupees (₹).
    - Be concise and friendly in your responses.
    - If the user asks a question about their account, billing, or transactions, use the provided JSON data to answer.
    - If the user asks for general advice, like how to reduce energy consumption, provide helpful, actionable tips.
    - If you truly cannot answer a question, politely say that you are unable to help with that specific request.

    USER DETAILS:
    {{userDetails}}

    PAST TRANSACTIONS:
    {{transactions}}

    CONVERSATION HISTORY:
    {{#each history}}
    {{role}}: {{content}}
    {{/each}}

    USER'S LATEST MESSAGE:
    {{message}}

    YOUR RESPONSE:
    `,
});

export const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
        ...input,
        currentDate: new Date().toLocaleDateString('en-IN'),
    });

    return output!;
  }
);

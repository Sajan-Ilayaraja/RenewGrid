'use server';
/**
 * @fileOverview A flow that summarizes energy anomalies detected in the microgrid.
 *
 * - summarizeEnergyAnomalies - A function that summarizes energy anomalies.
 * - SummarizeEnergyAnomaliesInput - The input type for the summarizeEnergyAnomalies function.
 * - SummarizeEnergyAnomaliesOutput - The return type for the summarizeEnergyAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEnergyAnomaliesInputSchema = z.object({
  energyData: z.string().describe('The energy data collected from the microgrid.'),
  anomalies: z.string().describe('The anomalies detected in the energy data.'),
});
export type SummarizeEnergyAnomaliesInput = z.infer<typeof SummarizeEnergyAnomaliesInputSchema>;

const SummarizeEnergyAnomaliesOutputSchema = z.object({
  summary: z.string().describe('A summary of the significant anomalies detected in the microgrid.'),
});
export type SummarizeEnergyAnomaliesOutput = z.infer<typeof SummarizeEnergyAnomaliesOutputSchema>;

export async function summarizeEnergyAnomalies(input: SummarizeEnergyAnomaliesInput): Promise<SummarizeEnergyAnomaliesOutput> {
  return summarizeEnergyAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEnergyAnomaliesPrompt',
  input: {schema: SummarizeEnergyAnomaliesInputSchema},
  output: {schema: SummarizeEnergyAnomaliesOutputSchema},
  prompt: `You are an expert in analyzing energy data and summarizing anomalies.

  You will receive energy data and a list of anomalies detected in the data. Your task is to generate a concise summary of the significant anomalies, explaining their potential impact on the microgrid.

  Energy Data:
  {{energyData}}

  Anomalies:
  {{anomalies}}

  Summary:`,
});

const summarizeEnergyAnomaliesFlow = ai.defineFlow(
  {
    name: 'summarizeEnergyAnomaliesFlow',
    inputSchema: SummarizeEnergyAnomaliesInputSchema,
    outputSchema: SummarizeEnergyAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

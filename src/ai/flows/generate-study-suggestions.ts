'use server';

/**
 * @fileOverview An AI agent that generates personalized study suggestions based on quiz performance.
 *
 * - generateStudySuggestions - A function that generates study suggestions.
 * - GenerateStudySuggestionsInput - The input type for the generateStudySuggestions function.
 * - GenerateStudySuggestionsOutput - The return type for the generateStudySuggestions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateStudySuggestionsInputSchema = z.object({
  quizPerformance: z
    .string()
    .describe('A summary of the user\'s quiz performance, including weak areas.'),
  subject: z.string().describe('The subject of the quiz.'),
  level: z.string().describe('The difficulty level of the quiz.'),
});
export type GenerateStudySuggestionsInput = z.infer<
  typeof GenerateStudySuggestionsInputSchema
>;

const GenerateStudySuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of study suggestions tailored to the user\'s weak areas.'),
});
export type GenerateStudySuggestionsOutput = z.infer<
  typeof GenerateStudySuggestionsOutputSchema
>;

export async function generateStudySuggestions(
  input: GenerateStudySuggestionsInput
): Promise<GenerateStudySuggestionsOutput> {
  return generateStudySuggestionsFlow(input);
}

const refineSearchResults = ai.defineTool({
  name: 'refineSearchResults',
  description: 'Refines search results to generate better study suggestions',
  inputSchema: z.object({
    query: z.string().describe('The original search query'),
  }),
  outputSchema: z.string(),
},
async input => {
  return `These are study suggestions from the search engine for the query: ${input.query}`
});

const prompt = ai.definePrompt({
  name: 'generateStudySuggestionsPrompt',
  tools: [refineSearchResults],
  input: {
    schema: z.object({
      quizPerformance: z
        .string()
        .describe('A summary of the user\'s quiz performance, including weak areas.'),
      subject: z.string().describe('The subject of the quiz.'),
      level: z.string().describe('The difficulty level of the quiz.'),
    }),
  },
  output: {
    schema: z.object({
      suggestions: z
        .string()
        .describe('A list of study suggestions tailored to the user\'s weak areas.'),
    }),
  },
  prompt: `You are a study assistant. Generate personalized study suggestions based on the quiz performance.

Quiz Performance: {{{quizPerformance}}}
Subject: {{{subject}}}
Level: {{{level}}}

Use the refineSearchResults tool to refine the search results for better study suggestions.
Based on the quiz performance, what topics should the student focus on to improve their understanding of the subject?`, 
});

const generateStudySuggestionsFlow = ai.defineFlow<
  typeof GenerateStudySuggestionsInputSchema,
  typeof GenerateStudySuggestionsOutputSchema
>(
  {
    name: 'generateStudySuggestionsFlow',
    inputSchema: GenerateStudySuggestionsInputSchema,
    outputSchema: GenerateStudySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

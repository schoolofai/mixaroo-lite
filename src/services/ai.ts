import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider } from './config.js';

// Song type
export interface Song {
  title: string;
  artist: string;
}

// AI Service interface
export interface AIService {
  generatePlaylist(prompt: string, length: number): Promise<Song[]>;
}

// System prompt for all providers
function getSystemPrompt(length: number): string {
  return `You are a music expert creating playlists. Generate exactly ${length} songs based on the user's request.

IMPORTANT RULES:
1. Return ONLY a JSON array of objects with "title" and "artist" fields
2. No markdown, no explanation, no code blocks - just the raw JSON array
3. Every song must be a REAL song that actually exists
4. Make the playlist diverse but cohesive with the theme
5. Include both popular and some lesser-known tracks
6. Ensure accurate song titles and artist names

Example format:
[{"title":"Bohemian Rhapsody","artist":"Queen"},{"title":"Hotel California","artist":"Eagles"}]`;
}

// Parse AI response robustly
function parseAIResponse(response: string): Song[] {
  // Try to extract JSON from the response
  let jsonStr = response.trim();

  // Remove markdown code blocks if present
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }

  // Try to find JSON array in response
  const arrayMatch = jsonStr.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    jsonStr = arrayMatch[0];
  }

  // Parse JSON
  const parsed = JSON.parse(jsonStr);

  // Validate structure
  if (!Array.isArray(parsed)) {
    throw new Error('Response is not an array');
  }

  // Validate and normalize each song
  const songs: Song[] = parsed.map((item, index) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(`Invalid song at index ${index}`);
    }

    const title = item.title || item.name || item.song;
    const artist = item.artist || item.by || item.performer;

    if (!title || !artist) {
      throw new Error(`Missing title or artist at index ${index}`);
    }

    return {
      title: String(title).trim(),
      artist: String(artist).trim()
    };
  });

  return songs;
}

// OpenAI Provider
class OpenAIProvider implements AIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generatePlaylist(prompt: string, length: number): Promise<Song[]> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: getSystemPrompt(length) },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 4000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    return parseAIResponse(content);
  }
}

// Gemini Provider
class GeminiProvider implements AIService {
  private model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generatePlaylist(prompt: string, length: number): Promise<Song[]> {
    const fullPrompt = `${getSystemPrompt(length)}\n\nUser request: ${prompt}`;
    
    const result = await this.model.generateContent(fullPrompt);
    const response = result.response;
    const content = response.text();

    if (!content) {
      throw new Error('Empty response from Gemini');
    }

    return parseAIResponse(content);
  }
}

// Anthropic Provider
class AnthropicProvider implements AIService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generatePlaylist(prompt: string, length: number): Promise<Song[]> {
    const response = await this.client.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4000,
      system: getSystemPrompt(length),
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    const content = response.content[0];
    if (content.type !== 'text' || !content.text) {
      throw new Error('Empty response from Anthropic');
    }

    return parseAIResponse(content.text);
  }
}

// Factory function
export function getAIService(provider: AIProvider, apiKey: string): AIService {
  switch (provider) {
    case 'openai':
      return new OpenAIProvider(apiKey);
    case 'gemini':
      return new GeminiProvider(apiKey);
    case 'anthropic':
      return new AnthropicProvider(apiKey);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

// Validate API key by making a minimal test request
export async function validateApiKey(provider: AIProvider, apiKey: string): Promise<boolean> {
  try {
    const service = getAIService(provider, apiKey);
    // Make a simple test request
    await service.generatePlaylist('one happy song', 1);
    return true;
  } catch (error) {
    return false;
  }
}

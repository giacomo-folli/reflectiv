/**
 * Mock data for API endpoints during development.
 * This file provides example payloads and responses for each endpoint in the system.
 * All types are imported from the canonical type definitions in $lib/types/api.
 */

import type {
  ProcessChatsRequest,
  ProcessChatsResponse
} from './types/api';

/**
 * Mock request payload for POST /api/process-chats
 */
export const mockProcessChatsRequest: ProcessChatsRequest = {
  urls: [
    'https://chat.openai.com/share/abc123',
    'https://chat.openai.com/share/def456'
  ]
};

/**
 * Mock response for POST /api/process-chats (success)
 */
export const mockProcessChatsResponseOk: ProcessChatsResponse = {
  status: 'ok',
  message: 'Chats processed successfully.'
};

/**
 * Mock response for POST /api/process-chats (error: invalid URLs)
 */
export const mockProcessChatsResponseInvalid: ProcessChatsResponse = {
  status: 'error',
  message: 'Some URLs are invalid.',
  invalidUrls: ['ftp://invalid-url.com', 'notaurl']
};

/**
 * Mock data for GET /api/diary/entries
 */
export const mockDiaryEntriesResponse = {
  entries: [
    {
      id: 1,
      questionId: 101,
      entryText: 'Today I reflected on gratitude and wrote about my family.',
      entryDate: '2025-05-15',
      createdAt: '2025-05-15T08:00:00.000Z',
      updatedAt: '2025-05-15T09:00:00.000Z'
    },
    {
      id: 2,
      questionId: 102,
      entryText: 'I considered how to improve my habits this month.',
      entryDate: '2025-05-14',
      createdAt: '2025-05-14T08:00:00.000Z',
      updatedAt: '2025-05-14T09:00:00.000Z'
    }
  ]
};

/**
 * Mock data for POST /api/diary/entry
 */
export const mockDiaryEntryPostResponse = {
  status: 'ok',
  message: 'Entry saved successfully.'
};

/**
 * Mock data for GET /api/diary/question
 */
export const mockDiaryQuestionResponse = {
  question: {
    id: 101,
    questionText: 'What are you most grateful for in this season of your life?',
    dayNumber: 15,
    createdAt: '2025-05-15T00:00:00.000Z'
  }
};

/**
 * Mock data for GET /api/links
 */
export const mockLinksGetResponse = {
  links: [
    {
      id: 1,
      userId: 1,
      title: 'ChatGPT Session 1',
      url: 'https://chat.openai.com/share/abc123',
      createdAt: '2025-05-10T10:00:00.000Z'
    },
    {
      id: 2,
      userId: 1,
      title: 'ChatGPT Session 2',
      url: 'https://chat.openai.com/share/def456',
      createdAt: '2025-05-11T11:00:00.000Z'
    }
  ]
};

/**
 * Mock data for POST /api/links
 */
export const mockLinksPostResponse = {
  link: {
    id: 3,
    userId: 1,
    title: 'New Session',
    url: 'https://chat.openai.com/share/xyz789',
    createdAt: '2025-05-15T12:00:00.000Z'
  }
};

/**
 * Mock data for DELETE /api/links
 */
export const mockLinksDeleteResponse = {
  status: 'ok',
  message: 'Link deleted successfully.'
};

/**
 * Mock data for GET /api/generate-pdf
 */
export const mockGeneratePdfResponse = {
  status: 'ok',
  pdf: new Uint8Array([37, 80, 68, 70, 45, 49, 46, 55, 10]) // '%PDF-1.7\n' as bytes
};

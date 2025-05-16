/**
 * Request payload for POST /api/process-chats
 */
export type ProcessChatsRequest = {
  readonly urls: readonly string[];
};

/**
 * Response for POST /api/process-chats
 */
export type ProcessChatsResponse = {
  readonly status: 'ok' | 'error';
  readonly message?: string;
  readonly invalidUrls?: readonly string[];
};

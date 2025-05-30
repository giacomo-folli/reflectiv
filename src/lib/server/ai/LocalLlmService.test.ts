import { LocalLlmService } from './LocalLlmService';

// Simple fetch mock
let mockFetchResponse: any;
let mockFetchOk: boolean = true;
let mockFetchStatus: number = 200;
let fetchShouldThrowError: boolean = false;

global.fetch = vi.fn(async (url: string, options: any): Promise<any> => {
  if (fetchShouldThrowError) {
    throw new Error('Network error');
  }
  return {
    ok: mockFetchOk,
    status: mockFetchStatus,
    json: async () => mockFetchResponse,
    text: async () => JSON.stringify(mockFetchResponse), // For error reporting
  };
}) as any; // Cast to any to satisfy TypeScript if vi is not actually defined

describe('LocalLlmService', () => {
  const baseUri = 'http://localhost:11434/api/generate';
  let localLlmService: LocalLlmService;

  beforeEach(() => {
    localLlmService = new LocalLlmService(baseUri);
    // Reset mock states
    mockFetchOk = true;
    mockFetchStatus = 200;
    fetchShouldThrowError = false;
    mockFetchResponse = {};
    vi.clearAllMocks(); // Clear mock history if vi is defined
  });

  test('Test Case 1: Successful response (standard format)', async () => {
    mockFetchResponse = { response: "Local LLM says hello" };
    
    const result = await localLlmService.sendPrompt("Hi");
    expect(result).toBe("Local LLM says hello");
    expect(fetch).toHaveBeenCalledWith(baseUri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: "Hi", stream: false }),
    });
  });

  test('Test Case 2: Successful response (OpenAI-compatible format)', async () => {
    mockFetchResponse = { choices: [{ message: { content: "OpenAI compatible response" } }] };
    
    const result = await localLlmService.sendPrompt("Hi OpenAI");
    expect(result).toBe("OpenAI compatible response");
    expect(fetch).toHaveBeenCalledWith(baseUri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: "Hi OpenAI", stream: false }),
    });
  });

  test('Test Case 3: API error response', async () => {
    mockFetchOk = false;
    mockFetchStatus = 500;
    mockFetchResponse = { error: "Internal Server Error" };
    
    await expect(localLlmService.sendPrompt("Hi Error"))
      .rejects.toThrow('Local LLM API request failed with status 500');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Test Case 4: Network error', async () => {
    fetchShouldThrowError = true;
    
    await expect(localLlmService.sendPrompt("Hi Network Error"))
      .rejects.toThrow('Network error');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Test Case 5: Invalid response structure', async () => {
    mockFetchResponse = { data: "something else" }; // Invalid structure
    
    await expect(localLlmService.sendPrompt("Hi Invalid Structure"))
      .rejects.toThrow('Invalid response structure from local LLM.');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

// Minimal vi mock if not provided by a test runner
if (typeof global.vi === 'undefined') {
  global.vi = {
    fn: (fnImplementation?: (...args: any[]) => any) => {
      const mockFn = (...args: any[]) => {
        mockFn.mock.calls.push(args);
        return fnImplementation ? fnImplementation(...args) : undefined;
      };
      mockFn.mock = { calls: [] };
      mockFn.mockClear = () => { mockFn.mock.calls = []; };
      return mockFn;
    },
    clearAllMocks: () => {
      // In a real scenario, this would iterate over all mocks.
      // For this file, we only care about fetch.
      if (global.fetch && (global.fetch as any).mock) {
        (global.fetch as any).mockClear();
      }
    },
  } as any; // Cast to any to avoid TS errors for this minimal mock
}
declare global {
  var vi: any; // Declare vi globally
}

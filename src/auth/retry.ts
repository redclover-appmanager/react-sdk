import { sleep } from '../utils';

/**
 * Execute a function with exponential backoff retry logic.
 * @param fn - Async function to execute
 * @param retryAttempts - Maximum number of retry attempts
 * @param retryDelay - Initial delay between retries in milliseconds
 * @param onRetry - Optional callback called before each retry
 * @returns Result of the function
 * @throws Last error if all retries fail
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  retryAttempts: number,
  retryDelay: number,
  onRetry?: (attempt: number, error: Error) => void
): Promise<T> => {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= retryAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (onRetry) {
        onRetry(attempt, lastError);
      }

      if (attempt < retryAttempts) {
        // Exponential backoff: delay * 2^(attempt-1)
        const delay = retryDelay * Math.pow(2, attempt - 1);
        await sleep(delay);
      }
    }
  }

  throw lastError || new Error('Operation failed after retries');
};

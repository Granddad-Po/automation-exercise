import { APIRequestContext, request } from '@playwright/test';

export async function withApiClient<T>(
  callback: (api: APIRequestContext) => Promise<T>,
): Promise<T> {
  const api = await request.newContext({ baseURL: 'https://automationexercise.com' });

  try {
    return await callback(api);
  } finally {
    await api.dispose();
  }
}

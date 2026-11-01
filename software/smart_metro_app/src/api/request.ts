import axios, { type AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/models';

export const NETWORK_ERROR = 'تعذر الاتصال بالخادم';

export type ApiResult<T> =
  | { ok: true; message: string; data: T }
  | { ok: false; message: string; status?: number };

/**
 * Wraps an axios call so services never throw.
 * Success  -> server `message` + `data`.
 * HTTP error -> server `message` as-is.
 * No response (network failure) -> generic Arabic message.
 */
export async function safeRequest<T>(
  fn: () => Promise<AxiosResponse<ApiResponse<T>>>,
): Promise<ApiResult<T>> {
  try {
    const res = await fn();
    return { ok: true, message: res.data.message, data: res.data.data as T };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      const body = e.response.data as Partial<ApiResponse> | undefined;
      return { ok: false, message: body?.message || NETWORK_ERROR, status: e.response.status };
    }
    return { ok: false, message: NETWORK_ERROR };
  }
}

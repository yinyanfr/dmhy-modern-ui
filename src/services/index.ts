import { request } from 'umi';

export interface DMHYListParams {
  keyword?: string;
  categoryId?: string;
  uploaderId?: string;
  groupId?: string;
  order?: string;
  page?: number;
}

export async function getDMHYList(params: DMHYListParams = {}, options: Record<string, any> = {}) {
  return request<{ data: EelItem[] }>(`/api/list`, {
    method: 'GET',
    params,
    ...options,
  });
}

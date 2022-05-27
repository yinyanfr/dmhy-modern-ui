import { request } from 'umi';

export interface DMHYListParams {
  keyword?: string;
  categoryId?: string;
  uploaderId?: string;
  groupId?: string;
  order?: string;
  page?: number;
}

interface SearchOption {
  value: string;
  label: string;
  color?: string;
}
export interface SearchOptions {
  categories: SearchOption[];
  groups: SearchOption[];
  orders: SearchOption[];
}

export async function getDMHYList(params: DMHYListParams = {}, options: Record<string, any> = {}) {
  const { keyword, categoryId, uploaderId, groupId, order, page } = params;
  return request<{ data: EelItem[] }>(`/api/list`, {
    method: 'GET',
    params: {
      keyword,
      order,
      page,
      sort_id: categoryId,
      team_id: groupId,
      user_id: uploaderId,
    },
    ...options,
  });
}

export async function getDMHYOptions(options: Record<string, any> = {}) {
  return request('/api/options', {
    method: 'GET',
    ...options,
  });
}

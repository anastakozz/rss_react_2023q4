import { Shows } from '../modules/types';

const baseUrl = new URL('https://api.myshows.me/v2/rpc/');

export async function searchData(
  query: string,
  pageSize: number,
  page: number
): Promise<Shows> {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'shows.Get',
        params: {
          search: {
            query,
          },
          page,
          pageSize,
        },
        id: 1,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при выполнении запроса');
    }

    const res = await response.json();
    console.log(res.result);
    return res.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

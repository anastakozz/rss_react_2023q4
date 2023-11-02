// import { Species } from '../modules/types';

const baseUrl = new URL('https://api.myshows.me/v2/rpc/');

export async function searchData(query: string) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'shows.Search',
        params: {
          query,
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
  }
}

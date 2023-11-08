import { ShowsProps } from '../modules/interfaces';
import { Shows } from '../modules/types';

const baseUrl = new URL('https://api.myshows.me/v2/rpc/');

type apiParams = {
  [key: string]: string | number | boolean | apiParams;
};

export async function getApiData(method: string, params: apiParams) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        params,
        id: 1,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при выполнении запроса');
    }

    const res = await response.json();
    return res.result;
  } catch (error) {
    console.error(error);
  }
}

export async function searchData(
  query: string,
  pageSize: number,
  page: number
): Promise<Shows | undefined> {
  const method = 'shows.Get';
  const params = {
    search: {
      query,
    },
    page,
    pageSize,
  };

  return await getApiData(method, params);
}

export async function getShowsCount(
  query: string
): Promise<number | undefined> {
  const method = 'shows.Count';
  const params = {
    search: {
      query,
    },
  };

  return await getApiData(method, params);
}

export async function getShowData(id: string): Promise<ShowsProps | undefined> {
  const method = 'shows.GetById';
  const params = {
    showId: id,
    withEpisodes: true,
  };

  return await getApiData(method, params);
}

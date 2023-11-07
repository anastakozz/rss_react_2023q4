import { ShowsProps } from '../modules/interfaces';
import { Shows } from '../modules/types';

const baseUrl = new URL('https://api.myshows.me/v2/rpc/');

export async function searchData(
  query: string,
  pageSize: number,
  page: number
): Promise<Shows | undefined> {
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
    return res.result;
  } catch (error) {
    console.error(error);
  }
}

export async function getShowsCount(
  query: string
): Promise<number | undefined> {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'shows.Count',
        params: {
          search: {
            query,
          },
        },
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

export async function getShowData(
  id: string | undefined
): Promise<ShowsProps | undefined> {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'shows.GetById',
        params: {
          showId: id,
          withEpisodes: true,
        },
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

import { Species } from '../modules/types';

const baseUrl = 'https://swapi.dev/api/species/';

export async function getAllData(): Promise<Species> {
  const response = await fetch(`${baseUrl}`);
  const res = await response.json();
  return res.results;
}

export async function searchData(param: string) {
  const response = await fetch(`${baseUrl}?search=${param}`);
  const res = await response.json();
  return res.results;
}

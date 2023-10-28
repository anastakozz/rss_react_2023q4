import { Species } from '../lib/types';

const baseUrl = 'https://swapi.dev/api/species/';

export async function getAllData(): Promise<Species> {
  const response = await fetch(`${baseUrl}`);
  const res = await response.json();
  console.log(res.results);
  return res.results;
}

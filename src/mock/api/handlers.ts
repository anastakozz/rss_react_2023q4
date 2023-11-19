import { HttpResponse, http, passthrough } from 'msw';
import { baseUrl } from '../../store/api';
import {
  mockedDetailsData,
  mockShowsData,
  testCardNumber,
} from '../../tests/mockData';

export const handlers = [
  http.post(`${baseUrl}*`, (request) => {
    const { method } = request.params;
    if (method === 'shows.Get') {
      return HttpResponse.json({
        result: mockShowsData,
      });
    } else if (method === 'shows.GetById') {
      return HttpResponse.json({
        result: mockedDetailsData,
      });
    } else if (method === 'shows.Count') {
      return HttpResponse.json({
        result: testCardNumber,
      });
    }
    return passthrough();
  }),
];

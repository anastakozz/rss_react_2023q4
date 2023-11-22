import { HttpResponse, http } from 'msw';
import { baseUrl } from '../../store/api';
import { mockedDetailsData } from '../../tests/mockData';

export const handlers = [
  http.post(`${baseUrl}*`, () => {
    return HttpResponse.json({
      result: mockedDetailsData,
    });
  }),
];

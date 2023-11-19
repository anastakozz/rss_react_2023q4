import { HttpResponse, http, passthrough } from 'msw';
import { baseUrl } from '../../store/api';
import {
  mockedDetailsData,
  mockShowsData,
  testCardNumber,
} from '../../tests/mockData';
import { apiMethods } from '../../modules/enum';
const { showData, showsList, showsNumber } = apiMethods;

export const handlers = [
  http.post(`${baseUrl}*`, (request) => {
    const { method } = request.params;
    if (method === showsList) {
      return HttpResponse.json({
        result: mockShowsData,
      });
    } else if (method === showData) {
      return HttpResponse.json({
        result: mockedDetailsData,
      });
    } else if (method === showsNumber) {
      return HttpResponse.json({
        result: testCardNumber,
      });
    }
    return passthrough();
  }),
];

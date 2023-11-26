import { HttpResponse, http } from "msw";
import { baseUrl } from "@/api/api";
import { mockedDetailsData } from "./mockData";

export const handlers = [
  http.post(`${baseUrl}*`, () => {
    return HttpResponse.json({
      result: mockedDetailsData,
    });
  }),
];

export const createHandler = (status: number = 200) =>
  http.post(`${baseUrl}*`, ({ request }) => {
    if (status !== 200) {
      return new HttpResponse(null, {
        status,
      });
    }

    return HttpResponse.json(request.body);
  });

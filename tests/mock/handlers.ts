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

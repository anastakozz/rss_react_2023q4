import { basicPageSize } from "@/modules/constant";
import { ShowsProps } from "../../src/modules/interfaces";

export const mockCard: ShowsProps = {
  id: "1",
  titleOriginal: "Test Card",
  totalSeasons: "1",
  rating: 0,
};

export const mockedDetailsData = {
  titleOriginal: "Mocked Title",
  country: "Mocked Country",
  started: "Mocked Start Date",
  description: "Mocked Description",
  image: "",
};

export const testCardNumber = 9;

export const mockShowsData = new Array(testCardNumber).fill(mockCard);

export const mockMainPageData = {
  searchQuery: "",
  shows: mockShowsData,
  pagesTotal: 1,
  currentPage: "1",
  pageSize: basicPageSize,
  detailsData: mockedDetailsData,
};

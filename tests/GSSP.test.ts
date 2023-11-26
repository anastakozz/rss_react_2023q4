import { getServerSideProps } from "@/pages";
import { test, expect, beforeAll, afterAll } from "vitest";
import { GetServerSidePropsContext } from "next";
import { createRequest, createResponse } from "node-mocks-http";
import { server } from "./mock/server";
import { basicPageSize } from "@/modules/constant";

beforeAll(() => server.listen());
afterAll(() => server.close());

const mockContext: GetServerSidePropsContext = {
  query: { page: "1" },
  req: createRequest(),
  res: createResponse(),
  resolvedUrl: "",
};

test("returns proper data", async () => {
  const result = await getServerSideProps(mockContext);
  if ("props" in result) {
    if ("pageSize" in result.props) {
      const pageSize = result.props.pageSize;
      expect(pageSize).toEqual(basicPageSize);
    } else {
      expect(true).toBeFalsy();
    }
  } else {
    expect(true).toBeFalsy();
  }
});

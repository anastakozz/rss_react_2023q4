import { expect, test, vi } from "vitest";
import * as utils from "@/modules/utils";
import { reloadWindow } from "@/modules/utils";

test("reload window", () => {
  const reloadSpy = vi.spyOn(utils, "reloadWindow");
  reloadWindow();
  expect(reloadSpy).toHaveBeenCalled();
});

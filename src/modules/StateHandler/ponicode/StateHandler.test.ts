import * as StateHandler from "../StateHandler";
// @ponicode
describe("StateHandler.default.setStatGameMode", () => {
  let inst: any;

  beforeEach(() => {
    inst = new StateHandler.default();
  });

  test("0", () => {
    inst.setStatGameMode(undefined);
  });
});

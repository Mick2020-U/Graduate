const { TestHelper } = require("uu_appg01_workspace-test");


beforeAll(async () => {
  await TestHelper.setup(null, { authEnabled: false });
  await TestHelper.initApp();
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("List Boats", () => {
  test("example 3 test - boat/list", async () => {
    let dtoIn = {};
    let result = await TestHelper.executeGetCommand("boat/list", dtoIn);

    expect(result.data).toBeDefined();
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toEqual({});
  });
});

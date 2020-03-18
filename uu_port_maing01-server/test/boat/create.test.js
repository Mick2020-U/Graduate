const { TestHelper } = require("uu_appg01_workspace-test");


beforeAll(async () => {
  await TestHelper.setup(null, { authEnabled: false });
  await TestHelper.initApp();
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Create Boat", () => {
  test("example 3 test - boat/create", async () => {
    let dtoIn = {
      code: "1215AC",
      captainId: "5e4a5e26e510bf30c6c0a186",
      boatType: "yacht"
    };
    let result = await TestHelper.executePostCommand("boat/create", dtoIn);

    expect(result.data.code).toEqual(dtoIn.code);
    expect(result.data.boatType).toEqual(dtoIn.boatType);
    expect(result.data.uuAppErrorMap).toEqual({});
  });
});

/* eslint-disable no-undef */
import addUsers from "../services/UserService";

describe("adding users", () => {
  test("adds 1+2 to equal to 3", () => {
    expect(addUsers(1, 2)).toBe(3);
  });
});

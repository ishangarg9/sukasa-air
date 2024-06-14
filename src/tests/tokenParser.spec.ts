import jwt from "jsonwebtoken";
import { parseToken } from "../utils/tokenParser";

describe("parseToken", () => {
  it("should return decoded payload when token is valid and secret is correct", () => {
    const mockToken = "mock_token";
    const mockDecodedPayload = { id: 1, name: "Laxmi Bai" };
    const mockSecret = "supersecret";

    process.env.JWT_SECRET = mockSecret;
    jest.spyOn(jwt, "verify").mockReturnValue(mockDecodedPayload as any);

    const result = parseToken(mockToken);

    expect(result).toEqual(mockDecodedPayload);
  });

  it("should throw an error when token is expired", () => {
    const mockToken = "expired_token";
    const mockSecret = "supersecret";

    process.env.JWT_SECRET = mockSecret;
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new jwt.TokenExpiredError("jwt expired", new Date());
    });

    expect(() => parseToken(mockToken)).toThrow(jwt.TokenExpiredError);
  });
});

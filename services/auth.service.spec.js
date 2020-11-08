
const authService = require('./auth.service')

afterEach(() => {
  jest.clearAllMocks();
});

test('getBasicAuth', () => {
    expect(authService.getBasicAuth("clientIdTest", "pass")).toBe("Basic Y2xpZW50SWRUZXN0OnBhc3M=");
});

test('getCredentialData', () => {
    expect(authService.getCredentialData("userTest", "pass")).toBe(JSON.stringify(
        {
            user: "userTest",
            password: "pass",
        }
    ));
});

test('getQueryStringData', () => {
    const refreshToken = "d257aeab119ed63880e582b5a6eb04f96954e84c0ab1f81a16b09ce474c1ae541ba5a5018837ef9a6764e7205b5fb9f4765f8eacb983f0bab4ce773d0a12d253";
    const expectedRes = "refresh_token=d257aeab119ed63880e582b5a6eb04f96954e84c0ab1f81a16b09ce474c1ae541ba5a5018837ef9a6764e7205b5fb9f4765f8eacb983f0bab4ce773d0a12d253&grant_type=refresh_token";
    expect(authService.getQueryStringData(refreshToken)).toBe(expectedRes);
});
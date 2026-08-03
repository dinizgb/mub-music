jest.mock("@apollo/client", () => ({
  ApolloClient: jest.fn().mockImplementation((options) => ({ options })),
  InMemoryCache: jest.fn().mockImplementation(() => ({ kind: "cache" })),
  HttpLink: jest.fn().mockImplementation((options) => ({
    kind: "httpLink",
    options,
  })),
}));

describe("apolloClient", () => {
  const originalRootPath = process.env.ENV_API_ROOT_PATH;
  const originalUser = process.env.ENV_API_USER;
  const originalPassword = process.env.ENV_API_PASSWORD;

  afterEach(() => {
    process.env.ENV_API_ROOT_PATH = originalRootPath;
    process.env.ENV_API_USER = originalUser;
    process.env.ENV_API_PASSWORD = originalPassword;
    jest.resetModules();
  });

  it("creates a client with the GraphQL endpoint and Basic auth headers", async () => {
    process.env.ENV_API_ROOT_PATH = "api.example.com";
    process.env.ENV_API_USER = "graphql-client";
    process.env.ENV_API_PASSWORD = "secret-pass";

    const { ApolloClient, InMemoryCache, HttpLink } =
      await import("@apollo/client");
    const apolloClient = (await import("services/graphql/apolloClient"))
      .default;

    const expectedAuthorization = `Basic ${Buffer.from(
      "graphql-client:secret-pass"
    ).toString("base64")}`;

    expect(HttpLink).toHaveBeenCalledWith({
      uri: "https://api.example.com/graphql",
      headers: {
        Authorization: expectedAuthorization,
      },
    });
    expect(ApolloClient).toHaveBeenCalledWith(
      expect.objectContaining({
        link: expect.objectContaining({
          kind: "httpLink",
          options: {
            uri: "https://api.example.com/graphql",
            headers: {
              Authorization: expectedAuthorization,
            },
          },
        }),
        cache: { kind: "cache" },
      })
    );
    expect(InMemoryCache).toHaveBeenCalled();
    expect(apolloClient).toEqual({
      options: expect.objectContaining({
        cache: { kind: "cache" },
      }),
    });
  });
});

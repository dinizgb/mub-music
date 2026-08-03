jest.mock("@apollo/client", () => ({
  ApolloClient: jest.fn(),
  InMemoryCache: jest.fn(),
}));

describe("apolloClient", () => {
  const originalEnv = process.env.ENV_API_ROOT_PATH;

  afterEach(() => {
    process.env.ENV_API_ROOT_PATH = originalEnv;
    jest.resetModules();
  });

  it("creates a client pointing at the GraphQL endpoint from ENV_API_ROOT_PATH", async () => {
    process.env.ENV_API_ROOT_PATH = "api.example.com";

    const { ApolloClient, InMemoryCache } = await import("@apollo/client");
    await import("services/graphql/apolloClient");

    expect(ApolloClient).toHaveBeenCalledWith(
      expect.objectContaining({
        uri: "https://api.example.com/graphql",
        cache: expect.any(Object),
      })
    );
    expect(InMemoryCache).toHaveBeenCalled();
  });
});

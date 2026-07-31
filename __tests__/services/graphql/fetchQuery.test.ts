import { fetchQuery } from "services/graphql/fetchQuery";

const queryMock = jest.fn();

jest.mock("services/graphql/apolloClient", () => ({
  __esModule: true,
  default: {
    query: (...args: unknown[]) => queryMock(...args),
  },
}));

jest.mock("@apollo/client", () => ({
  gql: (literals: TemplateStringsArray) => literals.join(""),
}));

describe("fetchQuery", () => {
  beforeEach(() => {
    queryMock.mockReset();
  });

  it("returns props.data when GraphQL returns data", async () => {
    const data = { posts: { nodes: [{ slug: "a" }] } };
    queryMock.mockResolvedValue({ data });

    await expect(
      fetchQuery("query { posts { nodes { slug } } }")
    ).resolves.toEqual({
      props: { data },
    });
  });

  it("returns notFound when data.length is 0", async () => {
    queryMock.mockResolvedValue({ data: [] });

    await expect(
      fetchQuery("query { posts { nodes { slug } } }")
    ).resolves.toEqual({
      notFound: true,
    });
  });
});

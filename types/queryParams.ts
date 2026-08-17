import { whereParams } from "types/whereParams";

export type QueryParameters = {
  first?: number;
  after?: string;
  filter?: string;
  limit?: number;
  offset?: number;
  slug?: string;
  where?: whereParams;
};

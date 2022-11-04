import { whereParams } from "types/whereParams";

export type QueryParameters = {
  first?: number;
  filter?: string;
  limit?: number;
  offset?: number;
  slug?: string;
  where?: whereParams;
};

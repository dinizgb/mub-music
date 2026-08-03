"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "redux/store";

/**
 * Client providers for Redux.
 * @param {{ children: ReactNode }} props Provider children.
 * @return {ReactElement} App providers tree.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

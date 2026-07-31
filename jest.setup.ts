import React from "react";
import "@testing-library/jest-dom";

jest.mock("@/components/ui/avatar", () => ({
  Avatar: ({ children }: { children?: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "avatar" }, children),
  AvatarImage: ({ alt, src }: { alt?: string; src?: string }) =>
    React.createElement("img", { alt, src }),
  AvatarFallback: ({ children }: { children?: React.ReactNode }) =>
    React.createElement("span", null, children),
}));

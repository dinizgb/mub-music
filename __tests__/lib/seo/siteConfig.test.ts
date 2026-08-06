import { getSiteConfig } from "lib/seo/siteConfig";

describe("getSiteConfig", () => {
  const originalDomain = process.env.NEXT_PUBLIC_ENV_DOMAIN;

  afterEach(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = originalDomain;
  });

  it("returns siteName, domain, and metadataBase", () => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "mubmusic.com";
    const config = getSiteConfig();
    expect(config.siteName).toBe("Mub Music");
    expect(config.domain).toBe("mubmusic.com");
    expect(config.metadataBase.href).toBe("https://mubmusic.com/");
  });

  it("throws when NEXT_PUBLIC_ENV_DOMAIN is missing", () => {
    delete process.env.NEXT_PUBLIC_ENV_DOMAIN;
    expect(() => getSiteConfig()).toThrow(/NEXT_PUBLIC_ENV_DOMAIN/);
  });

  it("throws when NEXT_PUBLIC_ENV_DOMAIN is blank", () => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "   ";
    expect(() => getSiteConfig()).toThrow(/NEXT_PUBLIC_ENV_DOMAIN/);
  });
});

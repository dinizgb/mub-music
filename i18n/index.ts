import usEn from "./us-en.json";

export const i18n = usEn;

/**
 * Replaces `{key}` placeholders in a translation string.
 * @param {string} template Translation template.
 * @param {Record<string, string | number>} vars Placeholder values.
 * @return {string} Interpolated string.
 */
export function t(
  template: string,
  vars: Record<string, string | number>
): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.split(`{${key}}`).join(String(value)),
    template
  );
}

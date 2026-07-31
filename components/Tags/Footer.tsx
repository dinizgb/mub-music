import { P } from "components/Texts/Typographies";

/**
 * Footer Component.
 * @return {TSX.Element}: The TSX code for the Footer Component.
 */
export default function Footer() {
  return (
    <footer
      className="border-line-bottom mt-5 flex w-full flex-row border-t px-0
        pt-7.5 pb-2.5 text-center max-sm:mt-12.5"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="mb-4 w-full">
          <P
            className="text-text-4"
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
            xsFontSize={16}
            xsLineHeight={24}
          >
            Mub Music - All rights reserved.
          </P>
        </div>
      </div>
    </footer>
  );
}

import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H1, H2 } from "components/Texts/Typographies";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { i18n, t } from "@/i18n";

type LayoutPrivacyPolicyPageProps = {
  productsCategories: ProductsCategoriesType[];
};

/**
 * Privacy Policy page layout.
 * @param {LayoutPrivacyPolicyPageProps} props Layout props.
 * @return {JSX.Element} Privacy policy content shell.
 */
export default function LayoutPrivacyPolicyPage(
  props: LayoutPrivacyPolicyPageProps
) {
  const copy = i18n.privacyPolicy;
  const contactEmail = copy.contactEmail;

  return (
    <>
      <Header productsCategories={props.productsCategories} />
      <main>
        <div className="mx-auto w-full max-w-screen-2xl px-4">
          <article
            className="bg-secondary mx-auto mt-8 mb-12 max-w-3xl rounded-lg px-6
              py-8 sm:px-10 sm:py-10"
          >
            <H1
              className="text-text-4 mb-2"
              fontWeight={700}
              fontSize={36}
              lineHeight={44}
              xsFontSize={28}
              xsLineHeight={36}
            >
              {copy.title}
            </H1>
            <p className="text-subtitle mb-8 text-sm">
              {copy.lastUpdatedLabel}: {copy.lastUpdatedDate}
            </p>

            <div className="text-text-3 flex flex-col gap-6 text-base leading-7">
              <p>{copy.intro}</p>

              <section>
                <H2
                  className="text-text-4 mb-3"
                  fontWeight={600}
                  fontSize={22}
                  lineHeight={30}
                  xsFontSize={20}
                  xsLineHeight={28}
                >
                  {copy.whoWeAreTitle}
                </H2>
                <p>{t(copy.whoWeAreBody, { email: contactEmail })}</p>
              </section>

              <section>
                <H2
                  className="text-text-4 mb-3"
                  fontWeight={600}
                  fontSize={22}
                  lineHeight={30}
                  xsFontSize={20}
                  xsLineHeight={28}
                >
                  {copy.informationTitle}
                </H2>
                <p className="mb-3">{copy.informationBody}</p>
                <ul className="list-disc! space-y-2 pl-5">
                  <li className="list-item">{copy.informationItemUsage}</li>
                  <li className="list-item">{copy.informationItemSession}</li>
                  <li className="list-item">{copy.informationItemConsent}</li>
                  <li className="list-item">{copy.informationItemTechnical}</li>
                </ul>
              </section>

              <section>
                <H2
                  className="text-text-4 mb-3"
                  fontWeight={600}
                  fontSize={22}
                  lineHeight={30}
                  xsFontSize={20}
                  xsLineHeight={28}
                >
                  {copy.analyticsTitle}
                </H2>
                <p>{copy.analyticsBody}</p>
              </section>

              <section>
                <H2
                  className="text-text-4 mb-3"
                  fontWeight={600}
                  fontSize={22}
                  lineHeight={30}
                  xsFontSize={20}
                  xsLineHeight={28}
                >
                  {copy.cookiesTitle}
                </H2>
                <p>{copy.cookiesBody}</p>
              </section>

              <section>
                <H2
                  className="text-text-4 mb-3"
                  fontWeight={600}
                  fontSize={22}
                  lineHeight={30}
                  xsFontSize={20}
                  xsLineHeight={28}
                >
                  {copy.changeMindTitle}
                </H2>
                <p>{copy.changeMindBody}</p>
              </section>

              <section>
                <H2
                  className="text-text-4 mb-3"
                  fontWeight={600}
                  fontSize={22}
                  lineHeight={30}
                  xsFontSize={20}
                  xsLineHeight={28}
                >
                  {copy.thirdPartiesTitle}
                </H2>
                <p>{copy.thirdPartiesBody}</p>
              </section>

              <section>
                <H2
                  className="text-text-4 mb-3"
                  fontWeight={600}
                  fontSize={22}
                  lineHeight={30}
                  xsFontSize={20}
                  xsLineHeight={28}
                >
                  {copy.childrenTitle}
                </H2>
                <p>{copy.childrenBody}</p>
              </section>

              <section>
                <H2
                  className="text-text-4 mb-3"
                  fontWeight={600}
                  fontSize={22}
                  lineHeight={30}
                  xsFontSize={20}
                  xsLineHeight={28}
                >
                  {copy.changesTitle}
                </H2>
                <p>{copy.changesBody}</p>
              </section>

              <section>
                <H2
                  className="text-text-4 mb-3"
                  fontWeight={600}
                  fontSize={22}
                  lineHeight={30}
                  xsFontSize={20}
                  xsLineHeight={28}
                >
                  {copy.contactTitle}
                </H2>
                <p>{t(copy.contactBody, { email: contactEmail })}</p>
              </section>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

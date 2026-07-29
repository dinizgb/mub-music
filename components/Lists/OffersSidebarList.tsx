import Image from "next/image";
import styled from "styled-components";
// COMPONENTS
import { H3, H4, Span } from "components/Texts/Typographies";

const OffersSidebarListWrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin: 0 0 30px 0;
  padding: 0 0 10px 0;
  width: 100%;
`;

const OffersSidebarListTop = styled.div<OffersSidebarListTopProps>`
  background: ${(props) =>
    props.isPrimaryTitle
      ? ({ theme }) => theme.colors.primary
      : ({ theme }) => theme.colors.oddSection};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  color: ${(props) =>
    props.isPrimaryTitle
      ? ({ theme }) => theme.colors.background
      : ({ theme }) => theme.colors.text_4};
  padding: 10px 20px;
`;

const OffersSidebarListUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding-inline-start: 0;
  padding: 10px 15px;
`;

const OffersSidebarListLi = styled.li`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline-start: 0;
  padding: 15px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line_bottom};
  figure {
    display: flex;
    flex-direction: row;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    cursor: pointer;
    h4,
    span,
    svg {
      color: ${({ theme }) => theme.colors.background} !important;
    }
  }
`;

const OffersSidebarListLiLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  margin-right: 15px;
  img {
    border-radius: 50%;
  }
`;

type OffersSidebarListProps = {
  isPrimaryTitle: boolean;
  title: string;
  data: OffersSidebarListData[];
};

type OffersSidebarListTopProps = {
  isPrimaryTitle: boolean;
};

type OffersSidebarListData = {
  logo: string;
  price: number;
  store: string;
  url: string;
};

/**
 * Offers Sidebar List Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Offers Sidebar List Component.
 */
export default function OffersSidebarList(props: OffersSidebarListProps) {
  return (
    <OffersSidebarListWrapper>
      <OffersSidebarListTop isPrimaryTitle={props.isPrimaryTitle}>
        <H3
          fontColor={
            props.isPrimaryTitle
              ? ({ theme }) => theme.colors.background
              : ({ theme }) => theme.colors.text_4
          }
          fontWeight={props.isPrimaryTitle ? 700 : 600}
          fontSize={21}
          lineHeight={36}
          xsFontSize={21}
          xsLineHeight={36}
          margin={0}
        >
          {props.title}
        </H3>
      </OffersSidebarListTop>
      <OffersSidebarListUl>
        {props.data ? (
          props.data.map(({ logo, price, store, url }) => {
            return (
              <OffersSidebarListLi key={url}>
                <figure>
                  <OffersSidebarListLiLogo>
                    <Image
                      src={logo}
                      alt={`${store} logo`}
                      fill
                      objectFit="cover"
                    />
                  </OffersSidebarListLiLogo>
                  <H4
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={500}
                    fontSize={17}
                    lineHeight={36}
                    xsFontSize={17}
                    xsLineHeight={36}
                    margin={0}
                  >
                    {store}
                  </H4>
                </figure>
                <div>
                  <Span
                    fontColor={({ theme }) => theme.colors.subtitle}
                    fontWeight={400}
                    fontSize={14}
                    lineHeight={16}
                    xsFontSize={14}
                    xsLineHeight={16}
                    margin={`0 0 6px 0`}
                  >
                    From
                  </Span>
                  <Span
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={700}
                    fontSize={18}
                    lineHeight={18}
                    xsFontSize={18}
                    xsLineHeight={18}
                    margin={`0`}
                  >
                    ${price}
                  </Span>
                </div>
              </OffersSidebarListLi>
            );
          })
        ) : (
          <Span
            fontColor={({ theme }) => theme.colors.subtitle}
            fontWeight={400}
            fontSize={17}
            lineHeight={16}
            xsFontSize={17}
            xsLineHeight={16}
            margin={`10px 0 0 0`}
          >
            No offers available
          </Span>
        )}
      </OffersSidebarListUl>
    </OffersSidebarListWrapper>
  );
}

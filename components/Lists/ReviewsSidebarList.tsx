import Image from "next/image";
import styled from "styled-components";
// COMPONENTS
import { H3, H4, Span } from "components/Texts/Typographies";
import StarsWidget from "components/Widgets/StarsWidget";

const ReviewsSidebarListWrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin: 0 0 30px 0;
  padding: 0 0 10px 0;
  width: 100%;
`;

const ReviewsSidebarListTop = styled.div<ReviewsSidebarListTopProps>`
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

const ReviewsSidebarListUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding-inline-start: 0;
  padding: 10px 15px;
`;

const ReviewsSidebarListLi = styled.li`
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
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    cursor: pointer;
    h4,
    svg {
      color: ${({ theme }) => theme.colors.background} !important;
    }
  }
`;

const ReviewsSidebarListLiLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  margin-right: 15px;
  img {
    border-radius: 50%;
  }
`;

type ReviewsSidebarListProps = {
  isPrimaryTitle: boolean;
  title: string;
  data: ReviewsSidebarListData[];
};

type ReviewsSidebarListTopProps = {
  isPrimaryTitle: boolean;
};

type ReviewsSidebarListData = {
  count: number;
  rate: number;
  store: string;
  logo: string;
  url: string;
};

/**
 * Reviews Sidebar List Component.
 * @param {ReviewsSidebarListProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Reviews Sidebar List Component.
 */
export default function ReviewsSidebarList(props: ReviewsSidebarListProps) {
  return (
    <ReviewsSidebarListWrapper>
      <ReviewsSidebarListTop isPrimaryTitle={props.isPrimaryTitle}>
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
      </ReviewsSidebarListTop>
      <ReviewsSidebarListUl>
        {props.data.length > 0 ? (
          props.data.map(({ count, logo, rate, store, url }) => {
            return (
              <a href={url} target="_blank" rel="noreferrer" key={url}>
                <ReviewsSidebarListLi>
                  <figure>
                    <ReviewsSidebarListLiLogo>
                      <Image
                        src={logo}
                        alt={`${store} logo`}
                        fill
                        objectFit="cover"
                      />
                    </ReviewsSidebarListLiLogo>
                    <H4
                      fontColor={({ theme }) => theme.colors.text_4}
                      fontWeight={500}
                      fontSize={17}
                      lineHeight={36}
                      xsFontSize={17}
                      xsLineHeight={36}
                      margin={0}
                    >
                      {store} {`(${count})`}
                    </H4>
                  </figure>
                  <div>
                    <StarsWidget
                      fontSize={18}
                      number={rate}
                      withBackground={false}
                    />
                  </div>
                </ReviewsSidebarListLi>
              </a>
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
            No reviews available
          </Span>
        )}
      </ReviewsSidebarListUl>
    </ReviewsSidebarListWrapper>
  );
}

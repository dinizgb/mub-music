/* eslint-disable camelcase */
import styled from "styled-components";
import { H3 } from "components/Texts/Typographies";
import { ProductType } from "types/productType";
import CircularProgress from "@mui/material/CircularProgress";

type SearchAutoFillResultListProps = {
  data: ProductType[];
};

const SearchAutoFillResultListUl = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const SearchAutoFillResultListLi = styled.li`
  margin: 5px 0;
  width: 100%;
  a {
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light_line_bottom};
    border-radius: 0;
    display: flex;
    flex-direction: row;
    padding: 13px 15px;
    position: relative;
    img {
      border-radius: 8px;
      margin-right: 15px;
      width: 8%;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.light_line_bottom};
      border-radius: 8px;
    }
  }
`;

/**
 * Search auto fill result list Component.
 * @param {ProductType} props to the component.
 * @return {TSX.Element}: The TSX code for the Search auto fill result list Component.
 */
export default function SearchAutoFillResultList(
  props: SearchAutoFillResultListProps
) {
  return (
    <SearchAutoFillResultListUl>
      {props.data ? (
        props.data.map(({ title, slug, product_info }) => {
          return (
            <SearchAutoFillResultListLi key={slug}>
              <a
                href={`/products/${product_info.category.slug}/${product_info.subcategory.slug}/${slug}`}
              >
                <img src={product_info.thumbnail.sourceUrl} />
                <H3
                  fontColor={({ theme }) => theme.colors.text_1}
                  fontWeight={600}
                  fontSize={18}
                  lineHeight={24}
                  xsFontSize={18}
                  xsLineHeight={24}
                  margin={0}
                >
                  {title}
                </H3>
              </a>
            </SearchAutoFillResultListLi>
          );
        })
      ) : (
        <SearchAutoFillResultListLi>
          <CircularProgress color="inherit" size="25px" />
        </SearchAutoFillResultListLi>
      )}
    </SearchAutoFillResultListUl>
  );
}

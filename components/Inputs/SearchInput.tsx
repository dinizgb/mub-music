/* eslint-disable camelcase */
import styled from "styled-components";

// MUI
import SearchIcon from "@mui/icons-material/Search";

// COMPONENTS
import SearchAutoFillResultList from "components/Lists/SearchAutoFillResultList";

// REDUX
import { useAppSelector, useAppDispatch } from "redux/store";
import {
  toggleSearchAutoFill,
  toggleSearchAutoFillResults,
} from "redux/slices/searchAutoFill";

// SERVICES
import { searchProducts } from "services/search/searchProducts";

type SearchInputsProps = {
  margin?: string;
  placeholder?: string;
};

type AutoFillAreaProps = {
  display: string;
};

const SearchInputWrapper = styled.div<SearchInputsProps>`
  background: none;
  border-radius: 50px;
  border: 4px solid ${({ theme }) => theme.colors.text_4};
  color: ${({ theme }) => theme.colors.text_1};
  display: flex;
  flex-direction: row;
  font-size: 21px;
  font-weight: 600;
  margin: ${(props) => props.margin};
  outline: none;
  padding: 20px 3%;
  position: relative;
  width: 93%;
  svg {
    fill: ${({ theme }) => theme.colors.text_4};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.text_4};
    input {
      color: ${({ theme }) => theme.colors.text_1};
    }
    svg {
      fill: ${({ theme }) => theme.colors.text_1};
    }
  }
`;

const CustomSearchInput = styled.input`
  background: none;
  border-radius: 50px;
  border: none;
  color: ${({ theme }) => theme.colors.text_4};
  font-size: 21px;
  font-weight: 600;
  outline: none;
  padding: 0 2%;
  width: 96%;
`;

const AutoFillArea = styled.div<AutoFillAreaProps>`
  background: ${({ theme }) => theme.colors.text_4};
  border-radius: 0 0 20px 20px;
  color: ${({ theme }) => theme.colors.text_1};
  display: ${(props) => props.display};
  margin: 0 auto;
  padding: 2%;
  position: relative;
  width: 86%;
  z-index: 1;
`;

/**
 * Search Input Component.
 * @param {SearchInputsProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Search Input Component.
 */
export default function SearchInput(props: SearchInputsProps) {
  // AUTO FILL LOGIC
  const dispatch = useAppDispatch();
  const searchAutoFillStatus = useAppSelector(
    (state) => state.searchAutoFillEvents.showSearchAutoFill
  );
  const searchAutoFillResultsStatus = useAppSelector(
    (state) => state.searchAutoFillEvents.showSearchAutoFillResults
  );
  const handleSearch = (e) => {
    setTimeout(() => {
      dispatch(toggleSearchAutoFillResults());
      Promise.resolve(searchProducts(e.target.value)).then((value) => {
        dispatch(toggleSearchAutoFill(!searchAutoFillStatus ? true : false));
        if (value.notFound || !value.props) {
          dispatch(toggleSearchAutoFillResults([]));
          return;
        }
        dispatch(toggleSearchAutoFillResults(value.props.data.products.nodes));
      });
    }, 1000);
  };

  return (
    <>
      <SearchInputWrapper margin={props.margin}>
        <SearchIcon />
        <CustomSearchInput
          placeholder={props.placeholder}
          onInput={handleSearch}
        />
      </SearchInputWrapper>
      <AutoFillArea display={searchAutoFillStatus ? "block" : "none"}>
        <SearchAutoFillResultList
          data={searchAutoFillResultsStatus}
        ></SearchAutoFillResultList>
      </AutoFillArea>
    </>
  );
}

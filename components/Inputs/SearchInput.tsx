/* eslint-disable camelcase */
"use client";

import { Search } from "lucide-react";
import SearchAutoFillResultList from "components/Lists/SearchAutoFillResultList";
import { useAppSelector, useAppDispatch } from "redux/store";
import {
  toggleSearchAutoFill,
  toggleSearchAutoFillResults,
} from "redux/slices/searchAutoFill";
import { searchProducts } from "services/search/searchProducts";
import { cn } from "@/lib/utils";

type SearchInputsProps = {
  className?: string;
  placeholder?: string;
};

/**
 * Search Input Component.
 * @param {SearchInputsProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Search Input Component.
 */
export default function SearchInput(props: SearchInputsProps) {
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
      <div
        className={cn(
          `group border-text-4 text-text-1 hover:bg-text-4 relative flex w-[93%]
          flex-row rounded-[50px] border-4 bg-transparent px-[3%] py-5
          text-[21px] font-semibold outline-none`,
          props.className
        )}
      >
        <Search className="text-text-4 group-hover:text-text-1" />
        <input
          className="text-text-4 group-hover:text-text-1 w-[96%] rounded-[50px]
            border-none bg-transparent px-[2%] text-[21px] font-semibold
            outline-none"
          placeholder={props.placeholder}
          onInput={handleSearch}
        />
      </div>
      <div
        className={cn(
          `bg-text-4 text-text-1 relative z-1 mx-auto w-[86%] rounded-b-[20px]
          p-[2%]`,
          searchAutoFillStatus ? "block" : "hidden"
        )}
      >
        <SearchAutoFillResultList data={searchAutoFillResultsStatus} />
      </div>
    </>
  );
}

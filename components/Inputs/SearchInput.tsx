/* eslint-disable camelcase */
"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import SearchAutoFillResultList from "components/Lists/SearchAutoFillResultList";
import { useAppSelector, useAppDispatch } from "redux/store";
import {
  toggleSearchAutoFill,
  toggleSearchAutoFillResults,
} from "redux/slices/searchAutoFill";
import { fetchSearchProducts } from "@/lib/api/searchProducts";
import { cn } from "@/lib/utils";

type SearchInputsProps = {
  className?: string;
  placeholder?: string;
};

const DEBOUNCE_MS = 450;
const MIN_QUERY_LENGTH = 2;

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
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastQueryRef = useRef("");

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const query = value.trim();

      if (query.length < MIN_QUERY_LENGTH) {
        abortControllerRef.current?.abort();
        lastQueryRef.current = "";
        dispatch(toggleSearchAutoFill(false));
        dispatch(toggleSearchAutoFillResults([]));
        return;
      }

      if (query === lastQueryRef.current) {
        return;
      }

      lastQueryRef.current = query;
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      dispatch(toggleSearchAutoFillResults());
      fetchSearchProducts(query, controller.signal)
        .then((products) => {
          if (controller.signal.aborted) {
            return;
          }
          dispatch(toggleSearchAutoFill(true));
          dispatch(toggleSearchAutoFillResults(products));
        })
        .catch((error: { name?: string }) => {
          if (error?.name === "AbortError") {
            return;
          }
          dispatch(toggleSearchAutoFillResults([]));
        });
    }, DEBOUNCE_MS);
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
          onChange={handleSearch}
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

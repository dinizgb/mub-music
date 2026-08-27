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
  compact?: boolean;
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
    <div className={cn(props.compact && "relative w-full")}>
      <div
        className={cn(
          `group border-text-4 text-text-1 hover:bg-text-4 relative flex
          flex-row border-4 bg-transparent font-semibold outline-none`,
          props.compact
            ? `hover:border-text-4 focus-within:border-text-4 w-full
              items-center rounded-[8px] border-2 border-[#393d4b] px-3 py-2
              text-sm`
            : "w-[93%] rounded-[50px] px-[3%] py-5 text-[21px]",
          props.className
        )}
      >
        <Search
          className={cn(
            "text-text-4 group-hover:text-text-1 shrink-0",
            props.compact ? "h-4 w-4" : ""
          )}
        />
        <input
          className={cn(
            `text-text-4 group-hover:text-text-1 w-[96%] border-none
            bg-transparent font-semibold outline-none`,
            props.compact
              ? "rounded-[8px] px-2 text-sm"
              : "rounded-[50px] px-[2%] text-[21px]"
          )}
          placeholder={props.placeholder}
          onChange={handleSearch}
        />
      </div>
      <div
        className={cn(
          "bg-text-4 text-text-1 p-[2%]",
          props.compact
            ? `absolute top-full right-0 left-0 z-50 mt-1 w-full
              rounded-b-[8px]`
            : "relative z-1 mx-auto w-[86%] rounded-b-[20px]",
          searchAutoFillStatus ? "block" : "hidden"
        )}
      >
        <SearchAutoFillResultList data={searchAutoFillResultsStatus} />
      </div>
    </div>
  );
}

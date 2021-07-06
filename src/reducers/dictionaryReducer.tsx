import React from "react";
import {
  DATA_FETCHED,
  DATA_FETCHING_STARTS,
  ERROR,
  UPDATE_LANG,
  UPDATE_SEARCH,
} from "../actions/types";
import { Result } from "../context/DictionaryContext";

type State = {
  results: Result[];
  search: string;
  lang: string;
  error: string;
  isLoading: boolean;
};
type Response = any[];

type Action =
  | {
      type: "DATA_FETCHED";
      payload: Response;
    }
  | { type: "ERROR"; payload: string }
  | { type: "UPDATE_SEARCH"; payload: string }
  | { type: "UPDATE_LANG"; payload: string }
  | { type: "DATA_FETCHING_STARTS" };

const dictionaryReducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case DATA_FETCHED:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
      };
    case DATA_FETCHING_STARTS:
      return {
        ...state,
        results: [],
        isLoading: true,
        error: "",
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case UPDATE_LANG:
      return {
        ...state,
        lang: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default dictionaryReducer;

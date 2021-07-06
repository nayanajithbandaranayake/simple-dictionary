import React from "react";
import { useReducer, useContext } from "react";
import {
  DATA_FETCHED,
  DATA_FETCHING_STARTS,
  ERROR,
  UPDATE_LANG,
  UPDATE_SEARCH,
} from "../actions/types";
import dictionaryReducer from "../reducers/dictionaryReducer";

interface Props {
  children: React.ReactNode;
}

export type Result = {
  word: string;
  phonetics: { text: string; audio: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
      example: string;
    }[];
  }[];
};

type Value = {
  results: Result[];
  search: string;
  lang: string;
  error: string;
  isLoading: boolean;
  fetchResults: (search: string, lang: string) => Promise<void>;
  updateLang: React.ChangeEventHandler<HTMLSelectElement>;
  updateSearch: (text: string) => void;
};

const dictionaryContext = React.createContext<Value | null>(null);

const DictionaryContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(dictionaryReducer, {
    results: [],
    search: "",
    lang: "en_US",
    error: "",
    isLoading: false,
  });

  const fetchResults = async (search: string, lang: string) => {
    dispatch({ type: DATA_FETCHING_STARTS });
    if (!state.search) {
      dispatch({ type: ERROR, payload: "Enter a word to search!" });
      return;
    }
    console.log(process.env.REACT_APP_BACKEND);
    try {
      const { REACT_APP_BACKEND } = process.env;
      const response = await fetch(
        `${REACT_APP_BACKEND}?lang=${lang}&search=${search}`
      );
      const data = await response.json();
      if (data.title) {
        dispatch({ type: ERROR, payload: "No definition found." });
      } else {
        dispatch({ type: DATA_FETCHED, payload: data });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  };

  const updateSearch = (text: string) => {
    dispatch({ type: UPDATE_SEARCH, payload: text });
  };

  const updateLang: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    switch (value) {
      case "English (UK)":
        dispatch({ type: UPDATE_LANG, payload: "en_GB" });
        break;
      case "German":
        dispatch({ type: UPDATE_LANG, payload: "de" });
        break;
      case "Japanese":
        dispatch({ type: UPDATE_LANG, payload: "ja" });
        break;
      case "Russian":
        dispatch({ type: UPDATE_LANG, payload: "ru" });
        break;
      case "French":
        dispatch({ type: UPDATE_LANG, payload: "fr" });
        break;
      case "Spanish":
        dispatch({ type: UPDATE_LANG, payload: "es" });
        break;
      case "Korean":
        dispatch({ type: UPDATE_LANG, payload: "ko" });
        break;
      case "Hindi":
        dispatch({ type: UPDATE_LANG, payload: "hi" });
        break;

      default:
        dispatch({ type: UPDATE_LANG, payload: "en_US" });
        break;
    }
  };

  return (
    <dictionaryContext.Provider
      value={{ ...state, fetchResults, updateSearch, updateLang }}
    >
      {children}
    </dictionaryContext.Provider>
  );
};

export const useDictionaryContext = () => {
  return useContext(dictionaryContext);
};

export default DictionaryContextProvider;

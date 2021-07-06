import React from "react";
import SearchField from "./SearchField";
import ResultContainer from "./ResultContainer";
import { useDictionaryContext } from "../context/DictionaryContext";

const Dictionary = () => {
  const value = useDictionaryContext()!;

  return (
    <section className="dictionary">
      <SearchField />
      <ResultContainer />
    </section>
  );
};

export default Dictionary;

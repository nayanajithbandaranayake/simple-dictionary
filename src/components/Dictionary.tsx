import React from "react";
import SearchField from "./SearchField";
import ResultContainer from "./ResultContainer";

const Dictionary = () => {
  return (
    <section className="dictionary">
      <SearchField />
      <ResultContainer />
    </section>
  );
};

export default Dictionary;

import React from "react";
import { useDictionaryContext } from "../context/DictionaryContext";

const SearchField = () => {
  const value = useDictionaryContext()!;
  const { fetchResults, updateLang, updateSearch, search, lang } = value;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchResults(search, lang);
      }}
      className="form"
    >
      <div className="lang-container">
        <label htmlFor="select">Language : </label>
        <select id="select" onChange={updateLang}>
          <option>English (US)</option>
          <option>English (UK)</option>
          <option>German</option>
          <option>Spanish</option>
          <option>French</option>
          <option>Russian</option>
          <option>Japanese</option>
          <option>Korean</option>
          <option>Hindi</option>
        </select>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchField;

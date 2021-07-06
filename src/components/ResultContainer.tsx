import React from "react";
import { useDictionaryContext } from "../context/DictionaryContext";
import { ImSpinner8 } from "react-icons/im";
import { GiSpeaker } from "react-icons/gi";
import Result from "./Result";

const ResultContainer = () => {
  const value = useDictionaryContext()!;
  const { results, error, isLoading } = value;

  if (isLoading) {
    return (
      <section className="section-center loading-container">
        <ImSpinner8 className="spinner" />
        <h3>Loading...</h3>
      </section>
    );
  }

  if (results.length === 0 && !error) {
    return (
      <section className="section-center quick-guide">
        <h2>Quick Guide</h2>
        <p>
          Simple Dictionary is a place where you can find definitions for words
          that you don't know or you don't understand.
        </p>
        <p>
          You will get the definitions from the very language you choose up top.
        </p>
      </section>
    );
  }
  if (error) {
    return (
      <section className="section-center error-container">
        <h3>{error}</h3>
        {error !== "Enter a word to search!" && (
          <p>Check the spellings and also the language.</p>
        )}
      </section>
    );
  }

  const { meanings, phonetics, word } = results[0];
  let id = 0;
  return (
    <section className="results-container">
      <h3>{word}</h3>

      {phonetics[0].text &&
        phonetics.map((phonetic, index) => {
          const audio = new Audio(phonetic.audio);
          return (
            <div className="pronounce-container" key={index}>
              <p className="pronounce">{phonetic.text}</p>
              {phonetic.audio && (
                <button
                  type="button"
                  className="voice-btn"
                  onClick={() => {
                    audio.play();
                  }}
                >
                  <GiSpeaker />
                </button>
              )}
            </div>
          );
        })}
      {meanings.map((mean) => {
        id++;
        return <Result key={id} {...mean} number={id} />;
      })}
    </section>
  );
};

export default ResultContainer;

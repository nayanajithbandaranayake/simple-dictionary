import React from "react";

interface Props {
  number: number;
  partOfSpeech: string;
  definitions: {
    definition: string;
    example: string;
  }[];
}

const Result: React.FC<Props> = ({ partOfSpeech, definitions, number }) => {
  return (
    <article className="result">
      <div className="number">{number}</div>
      <div className="wordclass-container">
        <span>Part of speech : </span>
        <p>{partOfSpeech}</p>
      </div>
      <div>
        <span>Definitions : </span>
        {definitions.map((def, index) => {
          const { definition, example } = def;
          return (
            <div className="definition-container" key={index}>
              <p className="definition">{definition}</p>
              <p className="example">ex : {example}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default Result;

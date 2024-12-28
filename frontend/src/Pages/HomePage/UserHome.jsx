import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWordDefinition } from "../../AxiosRequests/getWordDefinition";
import { saveVocabDefinition } from "../../AxiosRequests/saveVocabDefinition";

// when they click on the definition I want it to bring up a button to add it to your words to review, if they then click this button it's added to the curSessionWords.
// While there are words in the curSessionWords I want there to be a big "END SESSION" button that appears and when this button is clicked thats when it compiles like questions and stuff to quiz you on these new words that you learned

export default function UserHome() {
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [vocabWord, setVocabWord] = useState("");
  const [vocabDefinitions, setVocabDefinitions] = useState([]);
  const curUserId = useSelector((state) => state.user.userId);
  const curSessionWords = useSelector((state) => state.vocab.vocabWords);
  const dispatch = useDispatch();

  const handleVocabWordChange = (event) => {
    setVocabWord(event.target.value);
  };
  return (
    <>
      <p>This is the homepage !</p>
      <input
        type="text"
        value={vocabWord}
        onChange={handleVocabWordChange}
        placeholder="enter a single word"
      ></input>
      <button onClick={() => getWordDefinition(vocabWord, setVocabDefinitions)}>
        SEARCH FOR A WORD
      </button>
      {vocabDefinitions.length > 0 ? (
        <div>
          <h3>Definitions:</h3>
          <ul>
            {vocabDefinitions.map((word, index) => (
              <li key={index} onClick={() => setSelectedDefinition(index)}>
                {word.definition}{" "}
                {selectedDefinition === index ? (
                  <button
                    onClick={() =>
                      saveVocabDefinition(
                        vocabWord,
                        word.definition,
                        curUserId,
                        index,
                        dispatch
                      )
                    }
                  >
                    add to review
                  </button>
                ) : (
                  <></>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No definitions found. Try searching for a word!</p>
      )}
      {Object.keys(curSessionWords).length > 0 ? (
        <button>End Session</button>
      ) : (
        <></>
      )}
    </>
  );
}

import axios from "axios";
import { vocabActions } from "../Stores/vocabStore";

export async function saveVocabDefinition(
  vocabWord,
  definition,
  curUserId,
  index,
  dispatch
) {
  try {
    if (curUserId) {
      //I need this to return the user_word_id to distinguish the different words in the current session
      const result = await axios.post(
        `http://localhost:5000/api/v1/vocab/word/${curUserId}/${vocabWord}/${index}`,
        { definition }
      );
      console.log("here is the result", result.data.user_word_id);
      dispatch(
        vocabActions.addVocabWord({
          user_word_id: result.data.user_word_id,
          definition,
          vocabWord,
        })
      );
    } else {
      console.error("please login or signup if you want to use this function");
      return;
    }
  } catch (err) {
    console.error(
      "error posting this definition to the database please try again later",
      err
    );
  }
}

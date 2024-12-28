import { createSlice } from "@reduxjs/toolkit";

const initialVocabState = {
  vocabWords: {},
};

const vocabSlice = createSlice({
  name: "vocab",
  initialState: initialVocabState,
  reducers: {
    addVocabWord(state, action) {
      console.log("here is it getting added", action.payload);
      state.vocabWords[action.payload.user_word_id] = action.payload;
    },
    removeVocabWord(state, action) {
      delete state.vocabWords[action.payload];
    },
  },
});

export const vocabActions = vocabSlice.actions;

export default vocabSlice.reducer;

// TODODODODO figure out how to use the env file on the frontend so then you can use a better dictionary api for this app

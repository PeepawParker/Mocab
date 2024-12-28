const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const vocabModel = require("../models/vocabModel");
const httpsRequests = require("../utils/httpsRequests");

// checks if this word exists in the backend already based on the word and index and if it doesnt then posts this to the backend and a link between this word and the user
exports.postUserVocabWord = catchAsync(async (req, res, next) => {
  const { word, curUserId, index } = req.params;
  const { definition } = req.body;

  try {
    let user_word_id;
    const wordId = await vocabModel.checkDefinitionExists(word, index);
    if (wordId) {
      user_word_id = await vocabModel.addUserWord(wordId.word_id, curUserId);
    } else {
      user_word_id = await vocabModel.postDefinition(
        word,
        index,
        definition,
        curUserId
      );
    }
    res.status(200).json({
      status: "success",
      user_word_id,
    });
  } catch (err) {
    return next(
      new AppError(
        `There was an error posting this users vocab word and definition ${err}`,
        404
      )
    );
  }
});

exports.getWordDefinitions = catchAsync(async (req, res, next) => {
  const { word } = req.params;
  const dotenv = require("dotenv");
  dotenv.config({ path: "../config.env" });
  try {
    const definitions = await httpsRequests.getRequest(
      `https://dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${process.env.MERRIAM_WEBSTER_API_KEY}`
    );

    res.status(200).json({
      status: "success",
      definitions,
    });
  } catch (err) {
    return next(
      new AppError(
        `There was an error getting the definition for this word please retype it ${err}`,
        404
      )
    );
  }
});

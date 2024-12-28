const express = require("express");

const vocabWordController = require("../controllers/vocabController");
const gptController = require("../controllers/gptController");
const router = express.Router();

router.post(
  "/word/:curUserId/:word/:index",
  vocabWordController.postUserVocabWord
);

router.get("/getDef/:word", vocabWordController.getWordDefinitions);

module.exports = router;

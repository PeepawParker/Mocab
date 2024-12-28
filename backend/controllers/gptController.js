const catchAsync = require("../utils/catchAsync");
const OpenAI = require("openai");

// we are definitly going to need a bunch of different options
// Some of the kind of questions im thinking right now are

//

// 1. Select the correct definition given the word ___
// 2. Select the correct word given the definition ___
// 3. use ___ in a sentence (this one would also require chat gpt to grade this to ensure it was using the word correctly)
// 4.

exports.getSessionQuiz = catchAsync(async (req, res, next) => {
  const openai = new OpenAI();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a quiz maker that receives definitions and in turn returns multiple choice answers or fill in the blank answers to help people understand the word and definitons better",
      },
    ],
  });
});

// if these arent working try giving a few examples so that the AI understands what youa re going for, dont worry about the token size or whatever for now just get it so it works to your liking

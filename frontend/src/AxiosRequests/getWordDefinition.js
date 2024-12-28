import axios from "axios";

// Function to display the results in a readable format
function printDefinitionsAndExamples(parsedData) {
  parsedData.forEach((item) => {
    if (item.senseNumber) {
      console.log(`\nSense ${item.senseNumber}:`);
    } else {
      console.log("\nDefinition:");
    }

    console.log(`- ${item.definition}`);

    if (item.examples.length > 0) {
      console.log("Examples:");
      item.examples.forEach((example) => {
        console.log(`  • ${example}`);
      });
    }
  });
}

export async function getWordDefinition(word, setVocabDefinitions) {
  try {
    console.log("pending");
    const definitions = await axios.get(
      `http://localhost:5000/api/v1/vocab/getDef/${word}`
    );
    console.log(
      "here is the better words that it gave",
      definitions.data.definitions[0].def[0].sseq
    );
    // setVocabDefinitions(definitions.data.definitions.definitions);
  } catch (err) {
    console.error("error getting this words definition", err);
  }
}

// get a bunch of arrays

// for each array I want to do the following

// [0][1].dt

//then from here I want to get both .dt[0] and .dt[1] to get the definition and sentence to go with

const pool = require("../database/index");

exports.checkDefinitionExists = async (word, index) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT word_id FROM words 
       WHERE word = $1 AND index = $2`,
      [word, index]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

exports.postDefinition = async (word, index, definition, curUserId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `INSERT INTO words (word, definition, index) 
       VALUES ($1,$2,$3) 
       RETURNING word_id`,
      [word, definition, index]
    );

    const resultId = await client.query(
      `INSERT INTO user_words (user_id, word_id) 
       VALUES ($1,$2) 
       RETURNING user_word_id`,
      [curUserId, result.rows[0].word_id]
    );
    await client.query("COMMIT");

    return resultId.rows[0].user_word_id;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

exports.addUserWord = async (word, curUserId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO user_words (user_id, word_id) 
       VALUES ($1, $2) 
       ON CONFLICT (user_id, word_id) 
       DO UPDATE SET user_id = EXCLUDED.user_id 
       RETURNING user_word_id`,
      [curUserId, word]
    );
    return result.rows[0].user_word_id;
  } finally {
    client.release();
  }
};

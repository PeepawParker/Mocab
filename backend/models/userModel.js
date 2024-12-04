const pool = require("../database/index");

exports.getUserByEmail = async (email) => {
  const client = await pool.connect();
  try {
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return user.rows[0];
  } finally {
    client.release();
  }
};

exports.getUserByUsername = async (username) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

exports.getUserById = async (userId) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );
    return result.rows[0]; // Return user data
  } finally {
    client.release();
  }
};

exports.postNewUser = async (newUser) => {
  const { username, hashedPassword, email } = newUser;
  const client = await pool.connect();
  try {
    const userMade = await client.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, email]
    );
    if (userMade) return userMade.rows[0];
  } finally {
    client.release();
  }
};

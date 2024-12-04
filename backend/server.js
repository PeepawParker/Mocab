const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const { server } = require("./app");
const pool = require("./database/index");

const port = process.env.PORT || 5000;

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log(
      "Database connection successful. Server time is:",
      res.rows[0].now
    );
  }
});

server.listen(port, () => console.log(`Server running on port ${port}`));

// import pg and store as variable
const pg = require("pg");

// set up pg to connect to the database
// we use pool as our connection between server and database
// pg is the dependency that interacts with pool
const pool = new pg.Pool({
  //name the database
  database: "Koala_Holla",
  // Where is your database? localhost === on your computer
  host: "localhost",
  // Postgres listening on port 5432
  port: 5432,
});

// export pool
module.exports = pool;

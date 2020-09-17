require("dotenv").config();
const { Pool } = require("pg");

const { PG_URI } = process.env;
const pool = new Pool({
  connectionString: "postgres://zfumxfwb:0PNXwsB496tVxPq3HDpv_At_HmY4clq3@lallah.db.elephantsql.com:5432/zfumxfwb",
});

/*
https://node-postgres.com/guides/project-structure
https://sp.postgresqltutorial.com/wp-content/uploads/2018/03/PostgreSQL-Cheat-Sheet.pdf
*/

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};

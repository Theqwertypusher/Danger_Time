const path = require("path");
const db = require("../db/databaseIndex.js");
const datacontroller = {};

//psql cheat sheet https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546

/* Timestamp for psql
https://www.sqlservertutorial.net/sql-server-date-functions/sql-server-current_time-function/
*/

/* 6) - data pull[https://mdbootstrap.com/docs/react/advanced/charts/](https://mdbootstrap.com/docs/react/advanced/charts/)
get historical data from database , will be default time (we will test to determine later)
api = /historicaldata
req.body = will hold URL
res.locals = will send back 2 arrays
A)all the times URL was pinged
B)all the status codes */
// getData 5 -query the database for times and status code for url given in req.body, then save to res.locals and send back a res contiaing res.locals
//return an array objects with the status, time

datacontroller.getData = (req, res, next) => {
  console.log("hello from datacontroller");
  console.log("datacontroller req body", req.body);
  const { url_id } = req.body;
  if (!url_id) {
    return next({
      log:
        "Express error handler caught error in datacontroller.getData receiving post request from client",
      status: 400,
      message: { err: "Error receiving request" },
    });
  }
  const params = [url_id];
  //descending? because we want highest numbers
  const selectStatus = `SELECT status, time FROM status 
    WHERE url_id = $1 `;
  const allStatus = "SELECT * FROM status;";
  db.query(selectStatus, params)
    //will receive an array of objects (called row), each object will correspond to a row, save to res.locals.rows
    .then((data) => {
      // console.log("datacontroller query res", data);
      res.locals.data = data;
      return next();
    })
    .catch((error) =>
      next({
        log:
          "Express error handler caught error receiving data from database in datacontroller.getData",
        status: 400,
        message: { err: error },
      })
    );
};

module.exports = datacontroller;

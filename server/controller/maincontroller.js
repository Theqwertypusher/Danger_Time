/* eslint-disable prefer-destructuring */
const path = require('path');
const fs = require('fs');

const maincontroller = {};
const fetch = require('node-fetch');
const db = require('../db/databaseIndex.js');

// test api - https://pokeapi.co/api/v2/pokemon/ditto

/* Need to import node library if we want to use fetch in the backend */

// SAVE NEW URL TO DATABASE
maincontroller.saveUrl = (req, res, next) => {
  console.log('main.controller.saveURL - inside');
  const user_id = 42;
  const saveUrl = 'INSERT INTO url (user_id, url) VALUES ($1, $2) RETURNING url_id';
  const params = [user_id, req.body.url];

  db.query(saveUrl, params)
    .then((result) => {
      res.locals.url_id = result.rows[0].url_id;
      return next();
    })
    .catch((error) => next({
      log: 'Query error in maincontroller.saveURL',
      status: 400,
      message: { err: error },
    }));
};

// CHECK API URL STATUS...returned object is 200 status else 400
maincontroller.pingUrl = (req, res, next) => {
  console.log('main.controller pingURL - inside');

  fetch(req.body.url)
    .then((response) => response.json())
    .then((result) => {
      if (typeof result === 'object') res.locals.status = '200';
      else res.locals.status = '400';
      console.log(res.locals.status);
      return next();
    })
    .catch((error) => next({
      log: 'Fetch error in maincontroller.pingUrl',
      status: 400,
      message: { err: error },
    }));
};

/* Adds URL attributes to Postgres, but also sends back status
to the client so that we can keep track in state */

// ADD NEW URL STATUS RECORD IN DATABASE
maincontroller.addStatus = (req, res, next) => {
  console.log('main.controller addStatus - inside');

  const addStatus = 'INSERT INTO status (url_id,status,time) VALUES ($1, $2, $3)';
  const params = [res.locals.url_id || req.body.url_id, res.locals.status, Date.now()];

  db.query(addStatus, params)
    .then(() => {
      console.log('inside maincontroller.Update Status Table query');
      return next();
    })
    .catch((error) => next({
      log: 'Query error in maincontroller.addStatus',
      status: 400,
      message: { err: error },
    }));
};



/* ITERATION OPTION: TASK SCHEDULER MIDDLEWARE */


maincontroller.startTasks = () => {
  return maincontroller.pingAll('test');
  const allUrls = 'SELECT url_id,url FROM url';

  db.query(allUrls)
    .then((urlCollection) => {
      this.pingAll(urlCollection.rows);
    })// MAKE SURE url IS LOWERCASE ON FRONTEND REQUEST OBJECT
    .catch((error) => console.log('Error in Task Schduler query: ', error));
};

maincontroller.pingAll = (urlArr) => {
  return maincontroller.saveStatus(urlArr);
  for (let i = 0; i < UrlArr.length; i++) {
    fetch(urlArr[i.url])
      .then((data) => data.json())
      .then((response) => {
        urlArr[i.status] = response.status;
        this.saveStatus(urlArr);
      })
      .catch((error) => console.log('Error in Task Schduler query: ', error));
  }
};

maincontroller.saveStatus = (updatedUrlArr) => {
  return console.log(updatedUrlArr);
  for (let i = 0; i < updatedUrlArr.length; i++) {
    const time = Date.now();
    const urlId = updatedUrlArr[i.url_id];
    const status = updatedUrlArr[i.status];
    const updateStatusTable = 'INSERT INTO status (url_id,status,time) VALUES ($1, $2, $3) RETURNING';
    db.query(updateStatusTable, [urlId, status, time])
      .then(() => {
        console.log('Ping task completed: ', time);
      })
      .catch((error) => console.log('Error in Task Schduler query: ', error));
  }
};

/* Readme/Resources */

/* Timestamp for psql
https://www.sqlservertutorial.net/sql-server-date-functions/sql-server-current_time-function/
*/

/* getstatus - to be used inside middleware and node-cron
input is URL or array of URLs to ping
pings URL, saves to database
output is received status code
saveToDb - include our query to save to database, parameter will be status returned from api ping
https://www.restapitutorial.com/httpstatuscodes.html
*/

/* 3) user adds in URL that they want to track
api= /addURL
req.body = will hold URL
res.status of 200 or error
default interval every hour
backend timer: [https://nodejs.org/en/docs/guides/timers-in-node/](https://nodejs.org/en/docs/guides/timers-in-node/)
twillio API for text messages */

// Login
// cam hello -> 7yxf, bcrypt adds salt register
// updateInterval - update interval in database

/* 6) - data pull[https://mdbootstrap.com/docs/react/advanced/charts/](https://mdbootstrap.com/docs/react/advanced/charts/)
get historical data from database , will be default time (we will test to determine later)
api = /historicaldata
req.body = will hold URL
res.locals = will send back 2 arrays
A)all the times URL was pinged
B)all the status codes */
// getData 5 -query the database for times and status code for url given in req.body, then save to res.locals and send back a res contiaing res.locals

maincontroller.test = (req, res, next) => {
  console.log('test')
}


maincontroller.updateInterval = (req, res, next) => {
  console.log('main.controller updateInterval - inside')

  const intervalObj = setInterval(() => {

    console.log('setInterval - inside')
    maincontroller.test()
    next()
    // maincontroller.pingUrl()
    // maincontroller.saveStatus()

  }, 3000)
  
  next();
};




maincontroller.getData = (req, res, next) => {
  next();
};

module.exports = maincontroller;

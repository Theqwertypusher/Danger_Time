const express = require("express");
const maincontroller = require("../controller/maincontroller");

/* Iterate Option: We didn't get to this, but these are the controllers if we had authentication */
const authcontroller = require("../controller/authcontroller");
const router = express.Router();

/* Default timer pings all urls in the db every hour */
// 1) query all urls from the db  queryAll
// 2) ping all of them  pingAll
// 3) save status to db saveStatus
const cron = require("node-cron");
//cron.schedule('* * * * * *', maincontroller.startTasks);

/* Iterate Option: We didn't get to this, we would like incorporate Twilio API when the endpoints goes down */

/* Twilio express sms docs
https://www.twilio.com/docs/sms/tutorials/how-to-send-sms-messages-node-js
*/

// This is the router for the ADD Endpoint Button
// post request
// saveUrl - store URL in database
// pingUrlInterval - A- retrieve URL and interval from database,
// B-set timer to ping URL, C-send message to twilio if status is not 200,
// D- save status code and time in database
// send to client success message so client can render URL component
router.post(
  "/addURL",
  maincontroller.saveUrl,
  maincontroller.pingUrl,
  maincontroller.addStatus,
  (req, res) => {
    console.log('finished addURL')
    res.status(200).json({status: res.locals.status, url_id: res.locals.url_id})
  });

/* Once a URL is added, this route handles the functionality of clicking checkNow to check status at any time */
router.post(
  "/checkNow",
  maincontroller.pingUrl,
  maincontroller.addStatus,
  (req, res) => {
    res.status(200).json({ status: res.locals.status });
  });

/* STRETCH */

/* Provide more visual context for each endpoint, user clicks and historical graphs are shown */
/* 6) - data pull[https://mdbootstrap.com/docs/react/advanced/charts/](https://mdbootstrap.com/docs/react/advanced/charts/)
get historical data from database , will be default time (we will test to determine later)
api = /historicaldata
req.body = will hold URL
res.locals = will send back 2 arrays
A)all the times URL was pinged
B)all the status codes */
// getData 5 -query the database for times and status code for url given in req.body,
// then save to res.locals and send back a res contiaing res.locals

// router.get('/historicalData', maincontroller.getData, (req, res) => {
//   res.status(200).send('test');
// });

/* 4) api= /interval
time will be req.body */
// put request (to update interval)
// updateInterval - update interval in database
// pingURLInterval - A- retrieve URL and interval from database,
// B-set timer to ping URL, C-send message to twilio if status is not 200,
// D- save status code and time in database




// START INTERVAL when component mounts? 
router.put('/interval', 
  maincontroller.updateInterval,
  (req, res) => {
      res.status(200).send('Interval successfully changed');
    });

// GET HISTORY?  
router.get('/historicalData', 
  maincontroller.getData, 
  (req, res) => {
res.status(200).send('test');
});

module.exports = router;

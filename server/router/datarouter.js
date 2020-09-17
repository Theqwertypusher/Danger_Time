const express = require("express");
const router = express.Router();
const datacontroller = require("../controller/datacontroller");

/* Provide more visual context for each endpoint, user clicks and historical graphs are shown*/
/* 6) - data pull[https://mdbootstrap.com/docs/react/advanced/charts/](https://mdbootstrap.com/docs/react/advanced/charts/)
get historical data from database , will be default time (we will test to determine later)
api = /historicaldata
req.body = will hold URL
res.locals = will send back 2 arrays
A)all the times URL was pinged
B)all the status codes */
// getData 5 -query the database for times and status code for url given in req.body, then save to res.locals and send back a res contiaing res.locals

router.post("*", datacontroller.getdata, (req, res) => {
  res.status(200).send("hello");
});

module.exports = router;

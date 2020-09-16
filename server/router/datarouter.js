const express = require('express');
const router = require("router");
const datacontroller = require(''../controller/datacontroller');


/* Provide more visual context for each endpoint, user clicks and historical graphs are shown*/
/* 6) - data pull[https://mdbootstrap.com/docs/react/advanced/charts/](https://mdbootstrap.com/docs/react/advanced/charts/)
get historical data from database , will be default time (we will test to determine later)
api = /historicaldata
req.body = will hold URL
res.locals = will send back 2 arrays
A)all the times URL was pinged
B)all the status codes */
// getData 5 -query the database for times and status code for url given in req.body, then save to res.locals and send back a res contiaing res.locals


router.get('/', datacontroller.getdata, (req, res) => {
    res.status(200).json('data');
});

module.exports = router;

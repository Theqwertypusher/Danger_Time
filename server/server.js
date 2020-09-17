const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3333;
const path = require('path');

/* required routers */
const authrouter = require('./router/authrouter');
const mainrouter = require('./router/mainrouter');
const datarouter = require('./router/datarouter');

/* CORS middleware to prevent CORS policy during POST */
app.use(cors());

/**
 * Automatically parse urlencoded body content from incoming requests and place it
 * in req.body
 * https://www.npmjs.com/package/body-parser
 */
app.use(express.urlencoded({ extended: true }));
// use express.json instead of bodyparser (bodyparser is deprecated)
app.use(express.json());

app.use(express.static(path.resolve(__dirname, './../client')));

app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://localhost:3333',
  ],
}));

// request to '/', redirect to /authrouter (same as request to /register)
app.use('/', authrouter);

// handle authentication requests
// server recieves request to /auth/login or /auth/register, then direct to /authrouter
app.use('/auth', authrouter);

// handle all other requests
// receive requests for /main/data
app.use('/main/data', datarouter);
// receive request for /main/historicaldata, /main/addURL, /main/interval, /main/checknow, then direct to /mainrouter
app.use('/main', mainrouter);

// request to '/', redirect to /authrouter (same as request to /register)
app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// handle unknown path
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 400,
    message: { err: 'an error occured' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log('error', errorObj.log);
  res.status(errorObj.status || 500).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;

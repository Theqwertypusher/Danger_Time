import axios from "axios";
import * as types from "../constants/actionTypes";

// ADD API URL TO DATABASE
export const addURL = (username, url) => (dispatch) => {
  axios
    .post("/main/addURL", { url })
    .then((result) => {
      dispatch({
        type: types.FINISHED_URL_ADD,
        payload: {
          username,
          url,
          url_id: result.data.url_id,
          status: result.data.status,
        },
      });
    })
    .catch((err) => console.log("addURL action ERROR", err));
};

// GET UPDATED API URL STATUS
export const checkStatus = (url, url_id) => (dispatch) => {
  // **INSERT API URL**
  axios
    .post("/main/checkStatus", { url: url, url_id: url_id })
    .then((result) => {
      console.log("inside checkStatus action POST");
      dispatch({
        type: types.CHECK_NOW,
        payload: {},
      });
    })
    .catch((err) => console.log("checkStatus action ERROR", err));
};

const checkStatusStarted = () => ({
  type: types.CHECK_STATUS_STARTED,
  payload: true,
});

const checkStatusFinished = () => ({
  type: types.CHECK_STATUS_FINISHED,
  payload: true,
});

const checkStatusError = () => ({
  type: types.CHECK_STATUS_ERROR,
  payload: true,
});

export const finishedUrlAdd = (addedUrlObj) => ({});

// Graph data actions
export const loadGraphData = (url_id) => (dispatch) => {
  axios
    .post("/main/data", {
      url_id,
    })
    .then((data) => {
      console.log("data for graph: ", data);
      const graphData = data.data.rows;
      dispatch({
        type: "LOAD_GRAPH_DATA",
        payload: graphData,
      });
    })
    .catch((error) => {
      console.log("error message", error);
    });
};

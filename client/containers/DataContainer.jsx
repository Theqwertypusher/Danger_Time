import Axios from "axios";
import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { loadGraphData } from "../actions/action";
import { Graph } from '../components/graph/graph';

//this component sit on top of maincontainer or app and will hold boxes

const mapStateToProps = (state) => ({
  currentUser: state.outputs.currentUser,
  urlList: state.outputs.urlList,
  graphData: state.graphData,
});
//dummy url-id: 75 (in database)
const url_id = 75;
//rows of data, lets user choose how many rows of data they want to visualize
const rows = 50;

const mapDispatchToProps = (dispatch) => ({});

class DataContainer extends Component {
  constructor(props) {
    super(props);
  }

  // SET INTERVAL
  // CLEAR INTERVAL


  //when user logs in, this component will pull data from database for each url that belongs to the user
  //send to backend url-id, and how many rows of data we want to retrieve
  //backend will send back
  componentDidMount() {
    // loadGraphData(url_id, rows);
  }

  render() {
    //conditional rendering of url data viz boxes, based on which user is logged in
    return (
      <div>
        HELLO!!!!
         <Graph graphData />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataContainer);

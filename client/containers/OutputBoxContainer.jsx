import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/action.js';
import OutputBox from '../components/OutputBox';

// const mapStateToProps = (state) => ({
//   urlList: state.outputs.urlList,
//   url_id: state.outputs.urlList[0].url_id,
//   url: state.outputs.urlList[0].url,
// });

// const mapDispatchToProps = (dispatch) => ({
//   checkStatus: (statusObj) => dispatch(actions.checkStatus(statusObj)),
// });

const OutputBoxContainer = (props) => {
// class OutputBoxContainer extends Component {
  //   constructor(props) {
  //     super(props);
  //   }
  const { urlList, checkStatus } = props;
  const childrenList = urlList.map((el, idx) => (
    <OutputBox
        // component identifier
      key={idx}
        // STATE
      url_id={el.url_id}
      url={el.url}
      status={el.status}
        // DISPATCH ACTION
      checkStatus={checkStatus}
    />
  ));

  return (
    <div id="outputBox">
      {childrenList}
    </div>
  );
};

export default OutputBoxContainer;

import React, { Component } from 'react';

// turn into functional component
const OutputBox = (props) => {
  const {
    url_id, url, status, checkStatus,
  } = props;
  const statusIcon = status === '200'
    ? <i className="fa fa-check-square" aria-hidden="true" />
    : <i className="fa fa-minus-square" aria-hidden="true" />;
  // 3 buttons: status (current), set interval on API status, historical data
  return (
    <div id="boxes">
      <div url_id={url_id}>
        url:
        {' '}
        {url}
        <br />
        status:
        {' '}
        {status}
        {statusIcon}
        <br />
        <br />
        <button
          type="button"
          onClick={() => checkStatus(url_id, url)}
        >
          check now
        </button>
      </div>
    </div>
  );
};

export default OutputBox;

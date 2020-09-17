import * as types from "../constants/actionTypes";

const initialState = {
  /* Dummy Data this would be for pulling from DB */
  urlList: [
    {
      username: "Lucy",
      url: "www.yahoo.com",
      status: 400,
      url_id: 80,
    },
    {
      username: "Chris",
      url: "www.coinbase.com",
      status: 400,
      url_id: 81,
    },
    {
      username: "Joon",
      url: "www.facebook.com",
      status: 400,
      url_id: 90,
    },
  ],
  newEndpoint: "",
  status: "",
  currentUser: "",
  graphData: [],
};

const outputReducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.ADD_URL:

    //   const newURLobj = action.payload;
    //   let copyUrlList = state.urlList.slice();
    //   copyUrlList.push(newURLobj);

    //   const newStatus = action.payload.status;

    //   return {
    //     ...state,
    //     status: newStatus,
    //   };

    case types.CHECK_NOW: {
      const newStatusObj = action.payload;
      // console.log(newStatusObj);
      const copyUrlList = state.urlList.slice();

      copyUrlList.forEach((item) => {
        if (item.url_id === newStatusObj.url_id) {
          item.status = newStatusObj.status;
        }
      });
      // console.log(copyUrlList);
      return {
        ...state,
        urlList: copyUrlList,
      };
    }

    case types.FINISHED_URL_ADD: {
      // copy the urlList and then add the new action payload (url, url_id, status, and username)
      const copyUrlList = state.urlList.slice();
      copyUrlList.push(action.payload);
      const { status } = action.payload;

      return {
        ...state,
        urlList: copyUrlList,
        status,
      };
    }
    case types.LOAD_GRAPH_DATA: {
      const newGraphData = action.payload;
      return {
        ...state,
        graphData: newGraphData,
      };
    }

    default:
      return state;
  }
};

export default outputReducer;

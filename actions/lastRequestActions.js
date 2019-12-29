import { SET_LAST_REQUEST,  SET_LAST_REQUEST_CLEAR } from '../reducers/lastRequestReducer'

export function sendCurrentArticleToLastRequests(articleState, requestString) {
  var article = new Object();
  return (dispatch) => {
    dispatch({ type: SET_LAST_REQUEST, payload: articleState})
  }
}

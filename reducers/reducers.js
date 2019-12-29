import { combineReducers } from 'redux'
import articlesState from './articlesReducer'
import lastRequests from './lastRequestReducer'

const reducers = combineReducers({
  articlesState: articlesState,
  lastRequests: lastRequests
})

export default reducers
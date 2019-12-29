export const SET_LAST_REQUEST = "SET_LAST_REQUEST"
export const SET_LAST_REQUEST_CLEAR = "SET_LAST_REQUEST_CLEAR"

const initialState = {
  lastRequests: [],
}

const lastRequests = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAST_REQUEST:
      if (state.lastRequests.length >= 5) { // если последниъ запросов >= 5 убирать самый старый и записывать новый
        return {
          ...state,
          lastRequests: [...state.lastRequests.filter( (_,i) => 
              i !== 0
          ), action.payload], 
        }
      } else {
        return {
          ...state,
          lastRequests: [...state.lastRequests, action.payload]
        }
      }
    case SET_LAST_REQUEST_CLEAR:
      return {
        lastRequests: []
      }
    default:
      return state
  }
}

export default lastRequests
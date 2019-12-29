export const LOADING_ARTICLES = "LOADING_ARTICLES"
export const LOADED_ARTICLES = "LOADED_ARTICLES"
export const FAIL_LOAD_ARTICLES = "FAIL_LOAD_ARTICLES"

const initialState = {
    loading: false,
    articlesList: null,
    error: false,
    searchString: ''
}

const articlesState = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_ARTICLES:
            return {
                ...state,
                loading: true,
            }
        case LOADED_ARTICLES:
            return {
                ...state,
                loading: false,
                articlesList: action.payload.data,
                searchString: action.payload.searchString
            }
        case FAIL_LOAD_ARTICLES:
            return {
                ...state,
                loading: false,
                error: true,
            }
        default:
     
            return state
    }
}

export default articlesState
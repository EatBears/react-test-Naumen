import { LOADING_ARTICLES,  LOADED_ARTICLES, FAIL_LOAD_ARTICLES } from '../reducers/articlesReducer'
import axios from 'axios'

function setErrorArticlesLoad() {
  return { type: FAIL_LOAD_ARTICLES }
}

function setLoadingArticles() {
  return { type: LOADING_ARTICLES }
}

function setLoadedArticles(data) {
  return { type: LOADED_ARTICLES, payload: data }
}

export function fetchArticles(searchString) {
   var url = "https://ru.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        list: "search",
        srsearch: searchString,
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    return (dispatch) => {
        dispatch(setLoadingArticles())
        axios.get(url).then((response) => {
          if (response.status === 200) {
            dispatch(setLoadedArticles({data: response.data.query.search, searchString: searchString}))
          } else {
            dispatch(setErrorArticlesLoad())
          }
        })
    }
}

export function loadArticlesFromHistory(articles) {
    return (dispatch) => {
        dispatch(setLoadingArticles())
        dispatch(setLoadedArticles({data: articles.articlesList, searchString: articles.searchString}))
    }
}

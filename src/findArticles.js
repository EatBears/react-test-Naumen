import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import './style.css';
import ListFoundedArticles from './lastArticles/listFoundedArticles'
import { connect } from 'react-redux'
import { fetchArticles } from './actions/articlesActions'
import { sendCurrentArticleToLastRequests } from './actions/lastRequestActions'
import LastArticles from './lastArticles/lastArticles'
import { loadArticlesFromHistory } from './actions/articlesActions.js'

class FindArticles extends Component {
  constructor() {
    super();
    this.state = {
      searchString: "",
      emptyFindString: false
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.listenerOnKeyPress)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.articlesState.articlesList !== this.props.articlesState.articlesList && prevProps.articlesState.articlesList !== null && prevProps.articlesState.articlesList.length > 0){
      this.props.sendCurrentArticleToLastRequests(prevProps.articlesState)
    }
  }

  listenerOnKeyPress = (event) => {
    if (event.key === 'Enter') {
      if(this.state.searchString === '') {
        this.setState({emptyFindString: true})
      } else {
        this.findInWikipedia()
      }
    }
  }

  changeSearchString = () => {
    this.setState({searchString: event.target.value})
  }

  loadArticlesFromStore = (article) => {
    this.setState({searchString: article.searchString})
    this.props.loadArticlesFromHistory(article)
  }
  
  findInWikipedia = () => {
    this.setState({emptyFindString: false})
    this.props.fetchArticles(this.state.searchString)
  }

  renderArticleList = (articlesState) => {
    if (articlesState.articlesList === null) {
      return <div className="status-message">Введите запрос!</div>
    } else if (Object.keys(articlesState.articlesList).length === 0) {
      return <div className="status-message">По вашему запросу ничего не найдено!</div>
    } else if (articlesState.loading) {
      return <div className="status-message">Подождите, идет загрузка...</div>
    } else if (articlesState.error) {
      return <div className="status-message">Произошла ошибка сервера</div>
    } else if (Object.keys(articlesState.articlesList).length > 0){
      return <ListFoundedArticles articles={articlesState.articlesList} />
    } else {
      return <div className="status-message">Пошло что-то совсем не так, обратитесь к специалисту</div>
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenerOnKeyPress)
  }

  render() {
    let { articlesState, lastRequests } = this.props
    return (
      <div>
      <div className="flex-container search-block">
        <div>
          <input onChange={this.changeSearchString} value={this.state.searchString} />
          <button onClick={this.findInWikipedia}>Найти!</button>
          
          {
            this.state.emptyFindString ? <div >Вы не ввели строку поиска!</div> : null
          }
        </div>
        <div>
          Последние введенные запросы:
          <LastArticles loadArticlesFromStore={this.loadArticlesFromStore} articles={lastRequests.lastRequests} />
        </div>
      </div>
          <div>
            {
              this.renderArticleList(articlesState)
            }
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: searchString => {
            dispatch(fetchArticles(searchString));
        },
        sendCurrentArticleToLastRequests: (articlesState, searchString) => {
          dispatch(sendCurrentArticleToLastRequests(articlesState, searchString))
        },
        loadArticlesFromHistory: article => {
            dispatch(loadArticlesFromHistory(article));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FindArticles)


import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import './style.css';
import renderHTML from 'react-render-html';

class Article extends Component {
  render() {
    let { article } = this.props 
    let dateArticle = new Date(Date.parse(article.timestamp))
    return (
      <div className="wrapper-article">
        <a target="_blank" href={"https://ru.wikipedia.org/?curid=" + article.pageid}>
        <div className="title" key={article.pageId}>{article.title}</div>
        </a>
        <p>
          {renderHTML(article.snippet)}
        </p>
        <div className="flex-container">
          <div>
            Последняя дата редактирования: {dateArticle.getDate() + '.' + ( dateArticle.getMonth() + 1 ) + '.' + dateArticle.getFullYear()}
          </div>
          <div>
            Кол-во слов в статье: {article.wordcount}
          </div>
        </div>
      </div>
    );
  }
}

export default Article

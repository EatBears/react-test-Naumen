import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import Article from './article'
import '../style.css';
import { connect } from 'react-redux'

class LastArticles extends Component {
  
  render() {
    let { articles } = this.props
    return (
      <div>
        {
          articles.slice(0).reverse().map(article => {
            return (
              <ul>
              <li className="last-articles" onClick={() => this.props.loadArticlesFromStore(article)}>{article.searchString}</li>
              </ul>
            )
          })
        }
      </div>
    );
  }
}



export default LastArticles

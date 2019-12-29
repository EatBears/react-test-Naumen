import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import Article from '../article/article'
import './style.css';

class ListFoundedArticles extends Component {
  
  render() {
    let { articles } = this.props
    return (
      <div>
        {
          Object.keys(articles).map(articleIndex => {
            let article = articles[articleIndex]
            return (
              <Article article={articles[articleIndex]} />
            )
          })
        }
      </div>
    );
  }
}

export default ListFoundedArticles

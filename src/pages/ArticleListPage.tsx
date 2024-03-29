import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./ArticleListPage.css";
import { Article } from "../types/Article";

export default function ArticleListPage() {
  const [isLoading, setLoading] = useState(false);
  const [articles, setArticles] = useState([] as Article[]);

  async function loadArticles() {
    setLoading(true);
    try {
      const articleData = await API.getArticles();
      setArticles(articleData);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div id="main">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ol>
          {articles.map((article) => {
            return (
              <li key={article.id}>
                <Link to={`/${article.id}`}>
                  <h1>{article.headline}</h1>
                  {/* Setting alt attribute to empty string to make the linter happy, but ideally we should be utilizing this to make it accessible to users w/ screen readers */}
                  <img src={article.imageUrl} alt=""/>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import "./ArticlePage.css";
import { Article } from "../types/Article";

export default function ArticlePage() {
  let { id } = useParams() as { id: string };

  const [isLoading, setLoading] = useState(false);
  const [article, setArticle] = useState({} as Article);
  const [error, setError] = useState(false);

  async function loadArticle() {
    setLoading(true);
    setError(false);
    try {
      const articleData = await API.getArticleById(id);
      setArticle(articleData);
    } catch (error) {
      setError(true);
      // TODO: More custom error handling here
      // if (error instanceof ArticleNotFoundError) {
      // }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArticle();
  }, []);

  function renderArticle() {
    if (error) {
      return <h1>Article not found. Please check the url or try again later</h1>;
    }

    return (
      <div id="article">
        <h1>{article.headline}</h1>
        {/* Setting alt attribute to empty string to make the linter happy, but ideally we should be utilizing this to make it accessible to users w/ screenreaders */}
        <img src={article.imageUrl} alt="" />
        <p>{article.body}</p>
      </div>
    );
  }

  return (
    <div id="article-container">
      <Link to={"/"}>Back to list</Link>
      {isLoading ? <h1>Loading...</h1> : renderArticle()}
    </div>
  );
}

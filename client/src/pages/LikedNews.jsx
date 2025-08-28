import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleCard } from '../components/ArticleCard';
import { useNavigate } from 'react-router-dom';
import './LikedNews.css';

const LikedNews = () => {
  const [likedArticles, setLikedArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      axios.get("http://localhost:5002/liked-articles", {
        headers: { Authorization: token }
      })
      .then((res) => {
        setLikedArticles(res.data.likedArticles);
      })
      .catch((err) => {
        console.error("Error fetching liked news:", err);
      });
    } else {
      const tempLikes = JSON.parse(localStorage.getItem("likedArticles")) || [];
      setLikedArticles(tempLikes);
    }
  }, []);

  return (
    <div className="liked-news-page">
      <button className="btn-back-home" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h3>❤️ Liked News</h3>
      {likedArticles.length === 0 && <p>No liked articles found.</p>}

      <div className="notes-grid">
        {likedArticles.map((article) => (
          <div className="note-card-wrapper" key={article.title}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedNews;

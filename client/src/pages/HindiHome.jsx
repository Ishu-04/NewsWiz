import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleCard } from '../components/ArticleCard';
import './Home.css';

const hindiCategories = {
  general: 'सामान्य',
  world: 'विश्व',
  nation: 'राष्ट्र',
  business: 'व्यापार',
  technology: 'प्रौद्योगिकी',
  entertainment: 'मनोरंजन',
  sports: 'खेल',
  science: 'विज्ञान',
  health: 'स्वास्थ्य',
  environment: 'पर्यावरण',
  education: 'शिक्षा',
  politics: 'राजनीति',
  crime: 'अपराध',
  travel: 'यात्रा'
};

const categoryKeywords = {
  crime: 'crime OR police OR theft OR murder OR investigation OR court',
  environment: 'climate OR pollution OR wildlife OR green energy',
  education: 'education OR school OR college OR exam OR teacher OR student',
  politics: 'politics OR election OR parliament OR democracy',
  travel: 'travel OR tourism OR vacation OR destination OR flights'
};

const HindiHome = () => {
  const [articles, setArticles] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const fetchNews = async (cat) => {
    setLoading(true);
    setError('');
    try {
      let url = `http://https://newswiz-backend.onrender.com/api/news?cat=${cat}&lang=hi`;
      if (categoryKeywords[cat]) {
        url = `http://https://newswiz-backend.onrender.com/api/news?keywords=${encodeURIComponent(categoryKeywords[cat])}&lang=hi`;
      }
      const res = await axios.get(url);
      setArticles(res.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("❌ समाचार लोड नहीं हो सके। कृपया सुनिश्चित करें कि सर्वर चल रहा है।");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (article) => {
    try {
      const res = await axios.post('http://localhost:5001/summarize', {
        content: article.content || article.description,
        lang: 'hi',
      });
      setSummaries((prev) => ({ ...prev, [article.title]: res.data.summary }));
    } catch (err) {
      console.error("सारांश त्रुटि:", err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-light sidebar p-4">
          <h4 className="text-primary fw-bold mb-4">📂 श्रेणियाँ</h4>
          <ul className="list-group">
            {Object.keys(hindiCategories).map((cat) => (
              <li
                key={cat}
                className={`list-group-item list-group-item-action ${
                  cat === category ? 'active text-white bg-primary border-primary' : ''
                }`}
                onClick={() => setCategory(cat)}
                style={{ textTransform: 'capitalize', cursor: 'pointer' }}
              >
                {hindiCategories[cat]}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 py-4 px-5 bg-light">
          <h2 className="mb-4 text-primary border-bottom pb-2">📰 न्यूज़विज - स्मार्ट भारतीय समाचार (हिंदी)</h2>

          <div className="d-flex justify-content-end mb-3">
            <a href="/" className="btn btn-outline-secondary">🌐 Switch to English</a>
          </div>

          {loading && <p className="text-info">⏳ समाचार लोड हो रहे हैं...</p>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row">
            {articles.length > 0 ? (
              articles.map((article) => (
                <div className="col-md-6 col-lg-4 mb-4" key={article.title}>
                  <ArticleCard
                    article={article}
                    summary={summaries[article.title]}
                    onSummarize={handleSummarize}
                    onBookmark={(a, n) => {
                      axios.post("http://https://newswiz-backend.onrender.com/save-note", {
                        token: localStorage.getItem("authToken"),
                        article: a,
                        note: n,
                      });
                    }}
                  />
                </div>
              ))
            ) : (
              !loading && <p className="text-muted">इस श्रेणी में कोई समाचार नहीं है।</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HindiHome;

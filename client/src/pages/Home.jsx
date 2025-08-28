// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ArticleCard } from '../components/ArticleCard';
// import './Home.css'; // Ensure this file exists and is linked

// const categories = [
//   "general", "world", "nation", "business", "technology", "entertainment",
//   "sports", "science", "health", "environment", "education",
//   "politics", "crime", "travel"
// ];

// const categoryKeywords = {
//   crime: 'crime OR police OR theft OR murder OR investigation OR court',
//   environment: 'climate OR pollution OR wildlife OR green energy',
//   education: 'education OR school OR college OR exam OR teacher OR student',
//   politics: 'politics OR election OR parliament OR democracy',
//   travel: 'travel OR tourism OR vacation OR destination OR flights'
// };

// const Home = () => {
//   const [articles, setArticles] = useState([]);
//   const [summaries, setSummaries] = useState({});
//   const [category, setCategory] = useState('general');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchNews(category);
//   }, [category]);

//   const fetchNews = async (cat) => {
//     setLoading(true);
//     setError('');

//     const userLang = localStorage.getItem('lang') || 'en';


//     try {
//       let url = `http://localhost:5002/api/news?cat=${cat}`;
//       if (categoryKeywords[cat]) {
//         url = `http://localhost:5002/api/news?keywords=${encodeURIComponent(categoryKeywords[cat])}`;
//       }
//       const res = await axios.get(url);
//       setArticles(res.data.articles);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setError("❌ Faisled to load news. Ensure the backend is running on port 5002.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSummarize = async (article) => {
//     try {
//       const res = await axios.post('http://localhost:5001/summarize', {
//         content: article.content || article.description
//       });
//       setSummaries((prev) => ({ ...prev, [article.title]: res.data.summary }));
//     } catch (err) {
//       console.error("Summarization error:", err);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row min-vh-100">
//         {/* Sidebar */}
//         <div className="col-md-3 col-lg-2 bg-light sidebar p-4">
//           <h4 className="text-primary fw-bold mb-4">📂 Categories</h4>
//           <ul className="list-group">
//             {categories.map((cat) => (
//               <li
//                 key={cat}
//                 className={`list-group-item list-group-item-action ${
//                   cat === category ? 'active text-white bg-primary border-primary' : ''
//                 }`}
//                 onClick={() => setCategory(cat)}
//                 style={{ textTransform: 'capitalize', cursor: 'pointer' }}
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 col-lg-10 py-4 px-5 bg-light">
//           <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b pb-2 border-blue-300">
//   📰 {localStorage.getItem('lang') === 'hi' ? 'न्यूज़विज़ - स्मार्ट भारतीय समाचार' : 'NewsWiz - Smart Indian News'}
// </h2>


//           {loading && <p className="text-info">⏳ Fetching the latest headlines...</p>}
//           {error && <div className="alert alert-danger">{error}</div>}

//           <div className="row">
//             {articles.length > 0 ? (
//               articles.map((article) => (
//                 <div className="col-md-6 col-lg-4 mb-4" key={article.title}>
//                   <ArticleCard
//                     article={article}
//                     summary={summaries[article.title]}
//                     onSummarize={handleSummarize}
//                     onBookmark={(a, n) => {
//                       axios.post("http://localhost:5002/save-note", {
//                         token: localStorage.getItem("authToken"),
//                         article: a,
//                         note: n,
//                       });
//                     }}
//                   />
//                 </div>
//               ))
//             ) : (
//               !loading && <p className="text-muted">No articles available for this category.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import { ArticleCard } from '../components/ArticleCard';
import './Home.css';

const categories = [
  { key: "general", en: "General", hi: "सामान्य" },
  { key: "world", en: "World", hi: "दुनिया" },
  { key: "nation", en: "Nation", hi: "देश" },
  { key: "business", en: "Business", hi: "व्यापार" },
  { key: "technology", en: "Technology", hi: "प्रौद्योगिकी" },
  { key: "entertainment", en: "Entertainment", hi: "मनोरंजन" },
  { key: "sports", en: "Sports", hi: "खेल" },
  { key: "science", en: "Science", hi: "विज्ञान" },
  { key: "health", en: "Health", hi: "स्वास्थ्य" },
  { key: "environment", en: "Environment", hi: "पर्यावरण" },
  { key: "education", en: "Education", hi: "शिक्षा" },
  { key: "politics", en: "Politics", hi: "राजनीति" },
  { key: "crime", en: "Crime", hi: "अपराध" },
  { key: "travel", en: "Travel", hi: "यात्रा" },
];

const categoryKeywords = {
  crime: 'crime OR police OR theft OR murder OR investigation OR court',
  environment: 'climate OR pollution OR wildlife OR green energy',
  education: 'education OR school OR college OR exam OR teacher OR student',
  politics: 'politics OR election OR parliament OR democracy',
  travel: 'travel OR tourism OR vacation OR destination OR flights'
};

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lang = localStorage.getItem('lang') || 'en';

  useEffect(() => {
    fetchNews(category);
  }, [category, lang]);

  const fetchNews = async (cat) => {
    setLoading(true);
    setError('');
    try {
      let url = `http://localhost:5002/api/news?cat=${cat}&lang=${lang}`;
      if (categoryKeywords[cat]) {
        url = `http://localhost:5002/api/news?keywords=${encodeURIComponent(categoryKeywords[cat])}&lang=${lang}`;
      }
      const res = await axios.get(url);
      setArticles(res.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(lang === 'hi' ? "समाचार लोड करने में विफल। कृपया सर्वर जांचें।" : "Failed to load news. Please check backend server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (article) => {
    try {
      const res = await axios.post('http://localhost:5001/summarize', {
        content: article.content || article.description
      });
      setSummaries((prev) => ({ ...prev, [article.title]: res.data.summary }));
    } catch (err) {
      console.error("Summarization error:", err);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside className="p-3 bg-light shadow" style={{ width: '220px', minHeight: '100vh' }}>
        <h5 className="mb-3 text-primary">{lang === 'hi' ? '📂 श्रेणियाँ' : '📂 Categories'}</h5>
        <ul className="list-group">
          {categories.map((cat) => (
            <li
              key={cat.key}
              className={`list-group-item list-group-item-action ${cat.key === category ? 'active' : ''}`}
              onClick={() => setCategory(cat.key)}
              style={{ cursor: 'pointer' }}
            >
              {lang === 'hi' ? cat.hi : cat.en}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-grow-1 p-4">
        <h2 className="mb-4 text-primary">
          {lang === 'hi' ? '📰 न्यूज़विज़ - स्मार्ट भारतीय समाचार' : '📰 NewsWiz - Smart Indian News'}
        </h2>

        {loading && <p className="text-info">{lang === 'hi' ? "समाचार लोड हो रहे हैं..." : "Fetching news..."}</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {articles.length > 0 ? (
          <Masonry
            breakpointCols={{ default: 2, 768: 1 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {articles.map((article) => (
              <div key={article.title} className="hover-card">
                <ArticleCard
                  article={article}
                  summary={summaries[article.title]}
                  onSummarize={handleSummarize}
                  onBookmark={(a, n) => {
                    axios.post("http://localhost:5002/save-note", {
                      token: localStorage.getItem("authToken"),
                      article: a,
                      note: n,
                    });
                  }}
                />
              </div>
            ))}
          </Masonry>
        ) : (
          !loading && <p className="text-muted">{lang === 'hi' ? "इस श्रेणी के लिए कोई समाचार उपलब्ध नहीं है।" : "No news available for this category."}</p>
        )}
      </main>
    </div>
  );
};

export default Home;

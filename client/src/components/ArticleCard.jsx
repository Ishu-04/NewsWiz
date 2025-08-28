// import React, { useState } from 'react';
// import './ArticleCard.css';

// export const ArticleCard = ({ article, summary, onSummarize, onBookmark }) => {
//   const [note, setNote] = useState('');
//   const [showNote, setShowNote] = useState(false);

//   if (!article) return null;

//   const handleTTS = () => {
//     const utterance = new SpeechSynthesisUtterance(summary || article.description || article.content || '');
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="card mb-4 p-3 shadow-sm">
//       <h5><strong>{article.title}</strong></h5>
//       <p>{article.description || article.content}</p>

//       <p className="text-muted">
//         <em>For more details, Click the Article button</em><br />
//         {article.url && (
//           <a className="btn btn-sm btn-outline-secondary mt-1" href={article.url} target="_blank" rel="noreferrer">
//             🔗 Article
//           </a>
//         )}
//       </p>

//       <p>
//         <strong>Source:</strong> {article.source?.name || 'Unknown'} <br />
//         <strong>Date:</strong> {article.publishedAt || article.pubDate || 'Unknown'} <br />
//         <strong>Language:</strong> {(article.language || 'en').toUpperCase()}
//       </p>

//       {/* 🧠 Summary Button */}
//       <button className="btn btn-primary mt-2 me-2" onClick={() => onSummarize(article)}>
//         🧠 Summarize
//       </button>

//       {/* 🔊 Audio Mode */}
//       {summary && (
//         <button className="btn btn-secondary mt-2" onClick={handleTTS}>
//           🔊 Listen
//         </button>
//       )}

//       {/* 📌 Save & Annotate */}
//       <button className="btn btn-outline-success mt-2 ms-2" onClick={() => setShowNote(!showNote)}>
//         📌 Save Note
//       </button>
//       {showNote && (
//         <div className="mt-2">
//           <textarea
//             className="form-control"
//             placeholder="Add your notes..."
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//           />
//           <button
//             className="btn btn-success mt-1"
//             onClick={() => {
//               onBookmark(article, note);
//               setShowNote(false);
//               setNote('');
//             }}
//           >
//             ✅ Save Note
//           </button>
//         </div>
//       )}

//       {/* 📝 Summary Section */}
//       {summary && (
//         <div className="mt-3 alert alert-info">
//           <strong>Summary:</strong> {summary}
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ArticleCard.css';

export const ArticleCard = ({ article, summary, onSummarize }) => {
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [translatedSummary, setTranslatedSummary] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');
  const [isLiked, setIsLiked] = useState(false);

  const isLoggedIn = !!localStorage.getItem('authToken');

  if (!article) return null;

  const handleTTS = () => {
    window.speechSynthesis.cancel();
    const textToSpeak = translatedSummary || summary || article.description || article.content || '';
    if (!textToSpeak) return;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:5001/translate', {
        text: summary,
        target_lang: selectedLang,
      });
      setTranslatedSummary(response.data.translatedText);
    } catch (error) {
      toast.error("Translation failed");
    }
  };

  const handleSaveNote = async () => {
    if (!note.trim()) {
      toast.warn("Note cannot be empty");
      return;
    }

    if (isLoggedIn) {
      try {
        await axios.post('http://localhost:5002/save-note', {
          token: localStorage.getItem("authToken"),
          article,
          note,
        });
        toast.success("Note saved successfully!");
      } catch {
        toast.error("Failed to save note");
      }
    } else {
      const saved = JSON.parse(localStorage.getItem("savedNotes") || "[]");
      saved.push({ article, note });
      localStorage.setItem("savedNotes", JSON.stringify(saved));
      toast.warning("Login to save notes permanently");
    }

    setNote('');
    setShowNote(false);
  };

  const handleLike = async () => {
    setIsLiked(true);

    if (isLoggedIn) {
      try {
        await axios.post("http://localhost:5002/like-article", {
          token: localStorage.getItem("authToken"),
          article,
        });
        toast.success("Article liked!");
      } catch {
        toast.error("Failed to like article");
      }
    } else {
      const liked = JSON.parse(localStorage.getItem("likedArticles") || "[]");
      liked.push(article);
      localStorage.setItem("likedArticles", JSON.stringify(liked));
      toast.warning("Login to save likes permanently");
    }
  };

  return (
    <div className="card mb-4 p-3 shadow-sm">
      <h5><strong>{article.title}</strong></h5>
      <p>{article.description || article.content}</p>

      <p className="text-muted">
        <em>For more details, Click the Article button</em><br />
        {article.url && (
          <a className="btn btn-sm btn-outline-secondary mt-1" href={article.url} target="_blank" rel="noreferrer">
            🔗 Article
          </a>
        )}
      </p>

      <p>
        <strong>Source:</strong> {article.source?.name || 'Unknown'} <br />
        <strong>Date:</strong> {article.publishedAt || article.pubDate || 'Unknown'} <br />
        <strong>Language:</strong> {(article.language || 'en').toUpperCase()}
      </p>

      <button className="btn btn-primary mt-2 me-2" onClick={() => onSummarize(article)}>
        🧠 Summarize
      </button>

      {summary && (
        <>
          <button className="btn btn-secondary mt-2 me-2" onClick={handleTTS}>🔊 Listen</button>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="form-select form-select-sm d-inline-block w-auto ms-2 mt-2"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
          <button className="btn btn-outline-info mt-2 ms-2" onClick={handleTranslate}>🌐 Translate</button>
          <button className="btn btn-outline-danger mt-2 ms-2" onClick={() => window.speechSynthesis.cancel()}>
            ❌ Stop
          </button>
        </>
      )}

      <button className="btn btn-outline-success mt-2 ms-2" onClick={() => setShowNote(!showNote)}>
        📌 {showNote ? 'Cancel' : 'Save Note'}
      </button>

      {showNote && (
        <div className="mt-2">
          <textarea
            className="form-control"
            placeholder="Add your notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="btn btn-success mt-1" onClick={handleSaveNote}>✅ Save Note</button>
        </div>
      )}

      <button className="btn btn-outline-danger mt-2 ms-2" onClick={handleLike} disabled={isLiked}>
        ❤️ {isLiked ? 'Liked' : 'Like'}
      </button>

      {summary && (
        <div className="mt-3 alert alert-info">
          <strong>Summary ({selectedLang === 'hi' ? 'हिन्दी' : 'English'}):</strong><br />
          {translatedSummary || summary}
        </div>
      )}
    </div>
  );
};



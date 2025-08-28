// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const Parser = require('rss-parser');

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/newswiz');

// const UserSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   savedNotes: [
//     {
//       article: Object,
//       note: String,
//     },
//   ],
//   likedNews: [Object], // ✅ added likedNews
// });
// const User = mongoose.model('User', UserSchema);

// const JWT_SECRET = 'newswiz_secret';
// const API_KEY = '1d0d36181c3348d21f7605845eb3e2f6';
// const parser = new Parser();

// const rssFeeds = {
//   education: 'https://www.indiatoday.in/rss/1206550',
//   environment: 'https://timesofindia.indiatimes.com/rssfeeds/2647163.cms',
//   politics: 'https://www.thehindu.com/news/national/feeder/default.rss',
//   travel: 'http://feeds.feedburner.com/ndtvtravel-latest',
// };

// app.get('/api/news', async (req, res) => {
//   const category = req.query.cat;
//   const keywords = req.query.keywords;
//   const lang = req.query.lang || 'en';

//   try {
//     let articles = [];

//     if (rssFeeds[category]) {
//       const feed = await parser.parseURL(rssFeeds[category]);
//       articles = feed.items.slice(0, 10).map(item => ({
//         title: item.title,
//         description: item.contentSnippet || item.content,
//         content: item.content || '',
//         url: item.link,
//         image: item.enclosure?.url || '',
//         publishedAt: item.pubDate,
//         source: { name: feed.title, url: feed.link },
//       }));
//     } else {
//       const params = {
//         lang,
//         country: 'in',
//         max: 10,
//         token: API_KEY,
//       };

//       let endpoint = 'https://gnews.io/api/v4/top-headlines';
//       if (keywords) {
//         endpoint = 'https://gnews.io/api/v4/search';
//         params.q = keywords;
//       } else if (category) {
//         params.topic = category;
//       }

//       const response = await axios.get(endpoint, { params });
//       articles = response.data.articles;
//     }

//     res.json({ articles });
//   } catch (error) {
//     console.error('❌ Error fetching news:', error.message);
//     res.status(500).json({ error: 'Failed to fetch news' });
//   }
// });

// // ✅ AUTH
// app.post('/signup', async (req, res) => {
//   const { email, password, username } = req.body;
//   const exists = await User.findOne({ email });
//   if (exists) return res.status(400).json({ msg: 'User already exists' });

//   const hashed = await bcrypt.hash(password, 10);
//   await User.create({ email, password: hashed, username, savedNotes: [], likedNews: [] });
//   res.json({ msg: 'Signup successful' });
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ msg: 'User not found' });

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) return res.status(401).json({ msg: 'Invalid credentials' });

//   const token = jwt.sign({ userId: user._id }, JWT_SECRET);
//   res.json({ token, msg: 'Login successful', username: user.username });
// });

// // app.post('/delete-account', async (req, res) => {
// //   const { token } = req.body;
// //   try {
// //     const { userId } = jwt.verify(token, JWT_SECRET);
// //     await User.findByIdAndDelete(userId);
// //     res.json({ msg: 'Account deleted' });
// //   } catch {
// //     res.status(401).json({ msg: 'Invalid token' });
// //   }
// // });


// // ✅ DELETE ACCOUNT (updated route)
// app.post('/delete-account', async (req, res) => {
//   const { token } = req.body;

//   try {
//     const { userId } = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(userId);

//     if (!user) return res.status(404).json({ msg: "User not found" });

//     await User.findByIdAndDelete(userId);

//     res.json({ msg: `Account for ${user.email} deleted successfully.` });
//   } catch (err) {
//     console.error("❌ Error in delete-account:", err.message);
//     res.status(401).json({ msg: 'Invalid token' });
//   }
// });


// // ✅ SAVE NOTES
// app.post('/save-note', async (req, res) => {
//   const { token, article, note } = req.body;
//   try {
//     const { userId } = jwt.verify(token, JWT_SECRET);
//     await User.findByIdAndUpdate(userId, {
//       $push: { savedNotes: { article, note } },
//     });
//     res.json({ msg: 'Note saved' });
//   } catch (err) {
//     res.status(500).json({ msg: 'Error saving note' });
//   }
// });

// app.get('/get-notes', async (req, res) => {
//   const token = req.headers.authorization;
//   try {
//     const { userId } = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(userId);
//     res.json({ notes: user.savedNotes });
//   } catch {
//     res.status(401).json({ msg: 'Invalid token' });
//   }
// });

// // ✅ LIKE ARTICLE
// app.post('/like-article', async (req, res) => {
//   const { token, article } = req.body;
//   try {
//     const { userId } = jwt.verify(token, JWT_SECRET);
//     await User.findByIdAndUpdate(userId, {
//       $addToSet: { likedNews: article },
//     });
//     res.json({ msg: 'Article liked successfully!' });
//   } catch (err) {
//      console.error("Error liking article:", err.message);
//     res.status(500).json({ msg: 'Error liking article' });
//   }
// });

// app.get('/liked-articles', async (req, res) => {
//   const token = req.headers.authorization;
//   try {
//     const { userId } = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(userId);
//     res.json({ likedArticles: user.likedNews });
//   } catch {
//     res.status(401).json({ msg: 'Invalid token' });
//   }
// });

// app.listen(5002, () => console.log('✅ Combined backend running on port 5002'));



const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Parser = require('rss-parser');
const resetPasswordRoute = require('./routes/resetPassword');
const app = express();
app.use(cors());
app.use(express.json());
app.use(resetPasswordRoute);
mongoose.connect('mongodb://localhost:27017/newswiz');
const User = require('./models/User');
// // ✅ SCHEMA
// const UserSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   username: String, // ✅ added this line
//   savedNotes: [
//     {
//       article: Object,
//       note: String,
//     },
//   ],
//   likedNews: [Object],
// });
// const User = mongoose.model('User', UserSchema);

const JWT_SECRET = 'newswiz_secret';
const API_KEY = '1d0d36181c3348d21f7605845eb3e2f6';
const parser = new Parser();

const rssFeeds = {
  education: 'https://www.indiatoday.in/rss/1206550',
  environment: 'https://timesofindia.indiatimes.com/rssfeeds/2647163.cms',
  politics: 'https://www.thehindu.com/news/national/feeder/default.rss',
  travel: 'http://feeds.feedburner.com/ndtvtravel-latest',
};

// ✅ NEWS FETCH
app.get('/api/news', async (req, res) => {
  const category = req.query.cat;
  const keywords = req.query.keywords;
  const lang = req.query.lang || 'en';

  try {
    let articles = [];

    if (rssFeeds[category]) {
      const feed = await parser.parseURL(rssFeeds[category]);
      articles = feed.items.slice(0, 10).map(item => ({
        title: item.title,
        description: item.contentSnippet || item.content,
        content: item.content || '',
        url: item.link,
        image: item.enclosure?.url || '',
        publishedAt: item.pubDate,
        source: { name: feed.title, url: feed.link },
      }));
    } else {
      const params = {
        lang,
        country: 'in',
        max: 10,
        token: API_KEY,
      };

      let endpoint = 'https://gnews.io/api/v4/top-headlines';
      if (keywords) {
        endpoint = 'https://gnews.io/api/v4/search';
        params.q = keywords;
      } else if (category) {
        params.topic = category;
      }

      const response = await axios.get(endpoint, { params });
      articles = response.data.articles;
    }

    res.json({ articles });
  } catch (error) {
    console.error('❌ Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// ✅ AUTH
app.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed, username, savedNotes: [], likedNews: [] });
  res.json({ msg: 'Signup successful' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token, msg: 'Login successful', username: user.username });
});

// ✅ USER INFO ROUTE (For Navbar “Hi, username”)
app.get('/user-info', async (req, res) => {
  const token = req.headers.authorization;
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(userId);
    res.json({ username: user.username });
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
});

// ✅ DELETE ACCOUNT
app.post('/delete-account', async (req, res) => {
  const { token } = req.body;
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndDelete(userId);
    res.json({ msg: `Account for ${user.email} deleted successfully.` });
  } catch (err) {
    console.error("❌ Error in delete-account:", err.message);
    res.status(401).json({ msg: 'Invalid token' });
  }
});

// ✅ SAVE NOTES
app.post('/save-note', async (req, res) => {
  const { token, article, note } = req.body;
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    await User.findByIdAndUpdate(userId, {
      $push: { savedNotes: { article, note } },
    });
    res.json({ msg: 'Note saved' });
  } catch (err) {
    res.status(500).json({ msg: 'Error saving note' });
  }
});

app.get('/get-notes', async (req, res) => {
  const token = req.headers.authorization;
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(userId);
    res.json({ notes: user.savedNotes });
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
});


// ✅ DELETE NOTE
// DELETE a saved note
app.delete('/delete-note/:id', async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params; // note id

  try {
    const { userId } = jwt.verify(token, JWT_SECRET);

    // Remove the note from user's savedNotes array
    await User.findByIdAndUpdate(userId, {
      $pull: { savedNotes: { _id: id } },
    });

    res.json({ msg: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error deleting note' });
  }
});


// ✅ LIKE ARTICLE
app.post('/like-article', async (req, res) => {
  const { token, article } = req.body;
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedNews: article },
    });
    res.json({ msg: 'Article liked successfully!' });
  } catch (err) {
    console.error("Error liking article:", err.message);
    res.status(500).json({ msg: 'Error liking article' });
  }
});

app.get('/liked-articles', async (req, res) => {
  const token = req.headers.authorization;
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(userId);
    res.json({ likedArticles: user.likedNews });
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
});

app.listen(5002, () => console.log('✅ Combined backend running on port 5002'));

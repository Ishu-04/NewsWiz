const express = require('express');
const router = express.Router();
const { summarizeText } = require('../controllers/summarizerController');



router.post("/", summarizeText);

module.exports = router;
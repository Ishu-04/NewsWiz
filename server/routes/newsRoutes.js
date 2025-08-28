const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/news", async (req, res) => {
  try {
    const response = await axios.get(
      "https://gnews.io/api/v4/top-headlines?lang=en&token=ef0f1dda30b2081463c0a9f483f9412d"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;

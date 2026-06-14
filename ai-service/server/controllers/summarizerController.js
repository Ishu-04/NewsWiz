const summarizeText = (req, res) => {
  const { content } = req.body;

  // For now, just return dummy response
  const summary = `🔍 Summary of "${content.slice(0, 50)}..."`;

  res.json({ summary });
};

module.exports = { summarizeText };


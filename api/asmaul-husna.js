const namesData = require('../data/asmaul-husna.json');
const { formatLocalResponse, supportedLangs } = require('../utils/fetchDetails');

module.exports = (req, res) => {
  // Enable CORS for Flutter app and web frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, search, random, lang = 'english' } = req.query;
  if (!supportedLangs.includes(lang)) {
    return res.status(400).json({ 
      error: 'Language not supported', 
      supported_languages: supportedLangs 
    });
  }

  // Random name
  if (random === 'true') {
    const randomIndex = Math.floor(Math.random() * namesData.asmaul_husna.length);
    const name = namesData.asmaul_husna[randomIndex];
    return res.status(200).json(formatLocalResponse(name, lang));
  }

  // Get by ID
  if (id) {
    const name = namesData.asmaul_husna.find(n => n.number === parseInt(id));
    if (name) {
      return res.status(200).json(formatLocalResponse(name, lang));
    }
    return res.status(404).json({ error: 'Name not found' });
  }

  // Search
  if (search) {
    const query = search.toLowerCase();
    const filtered = namesData.asmaul_husna.filter(n => 
      n.name.arabic.includes(search) ||
      n.name.transliteration.toLowerCase().includes(query) ||
      n.translations.english.name.toLowerCase().includes(query) ||
      n.translations.english.meaning.toLowerCase().includes(query)
    );
    return res.status(200).json({
      count: filtered.length,
      results: filtered.map(n => formatLocalResponse(n, lang))
    });
  }

  // Get all names
  const formattedResults = namesData.asmaul_husna.map(n => formatLocalResponse(n, lang));
  return res.status(200).json({
    count: formattedResults.length,
    results: formattedResults
  });
};

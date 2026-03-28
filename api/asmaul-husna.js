const namesData = require('../data/asmaul-husna.json');

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
  const supportedLangs = ['english', 'bangla', 'urdu', 'indonesian'];
  
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
    return res.status(200).json(formatResponse(name, lang));
  }

  // Get by ID
  if (id) {
    const name = namesData.asmaul_husna.find(n => n.number === parseInt(id));
    if (name) {
      return res.status(200).json(formatResponse(name, lang));
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
      results: filtered.map(n => formatResponse(n, lang))
    });
  }

  // Get all names
  const formattedResults = namesData.asmaul_husna.map(n => formatResponse(n, lang));
  return res.status(200).json({
    count: formattedResults.length,
    results: formattedResults
  });
};

function formatResponse(name, lang) {
  const translation = name.translations[lang];
  
  return {
    number: name.number,
    name: {
      arabic: name.name.arabic,
      transliteration: name.name.transliteration,
      translated: translation.name
    },
    meaning: translation.meaning,
    details: translation.details || translation.meaning,
    audio_url: name.audio_url
  };
}

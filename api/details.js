const { getDetailsPayload } = require('../utils/fetchDetails');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, lang = 'english' } = req.query;

  if (!id) {
    return res.status(400).json({
      error: 'ID is required'
    });
  }

  const result = await getDetailsPayload(id, lang);
  return res.status(result.status).json(result.payload);
};

const namesData = require('../data/asmaul-husna.json');

const supportedLangs = ['english', 'bangla', 'urdu', 'indonesian'];

const quranAyahMap = {
  1: '55:1',
  2: '1:3',
  3: '23:116',
  4: '59:23',
  5: '59:23'
};

const quranEditions = {
  english: 'en.asad',
  bangla: 'bn.bengali',
  urdu: 'ur.jalandhry',
  indonesian: 'id.indonesian'
};

function getLocalNameById(id) {
  return namesData.asmaul_husna.find((entry) => entry.number === Number(id));
}

function formatLocalResponse(name, lang) {
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

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchAyahBundle(reference, lang) {
  if (!reference) return null;

  const translationEdition = quranEditions[lang] || quranEditions.english;
  const arabicUrl = `https://api.alquran.cloud/v1/ayah/${reference}/quran-uthmani`;
  const translationUrl = `https://api.alquran.cloud/v1/ayah/${reference}/${translationEdition}`;

  try {
    const [arabic, translation] = await Promise.all([
      fetchJson(arabicUrl),
      fetchJson(translationUrl)
    ]);

    return {
      source: 'api.alquran.cloud',
      reference,
      surah: {
        number: arabic.data.surah.number,
        name: arabic.data.surah.name,
        english_name: arabic.data.surah.englishName,
        english_translation: arabic.data.surah.englishNameTranslation
      },
      ayah_number: arabic.data.numberInSurah,
      arabic: arabic.data.text,
      translation: translation.data.text
    };
  } catch (error) {
    return null;
  }
}

async function fetchAsmaReference(id) {
  try {
    const payload = await fetchJson(`https://api.aladhan.com/v1/asmaAlHusna/${id}`);
    const item = Array.isArray(payload.data) ? payload.data[0] : payload.data;

    if (!item) return null;

    return {
      source: 'api.aladhan.com',
      number: item.number,
      arabic: item.name,
      transliteration: item.transliteration,
      english_meaning: item.en?.meaning || null
    };
  } catch (error) {
    return null;
  }
}

async function getDetailsPayload(id, lang = 'english') {
  if (!supportedLangs.includes(lang)) {
    return {
      status: 400,
      payload: {
        error: 'Language not supported',
        supported_languages: supportedLangs
      }
    };
  }

  const localName = getLocalNameById(id);
  if (!localName) {
    return {
      status: 404,
      payload: {
        error: 'Name not found'
      }
    };
  }

  const base = formatLocalResponse(localName, lang);
  const quranReference = quranAyahMap[Number(id)] || null;

  const [asmaReference, quran] = await Promise.all([
    fetchAsmaReference(id),
    fetchAyahBundle(quranReference, lang)
  ]);

  return {
    status: 200,
    payload: {
      ...base,
      sources: {
        asma: asmaReference ? asmaReference.source : 'local',
        quran: quran ? quran.source : null,
        hadith: null
      },
      quran_reference: quran,
      asma_reference: asmaReference,
      hadith_reference: null
    }
  };
}

module.exports = {
  getDetailsPayload,
  formatLocalResponse,
  supportedLangs
};

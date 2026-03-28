const namesData = require("../data/asmaul-husna.json");

const supportedLangs = ["english", "bangla", "urdu", "indonesian"];

const quranReferences = Object.freeze({
  1: "Surah Al-Fatihah 1:1, Surah Taha 20:5",
  2: "Surah Al-Baqarah 2:143, Surah Al-Araf 7:156",
  3: "Surah Al-Fatihah 1:4, Surah Al-Hashr 59:23, Surah Al-Mulk 67:1",
  4: "Surah Al-Hashr 59:23, Surah Al-Jumuah 62:1",
  5: "Surah Al-Hashr 59:23, Surah Al-Anam 6:127",
  6: "Surah Al-Hashr 59:23, Surah Al-Baqarah 2:257",
  7: "Surah Al-Hashr 59:23, Surah Al-Maidah 5:48",
  8: "Surah Al-Baqarah 2:129, Surah Al-Munafiqun 63:8",
  9: "Surah Al-Hashr 59:23, Surah Al-Anam 6:18",
  10: "Surah Al-Hashr 59:23",
  11: "Surah Al-Hashr 59:24, Surah Al-Hijr 15:86",
  12: "Surah Al-Hashr 59:24, Surah As-Sajdah 32:7",
  13: "Surah Al-Hashr 59:24, Surah Ali Imran 3:6",
  14: "Surah Taha 20:82, Surah Al-Kahf 18:58",
  15: "Surah Al-Anam 6:18, Surah Ar-Rad 13:16",
  16: "Surah Sad 38:9, Surah Ali Imran 3:8",
  17: "Surah Adh-Dhariyat 51:58, Surah Hud 11:6",
  18: "Surah Saba 34:26, Surah Fatir 35:2",
  19: "Surah Al-Anam 6:59, Surah Al-Hajj 22:70",
  20: "Surah Ar-Rad 13:26, Surah Al-Baqarah 2:245",
  21: "Surah Ar-Rad 13:26, Surah Al-Baqarah 2:245",
  22: "Surah Ali Imran 3:26, Surah Al-Mujadila 58:11",
  23: "Surah Ali Imran 3:26, Surah Al-Mujadila 58:11",
  24: "Surah Ali Imran 3:26",
  25: "Surah Ali Imran 3:26, Surah Al-Hajj 22:18",
  26: "Surah Al-Hajj 22:75, Surah Al-Hujurat 49:1",
  27: "Surah Al-Hajj 22:75, Surah Al-Hujurat 49:1",
  28: "Surah Al-Anam 6:114, Surah Yunus 10:109",
  29: "Surah An-Nisa 4:40, Surah Ghafir 40:31",
  30: "Surah Ash-Shura 42:19, Surah Al-Mulk 67:14",
  31: "Surah Al-Anam 6:18, Surah Al-Hujurat 49:13",
  32: "Surah Al-Baqarah 2:235, Surah An-Nahl 16:61",
  33: "Surah Al-Baqarah 2:255, Surah Al-Waqiah 56:96",
  34: "Surah Az-Zumar 39:53, Surah Taha 20:82",
  35: "Surah Fatir 35:30, Surah Ash-Shura 42:23",
  36: "Surah Al-Baqarah 2:255, Surah Al-Hajj 22:62",
  37: "Surah Ar-Rad 13:9, Surah Al-Baqarah 2:255",
  38: "Surah Hud 11:57, Surah Saba 34:21",
  39: "Surah An-Nisa 4:85, Surah Al-Anam 6:15",
  40: "Surah An-Nisa 4:6, Surah Al-Ahzab 33:39",
  41: "Surah Ar-Rahman 55:27, Surah Al-Hijr 15:49",
  42: "Surah Al-Infitar 82:6, Surah Al-Alaq 96:3",
  43: "Surah An-Nisa 4:1, Surah Al-Ahzab 33:52",
  44: "Surah Al-Baqarah 2:186, Surah An-Naml 27:62",
  45: "Surah Al-Baqarah 2:268, Surah Al-Araf 7:156",
  46: "Surah Al-Baqarah 2:129, Surah Al-Anam 6:18",
  47: "Surah Hud 11:90, Surah Al-Buruj 85:14",
  48: "Surah Hud 11:73, Surah Al-Buruj 85:15",
  49: "Surah Al-Hajj 22:7, Surah Ya-Sin 36:52",
  50: "Surah An-Nisa 4:33, Surah Al-Hajj 22:17",
  51: "Surah Luqman 31:30, Surah Yunus 10:32",
  52: "Surah Al-Anam 6:102, Surah Al-Ahzab 33:3",
  53: "Surah Al-Hajj 22:40, Surah Al-Qasas 28:80",
  54: "Surah Adh-Dhariyat 51:58, Surah Al-Maidah 5:64",
  55: "Surah Al-Baqarah 2:257, Surah Al-Jumuah 62:1",
  56: "Surah Ibrahim 14:1, Surah Luqman 31:12",
  57: "Surah Al-Jinn 72:28, Surah Ya-Sin 36:12",
  58: "Surah Ar-Rum 30:27, Surah Al-Ankabut 29:20",
  59: "Surah Ar-Rum 30:27, Surah Al-Buruj 85:13",
  60: "Surah Al-Hadid 57:2, Surah Al-Anbiya 21:30",
  61: "Surah Al-Mulk 67:2, Surah Al-Muminun 23:80",
  62: "Surah Al-Baqarah 2:255, Surah Ali Imran 3:2",
  63: "Surah Al-Baqarah 2:255, Surah Ali Imran 3:2",
  64: "Surah Adh-Dhariyat 51:58, Surah Al-Maidah 5:54",
  65: "Surah Hud 11:73, Surah Al-Buruj 85:15",
  66: "Surah Al-Baqarah 2:163, Surah Al-Ikhlas 112:1",
  67: "Surah Al-Ikhlas 112:1",
  68: "Surah Al-Ikhlas 112:2, Surah Al-Anam 6:72",
  69: "Surah Al-Qamar 54:55, Surah Al-Hijr 15:73",
  70: "Surah Al-Qamar 54:55, Surah Al-Kahf 18:45",
  71: "Surah Hud 11:84, Surah Al-Isra 17:34",
  72: "Surah Hud 11:84, Surah Al-Isra 17:34",
  73: "Surah Al-Hadid 57:3",
  74: "Surah Al-Hadid 57:3",
  75: "Surah Al-Hadid 57:3",
  76: "Surah Al-Hadid 57:3",
  77: "Surah Ar-Rad 13:11, Surah Al-Baqarah 2:107",
  78: "Surah Ar-Rad 13:9, Surah Al-Mumin 40:15",
  79: "Surah At-Tur 52:28, Surah Al-Insan 76:1",
  80: "Surah Al-Baqarah 2:128, Surah At-Tawbah 9:104",
  81: "Surah As-Sajdah 32:22, Surah Ali Imran 3:4",
  82: "Surah An-Nisa 4:43, Surah An-Nur 24:22",
  83: "Surah Al-Baqarah 2:143, Surah At-Tawbah 9:117",
  84: "Surah Ali Imran 3:26",
  85: "Surah Ar-Rahman 55:27, Surah Ar-Rahman 55:78",
  86: "Surah Ali Imran 3:18, Surah Al-Maidah 5:42",
  87: "Surah An-Nisa 4:87, Surah Ali Imran 3:9",
  88: "Surah Luqman 31:12, Surah Muhammad 47:38",
  89: "Surah Ad-Duha 93:8, Surah An-Najm 53:48",
  90: "Surah Al-Anam 6:17, Surah Yunus 10:107",
  91: "Surah Al-Anam 6:17, Surah Yunus 10:107",
  92: "Surah Al-Anam 6:17, Surah An-Nisa 4:79",
  93: "Surah An-Nur 24:35, Surah At-Taghabun 64:8",
  94: "Surah Al-Furqan 25:31, Surah Al-Baqarah 2:213",
  95: "Surah Al-Baqarah 2:117, Surah Al-Anam 6:101",
  96: "Surah Al-Qasas 28:88, Surah Ar-Rahman 55:26-27",
  97: "Surah Maryam 19:40, Surah Al-Hijr 15:23",
  98: "Surah Al-Jinn 72:2, Surah Al-Hajj 22:54",
  99: "Surah Al-Araf 7:153, Surah An-Nahl 16:61"
});

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id, lang = "english" } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }

  const parsedId = Number.parseInt(id, 10);
  const name = namesData.asmaul_husna.find((item) => item.number === parsedId);

  if (!name) {
    return res.status(404).json({ error: "Name not found" });
  }

  const language = supportedLangs.includes(lang) ? lang : "english";
  const translation = name.translations[language];
  const details = translation.details || translation.meaning || "";

  return res.status(200).json({
    number: name.number,
    name: {
      arabic: name.name.arabic,
      transliteration: name.name.transliteration,
      translated: translation.name
    },
    meaning: translation.meaning,
    details,
    quran_reference: quranReferences[name.number] || "Various verses throughout the Quran",
    audio_url: name.audio_url,
    spiritual_benefit: extractBenefit(details)
  });
};

function extractBenefit(details) {
  const benefitMatch = details.match(/\*\*Benefit:\*\*\s*(.*?)(?=\n\n|\n\*\*|$)/i);
  return benefitMatch ? benefitMatch[1].trim() : "";
}

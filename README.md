# Asmaul Husna API

A modern reference for the 99 Beautiful Names of Allah with multilingual meanings, audio recitation, and simple JSON endpoints.

## Features

- 99 Names of Allah in a clean public JSON API
- Arabic support in every response
- Multilingual translations for `english`, `bangla`, `urdu`, and `indonesian`
- Search by Arabic name, transliteration, translated name, or meaning
- Random name lookup
- Audio recitation URL in every record
- Local details endpoint with `quran_reference` and `spiritual_benefit`
- Modern responsive frontend included in `public/`

## Base URL

```text
/api/asmaul-husna
```

## Endpoints

### `GET /api/asmaul-husna`

Returns all names by default, or a single filtered result when query parameters are used.

Supported query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `lang` | string | Translation language: `english`, `bangla`, `urdu`, `indonesian` |
| `id` | number | Return a single name by number |
| `search` | string | Search Arabic text, transliteration, translated name, or English meaning |
| `random` | boolean | When `true`, return one random name |

### `GET /api/details`

Returns a richer local details payload for one selected name.

Supported query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | number | Required name number |
| `lang` | string | Translation language: `english`, `bangla`, `urdu`, `indonesian` |

## Example Requests

```http
GET /api/asmaul-husna
GET /api/asmaul-husna?lang=bangla
GET /api/asmaul-husna?id=1
GET /api/asmaul-husna?search=mercy
GET /api/asmaul-husna?random=true&lang=urdu
GET /api/details?id=3&lang=english
```

## Main Response Shape

```json
{
  "number": 1,
  "name": {
    "arabic": "الرَّحْمَـٰنُ",
    "transliteration": "Ar-Rahmaan",
    "translated": "The Most Gracious"
  },
  "meaning": "The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter.",
  "details": "The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter.",
  "audio_url": "https://www.islamicity.org/mediaassets/MP3/other/covers/99-names-of-Allah/001.mp3?v06092021"
}
```

## Collection Response

```json
{
  "count": 99,
  "results": [
    {
      "number": 1,
      "name": {
        "arabic": "الرَّحْمَـٰنُ",
        "transliteration": "Ar-Rahmaan",
        "translated": "The Most Gracious"
      },
      "meaning": "The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter.",
      "details": "The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter.",
      "audio_url": "https://www.islamicity.org/mediaassets/MP3/other/covers/99-names-of-Allah/001.mp3?v06092021"
    }
  ]
}
```

## Details Response

```json
{
  "number": 3,
  "name": {
    "arabic": "الْمَلِكُ",
    "transliteration": "Al-Malik",
    "translated": "The Eternal Lord"
  },
  "meaning": "The Sovereign Lord, The One with the complete Dominion, the One Whose Dominion is clear from imperfection.",
  "details": "So exalted be Allah, the True King; no god is there but He...",
  "quran_reference": "Surah Al-Fatihah 1:4, Surah Al-Hashr 59:23, Surah Al-Mulk 67:1",
  "audio_url": "https://www.islamicity.org/mediaassets/MP3/other/covers/99-names-of-Allah/003.mp3?v06092021",
  "spiritual_benefit": ""
}
```

## Arabic Support

Every response includes:

```json
{
  "name": {
    "arabic": "الرَّحْمَـٰنُ",
    "transliteration": "Ar-Rahmaan",
    "translated": "The Most Gracious"
  }
}
```

## Error Responses

Unsupported language:

```json
{
  "error": "Language not supported",
  "supported_languages": ["english", "bangla", "urdu", "indonesian"]
}
```

Missing details ID:

```json
{
  "error": "ID parameter is required",
  "example": "/api/details?id=1"
}
```

Name not found:

```json
{
  "error": "Name not found"
}
```

## Frontend

The included frontend provides:

- language switching
- search and random selection
- centered Arabic card layout
- modal details view with scroll for long content
- audio playback
- GitHub and Facebook profile links

## Project Structure

```text
api/asmaul-husna.js     Main API handler
api/details.js          Details API handler
data/asmaul-husna.json  Source dataset for all 99 names
public/index.html       Frontend landing page
public/style.css        Frontend styles
public/script.js        Frontend interactions
```

## Developer

```text
Powered by Asmaul Husna API | 99 Names of Allah | Developed with ❤️ by Eiaser Hosen
```

Contact:

[![GitHub](https://img.shields.io/badge/GitHub-eiaserbd-181717?style=for-the-badge&logo=github)](https://github.com/eiaserbd/)
[![Facebook](https://img.shields.io/badge/Facebook-Profile-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=61577537071630)

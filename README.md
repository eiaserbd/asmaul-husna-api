# Asmaul Husna API

A lightweight API and modern web interface for exploring the 99 Names of Allah.

## Features

- 99 Names of Allah in one public JSON endpoint
- Arabic name support in every response
- Multilingual support for `english`, `bangla`, `urdu`, and `indonesian`
- Search by Arabic name, transliteration, or English meaning
- Random name lookup
- Audio recitation and reference links in each record
- Responsive frontend included in `public/`

## API Endpoint

Base route:

```text
/api/asmaul-husna
```

## Query Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `lang` | string | Output translation language. Supported values: `english`, `bangla`, `urdu`, `indonesian` |
| `id` | number | Returns a single name by its number |
| `search` | string | Searches Arabic text, transliteration, English translated name, and English meaning |
| `random` | boolean | When `true`, returns one random name |

## Arabic Support

Every API response includes the original Arabic name in `name.arabic`.

Example:

```json
{
  "name": {
    "arabic": "الرَّحْمَـٰنُ",
    "transliteration": "Ar-Rahmaan",
    "translated": "The Most Gracious"
  }
}
```

## Example Requests

Get all names:

```http
GET /api/asmaul-husna
```

Get all names in Bangla:

```http
GET /api/asmaul-husna?lang=bangla
```

Get a specific name:

```http
GET /api/asmaul-husna?id=1
```

Search for a keyword:

```http
GET /api/asmaul-husna?search=mercy
```

Get a random name:

```http
GET /api/asmaul-husna?random=true&lang=urdu
```

## Successful Responses

All names:

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
      "audio_url": "https://...",
      "reference_url": "http://..."
    }
  ]
}
```

Single name:

```json
{
  "number": 1,
  "name": {
    "arabic": "الرَّحْمَـٰنُ",
    "transliteration": "Ar-Rahmaan",
    "translated": "The Most Gracious"
  },
  "meaning": "The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter.",
  "audio_url": "https://...",
  "reference_url": "http://..."
}
```

Search results:

```json
{
  "count": 2,
  "results": [
    {
      "number": 1,
      "name": {
        "arabic": "الرَّحْمَـٰنُ",
        "transliteration": "Ar-Rahmaan",
        "translated": "The Most Gracious"
      },
      "meaning": "The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter.",
      "audio_url": "https://...",
      "reference_url": "http://..."
    }
  ]
}
```

## Error Response

Unsupported language:

```json
{
  "error": "Language not supported",
  "supported_languages": ["english", "bangla", "urdu", "indonesian"]
}
```

## Project Structure

```text
api/asmaul-husna.js   Serverless API handler
data/asmaul-husna.json Source data for all names
public/index.html     Frontend landing page
public/style.css      Frontend styles
public/script.js      Frontend interactions
```

## Branding

Footer text:

```text
Powered by Asmaul Husna API | 99 Names of Allah | Developed by Eiaser Hosen
```

## Developer

```text
Powered by Asmaul Husna API | 99 Names of Allah | Developed by Eiaser Hosen
```

Contact:

[![GitHub](https://img.shields.io/badge/GitHub-eiaserbd-181717?style=for-the-badge&logo=github)](https://github.com/eiaserbd/)

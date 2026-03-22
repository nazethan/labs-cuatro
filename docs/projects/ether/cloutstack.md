---
title: Cloud & Database
sidebar_position: 3
---

# Serverless Cloud Infrastructure

E.T.H.E.R. avoids traditional, heavy, always-on backend servers (like Node.js/Express) in favor of a modern, cost-effective serverless edge stack.

## Data Ingestion
1. The Avatar node formats the hardware telemetry into a JSON payload.
2. It sends an HTTP POST request over local Wi-Fi to a dedicated Netlify Edge Function endpoint.
3. The Netlify Edge Function validates the payload and injects it into the database.

---

## Database: TursoDB (libSQL)
We use TursoDB for edge-based database storage. 
- **Why Turso?** It is built on libSQL (a fork of SQLite) optimized for edge networks, providing microsecond query responses critical for our web dashboard's polling requirements.

### Database Schema & Data Flow
E.T.H.E.R. relies on a strict data contract between the Avatar node and the TursoDB edge database.

#### The Telemetry Payload
When the Avatar node receives data from the Sentry via ESP-NOW, it formats it into the following JSON structure and sends an HTTP POST request to the Netlify Edge endpoint:

```json
{
  "timestamp": "2026-03-21T10:30:00Z",
  "voltage": 220.4,
  "current": 1.12,
  "wattage": 246.8,
  "relay_status": "CLOSED",
  "emotive_state": "IDLE"
}
```

#### TursoDB Table Initialization
To set up your Turso database to accept this data, run the following SQL command in your Turso CLI or web studio:
SQL

```sql
CREATE TABLE ether_telemetry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    voltage REAL NOT NULL,
    current REAL NOT NULL,
    wattage REAL NOT NULL,
    relay_status TEXT NOT NULL,
    emotive_state TEXT NOT NULL
);
```

#### Index Optimization
Since the Astro dashboard frequently polls for the most recent data, it is highly recommended to index the timestamp column:
SQL

```sql
CREATE INDEX idx_timestamp ON ether_telemetry(timestamp DESC);
```

---

## AI Integration: Gemini 1.5 Pro
Instead of relying on users to read raw charts, **Ether** uses the Google Gemini API to analyze the data.
- A scheduled serverless function fetches the last 24 hours of telemetry.
- Gemini is prompted to act as the "Emotive Persona" of the hardware, generating a concise, actionable analysis of the user's energy habits.
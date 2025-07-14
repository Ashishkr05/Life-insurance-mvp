const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// This endpoint receives form data and returns a life insurance plan based on simple rules.
app.post('/recommendation', async (req, res) => {
  const { age, income, dependents, risk } = req.body;

  let plan = '';
  let reason = '';

  // Rules-based logic — easily swappable with ML later
  if (age < 35 && risk === 'high') {
    plan = 'Term Life – $500,000 for 20 years';
    reason = 'You’re young and taking risks — a high coverage term plan gives flexible protection.';
  } else if (age > 50 || dependents > 3) {
    plan = 'Whole Life – $250,000';
    reason = 'You might have long-term dependents — whole life provides permanent coverage.';
  } else {
    plan = 'Term Life – $300,000 for 15 years';
    reason = 'A balanced option that suits most moderate-risk profiles.';
  }

  try {
    // Save submission to DB
    await pool.query(
      'INSERT INTO submissions (age, income, dependents, risk, plan, reason) VALUES ($1, $2, $3, $4, $5, $6)',
      [age, income, dependents, risk, plan, reason]
    );

    return res.status(200).json({ plan, reason });
  } catch (error) {
    // Can log this error later to file/monitor
    return res.status(500).json({ error: 'Unable to generate recommendation at this time.' });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

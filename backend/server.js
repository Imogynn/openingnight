import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { generateInterview } from './ollama.js';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'opening-night-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Opening Night backend is running' });
});

// Greeting endpoint - character introduces themselves
app.post('/api/greeting', async (req, res) => {
  try {
    const { character } = req.body;

    if (!character) {
      return res.status(400).json({ error: 'Missing character' });
    }

    const greetingQuestion = "Hi! Thanks for coming in. Tell me a bit about yourself.";
    const result = await generateInterview(character, [], greetingQuestion);
    res.json(result);

  } catch (error) {
    console.error('Greeting error:', error);
    res.status(500).json({ 
      error: 'Failed to generate greeting',
      details: error.message 
    });
  }
});

// Interview endpoint
app.post('/api/interview', async (req, res) => {
  try {
    const { character, history, question } = req.body;

    if (!character || !question) {
      return res.status(400).json({ error: 'Missing character or question' });
    }

    const result = await generateInterview(character, history || [], question);
    res.json(result);

  } catch (error) {
    console.error('Interview error:', error);
    res.status(500).json({ 
      error: 'Failed to generate interview response',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎭 Opening Night backend running on http://localhost:${PORT}`);
});

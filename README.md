# 🎭 Opening Night

A game about interviewing bar staff and surviving your first night. Ted Lasso meets Fawlty Towers.

## Game Flow

1. **Interview** - Chat with AI-powered candidates (via Ollama)
2. **Select Team** - Pick your staff
3. **Opening Night** - Manage the chaos
4. **Recap** - See how you did

## Project Structure

```
opening-night/
├── frontend/          # React app (Vite)
├── backend/           # Express server
└── package.json       # Root scripts
```

## Getting Started

### Install Dependencies
```bash
npm run install:all
```

### Run Development Servers

Backend (port 3001):
```bash
cd backend
npm run dev
```

Frontend (port 5173):
```bash
cd frontend
npm run dev
```

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express + Sessions
- **AI**: Ollama (for candidate interviews)

## Development Philosophy

- Files under 300 lines
- Clear decomposition
- Simple, traceable code
- "Friday night before a long weekend" quality

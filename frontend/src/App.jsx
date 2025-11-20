import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { characters } from './data/characters.js';
import CandidateCard from './components/CandidateCard.jsx';

// const API_BASE = 'http://localhost:3001';
const API_BASE = 'https://592eba9f67ab.ngrok.app'; // Temporary public URL for testing

function App() {
  const [gameState, setGameState] = useState('splash'); // splash, interview, opening-night, recap
  const [availableCharacters, setAvailableCharacters] = useState(characters);
  const [interviewedCharacters, setInterviewedCharacters] = useState([]);
  const [hiredCharacters, setHiredCharacters] = useState([]);
  const [currentInterview, setCurrentInterview] = useState(null);
  
  // Chat logs for each character (keyed by character.id)
  const [chatLogs, setChatLogs] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs, currentInterview]);

  const startInterview = async (character) => {
    setCurrentInterview(character);
    
    // If this character hasn't been interviewed yet, get their greeting
    if (!chatLogs[character.id]) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE}/api/greeting`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ character })
        });
        
        const result = await response.json();
        
        setChatLogs(prev => ({
          ...prev,
          [character.id]: [{
            type: 'candidate',
            text: result.response,
            thinking: result.thinking,
            stats: {
              confidence: result.confidence,
              enthusiasm: result.enthusiasm,
              redFlags: result.redFlags
            }
          }]
        }));
      } catch (error) {
        console.error('Failed to get greeting:', error);
        // Fallback greeting
        setChatLogs(prev => ({
          ...prev,
          [character.id]: [{
            type: 'candidate',
            text: `Hi! I'm ${character.name}. Thanks for having me in today.`,
            thinking: 'Hope this goes well...',
            stats: { confidence: 50, enthusiasm: 50, redFlags: 0 }
          }]
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeInterview = () => {
    setCurrentInterview(null);
    setCurrentMessage('');
  };

  const hireCharacter = (character) => {
    setAvailableCharacters(availableCharacters.filter(c => c.id !== character.id));
    setHiredCharacters([...hiredCharacters, character]);
    setCurrentInterview(null);
  };

  const passOnCharacter = (character) => {
    setAvailableCharacters(availableCharacters.filter(c => c.id !== character.id));
    setInterviewedCharacters([...interviewedCharacters, character]);
    setCurrentInterview(null);
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || !currentInterview || isLoading) return;

    const userMessage = currentMessage.trim();
    setCurrentMessage('');
    
    // Add user message to chat
    const currentLog = chatLogs[currentInterview.id] || [];
    setChatLogs(prev => ({
      ...prev,
      [currentInterview.id]: [...currentLog, { type: 'user', text: userMessage }]
    }));

    // Get character response
    setIsLoading(true);
    try {
      const history = currentLog.map(msg => ({
        question: msg.type === 'user' ? msg.text : '',
        response: msg.type === 'candidate' ? msg.text : ''
      })).filter(h => h.question || h.response);

      const response = await fetch(`${API_BASE}/api/interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: currentInterview,
          history,
          question: userMessage
        })
      });

      const result = await response.json();

      setChatLogs(prev => ({
        ...prev,
        [currentInterview.id]: [
          ...prev[currentInterview.id],
          {
            type: 'candidate',
            text: result.response,
            thinking: result.thinking,
            stats: {
              confidence: result.confidence,
              enthusiasm: result.enthusiasm,
              redFlags: result.redFlags
            }
          }
        ]
      }));
    } catch (error) {
      console.error('Failed to get response:', error);
      // Error message
      setChatLogs(prev => ({
        ...prev,
        [currentInterview.id]: [
          ...prev[currentInterview.id],
          {
            type: 'candidate',
            text: "Sorry, I didn't catch that. Could you repeat the question?",
            thinking: 'Technical difficulties...',
            stats: { confidence: 50, enthusiasm: 50, redFlags: 0 }
          }
        ]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      {gameState === 'splash' && (
        <div className="splash-screen">
          <div className="splash-content">
            <div className="hero-image">
              <img src="/bar-hero.png" alt="Your new bar" />
            </div>
            
            <div className="splash-text">
              <h1>🎭 Opening Night</h1>
              
              <p className="tagline">
                You've just bought a bar. Opening night is coming soon. You're on the clock!
              </p>
              
              <p className="premise">
                Interview quirky candidates, build your dream team, and survive the chaos 
                of your first night in business.
              </p>
              
              <p className="vibe">
                <em>If you can't handle the heat, then you probably belong in the kitchen.</em>
              </p>
            </div>
            
            <button className="start-button" onClick={() => setGameState('interview')}>
              Let's Hire Some Staff
            </button>
          </div>
        </div>
      )}

      {gameState === 'interview' && !currentInterview && (
        <div className="game-screen">
          <header>
            <h1>🎭 Opening Night</h1>
            <h2>Let's pick your team</h2>
          </header>
          <main className="team-selection">
            <section className="character-section">
              <h3>Available ({availableCharacters.length})</h3>
              <div className="character-grid">
                {availableCharacters.map(character => (
                  <div 
                    key={character.id} 
                    className="character-card-wrapper"
                    onClick={() => startInterview(character)}
                  >
                    <CandidateCard character={character} />
                  </div>
                ))}
              </div>
            </section>

            <section className="character-section">
              <h3>Interviewed ({interviewedCharacters.length})</h3>
              <div className="character-grid">
                {interviewedCharacters.map(character => (
                  <div key={character.id} className="character-card-wrapper">
                    <CandidateCard character={character} />
                  </div>
                ))}
              </div>
            </section>

            <section className="character-section">
              <h3>Hired ({hiredCharacters.length})</h3>
              <div className="character-grid">
                {hiredCharacters.map(character => (
                  <div key={character.id} className="character-card-wrapper">
                    <CandidateCard character={character} />
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      )}

      {gameState === 'interview' && currentInterview && (
        <div className="interview-screen">
          <div className="interview-overlay" onClick={closeInterview}></div>
          <div className="interview-card">
            <button className="close-button" onClick={closeInterview}>×</button>
            
            <div className="interview-header">
              <div className="interview-portrait-small">
                <img 
                  src={`/characters/character-${currentInterview.id}.png`} 
                  alt={currentInterview.name}
                />
              </div>
              <div className="interview-title">
                <h2>{currentInterview.name}</h2>
                <p className="character-role">{currentInterview.role}</p>
              </div>
              <div className="interview-actions-top">
                <button 
                  className="hire-button" 
                  onClick={() => hireCharacter(currentInterview)}
                >
                  Hire
                </button>
                <button 
                  className="pass-button" 
                  onClick={() => passOnCharacter(currentInterview)}
                >
                  Pass
                </button>
              </div>
            </div>

            <div className="chat-container">
              <div className="chat-messages">
                {(chatLogs[currentInterview.id] || []).map((message, idx) => (
                  <div key={idx} className={`chat-message ${message.type}`}>
                    <div className="message-content">
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="chat-message candidate">
                    <div className="message-content typing">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="chat-input-container">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Ask a question..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button 
                  className="send-button" 
                  onClick={sendMessage}
                  disabled={isLoading || !currentMessage.trim()}
                >
                  Send
                </button>
              </div>
            </div>

            {/* Debug info - can be removed later */}
            <div className="debug-info">
              <h4>Debug Info (remove later)</h4>
              <p><strong>Background:</strong> {currentInterview.background}</p>
              <p><strong>Traits:</strong> {currentInterview.traits}</p>
              <p><strong>Strengths:</strong> {currentInterview.strengths.join(', ')}</p>
              <p><strong>Flaws:</strong> {currentInterview.flaws.join(', ')}</p>
              <p><strong>Base Stats:</strong> Confidence: {currentInterview.baseStats.confidence}, 
                Enthusiasm: {currentInterview.baseStats.enthusiasm}, 
                Red Flags: {currentInterview.baseStats.redFlags}</p>
            </div>
          </div>
        </div>
      )}

      {gameState === 'opening-night' && (
        <div className="game-screen">
          <header>
            <h1>🎭 Opening Night</h1>
          </header>
          <main>
            <div className="opening-night">
              <h2>Opening Night!</h2>
              <p>Coming soon...</p>
            </div>
          </main>
        </div>
      )}

      {gameState === 'recap' && (
        <div className="game-screen">
          <header>
            <h1>🎭 Opening Night</h1>
          </header>
          <main>
            <div className="recap">
              <h2>How did you do?</h2>
              <p>Coming soon...</p>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;

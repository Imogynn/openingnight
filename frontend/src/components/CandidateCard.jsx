import React from 'react';
import './CandidateCard.css';

function CandidateCard({ character, onInterview }) {
  const roleBorderColors = {
    bartender: '#ff8c42',  // Orange
    server: '#4ade80',      // Green
    barback: '#ec4899'      // Neon pink
  };

  return (
    <div 
      className="candidate-card" 
      onClick={onInterview}
      style={{ borderColor: roleBorderColors[character.role] }}
    >
      <div className="candidate-portrait">
        <img 
          src={`/characters/character-${character.id}.png`} 
          alt={character.name}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.backgroundColor = roleBorderColors[character.role];
          }}
        />
      </div>
      
      <div className="candidate-info">
        <h3>{character.name}</h3>
        <p className="candidate-role">{character.role}</p>
      </div>
      
      <button className="interview-btn">
        Interview
      </button>
    </div>
  );
}

export default CandidateCard;

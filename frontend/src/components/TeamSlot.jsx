import React from 'react';
import './TeamSlot.css';

function TeamSlot({ role, slotNumber, character }) {
  const roleColors = {
    bartender: '#667eea',
    server: '#48bb78',
    kitchen: '#ed8936',
    barback: '#9f7aea'
  };

  const roleLabels = {
    bartender: 'Bartender',
    server: 'Server',
    kitchen: 'Kitchen',
    barback: 'Barback'
  };

  return (
    <div className="team-slot">
      <div className="slot-header">
        <span className="slot-role" style={{ color: roleColors[role] }}>
          {roleLabels[role]} #{slotNumber}
        </span>
      </div>
      
      {character ? (
        <div className="slot-filled">
          <div className="slot-portrait" style={{ backgroundColor: roleColors[role] }}>
            <span className="portrait-number">{character.id.split('-')[0][0].toUpperCase()}</span>
          </div>
          <div className="slot-info">
            <h4>{character.name}</h4>
            <p>{character.traits}</p>
          </div>
        </div>
      ) : (
        <div className="slot-empty">
          <div className="empty-icon">?</div>
          <p>Not hired yet</p>
        </div>
      )}
    </div>
  );
}

export default TeamSlot;

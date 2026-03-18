import { useState } from 'react';
import Confetti from './Confetti';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CheckInCard({ area, entry, onChange }) {
  const [expanded, setExpanded] = useState(false);
  const [burst, setBurst] = useState(0);
  const done = entry?.done ?? false;
  const note = entry?.note ?? '';

  function toggle() {
    if (!done) setBurst(b => b + 1);
    onChange({ done: !done, note });
  }

  function handleNote(e) {
    onChange({ done, note: e.target.value });
  }

  return (
    <div className={`card ${done ? 'card--done' : ''}`} style={{ '--area-color': area.color }}>
      <div className="card-header">
        <div className="card-title">
          <span className="area-icon">{area.icon}</span>
          <span className="area-label">{area.label}</span>
        </div>
        <button
          className={`check-btn ${done ? 'check-btn--on' : ''}`}
          onClick={toggle}
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
        >
          <CheckIcon />
          {burst > 0 && <Confetti key={burst} />}
        </button>
      </div>

      <button
        className="note-toggle"
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
      >
        {note ? '📝 ' + note.slice(0, 40) + (note.length > 40 ? '…' : '') : '+ Add note'}
      </button>

      {expanded && (
        <textarea
          className="note-input"
          value={note}
          onChange={handleNote}
          placeholder="What did you do?"
          rows={2}
        />
      )}
    </div>
  );
}


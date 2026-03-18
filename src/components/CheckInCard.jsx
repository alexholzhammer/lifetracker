import { useState } from 'react';

export default function CheckInCard({ area, entry, onChange }) {
  const [expanded, setExpanded] = useState(false);
  const done = entry?.done ?? false;
  const note = entry?.note ?? '';

  function toggle() {
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
          className={`toggle ${done ? 'toggle--on' : ''}`}
          onClick={toggle}
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
        >
          {done ? 'Done' : 'Skip'}
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

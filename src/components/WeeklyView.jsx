import { useState, useMemo } from 'react';
import { AREAS } from '../areas';
import { getDay, setArea, getWeekDates, getMonday, toDateStr } from '../storage';
import Confetti from './Confetti';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function WeeklyView({ rev, onUpdate }) {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [burstCells, setBurstCells] = useState({});
  const dates = getWeekDates(weekStart);
  const today = toDateStr(new Date());

  const weekData = useMemo(() => dates.map(d => getDay(d)), [weekStart, rev]);

  function prevWeek() {
    setWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() - 7); return n; });
  }
  function nextWeek() {
    setWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() + 7); return n; });
  }

  function handleCellClick(dateStr, areaId, done) {
    setArea(dateStr, areaId, { done: !done });
    onUpdate?.();
    if (!done) {
      const key = `${dateStr}:${areaId}`;
      setBurstCells(prev => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
    }
  }

  const isCurrentWeek = toDateStr(weekStart) === toDateStr(getMonday(new Date()));

  function weekLabel() {
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    const fmt = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    return `${fmt(weekStart)} – ${fmt(end)}`;
  }

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Week</h2>
        <div className="week-nav">
          <button className="nav-btn" onClick={prevWeek} aria-label="Previous week">‹</button>
          <span className="week-label">{weekLabel()}</span>
          <button className="nav-btn" onClick={nextWeek} disabled={isCurrentWeek} aria-label="Next week">›</button>
        </div>
      </div>

      <div className="heatmap-wrapper">
        <div className="heatmap">
          {/* Corner spacer */}
          <div className="heatmap-area-col">
            <div className="heatmap-area-label" style={{ visibility: 'hidden' }}>–</div>
            {AREAS.map(area => (
              <div key={area.id} className="heatmap-area-label">
                <span className="area-icon-sm">{area.icon}</span>
                <span className="area-label-sm">{area.label}</span>
              </div>
            ))}
          </div>

          {dates.map((dateStr, di) => {
            const dayEntry = weekData[di] ?? {};
            const isToday = dateStr === today;
            return (
              <div key={dateStr} className="heatmap-col">
                <div className={`heatmap-day-label ${isToday ? 'heatmap-day-label--today' : ''}`}>
                  {DAY_LABELS[di]}
                </div>
                {AREAS.map(area => {
                  const done = dayEntry[area.id]?.done;
                  const note = dayEntry[area.id]?.note;
                  const burstKey = `${dateStr}:${area.id}`;
                  const burstCount = burstCells[burstKey] ?? 0;
                  return (
                    <div
                      key={area.id}
                      className={`heatmap-cell ${done ? 'heatmap-cell--done' : ''}`}
                      style={done ? { backgroundColor: area.color + '55', borderColor: area.color } : {}}
                      title={note ? `${area.label} – ${dateStr}: ${note}` : `${area.label} – ${dateStr}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleCellClick(dateStr, area.id, done)}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCellClick(dateStr, area.id, done); }}
                    >
                      <span className={`cell-check ${done ? 'cell-check--on' : ''}`}>
                        <CheckIcon />
                      </span>
                      {burstCount > 0 && <Confetti key={burstCount + burstKey} />}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Score column */}
          <div className="heatmap-score-col">
            <div className="heatmap-area-label" style={{ visibility: 'hidden' }}>–</div>
            {AREAS.map(area => {
              const score = weekData.filter(d => d[area.id]?.done).length;
              return (
                <div key={area.id} className="heatmap-score">
                  <span className={score >= 5 ? 'score--high' : score >= 3 ? 'score--mid' : 'score--low'}>
                    {score}/7
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

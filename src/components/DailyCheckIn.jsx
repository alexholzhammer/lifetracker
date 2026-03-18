import { useState, useEffect, useCallback } from 'react';
import { AREAS } from '../areas';
import { getDay, setArea, toDateStr } from '../storage';
import CheckInCard from './CheckInCard';

export default function DailyCheckIn({ onUpdate }) {
  const today = toDateStr(new Date());
  const [dayData, setDayData] = useState({});

  useEffect(() => {
    setDayData(getDay(today));
  }, [today]);

  const handleChange = useCallback((areaId, data) => {
    setArea(today, areaId, data);
    setDayData(getDay(today));
    onUpdate?.();
  }, [today, onUpdate]);

  const doneCount = AREAS.filter(a => dayData[a.id]?.done).length;

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Today</h2>
        <span className="section-meta">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          &nbsp;·&nbsp;
          <strong>{doneCount}/{AREAS.length}</strong> done
        </span>
      </div>
      <div className="cards-grid">
        {AREAS.map(area => (
          <CheckInCard
            key={area.id}
            area={area}
            entry={dayData[area.id]}
            onChange={data => handleChange(area.id, data)}
          />
        ))}
      </div>
    </section>
  );
}

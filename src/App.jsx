import { useState } from 'react';
import DailyCheckIn from './components/DailyCheckIn';
import WeeklyView from './components/WeeklyView';
import './App.css';

export default function App() {
  const [rev, setRev] = useState(0);
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">LifeTracker</h1>
        <p className="app-subtitle">Track what matters, every day.</p>
      </header>
      <main className="app-main">
        <DailyCheckIn onUpdate={() => setRev(r => r + 1)} />
        <WeeklyView rev={rev} />
      </main>
    </div>
  );
}

import DailyCheckIn from './components/DailyCheckIn';
import WeeklyView from './components/WeeklyView';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">LifeTracker</h1>
        <p className="app-subtitle">Track what matters, every day.</p>
      </header>
      <main className="app-main">
        <DailyCheckIn />
        <WeeklyView />
      </main>
    </div>
  );
}

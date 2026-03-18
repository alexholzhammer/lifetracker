const PREFIX = 'lifetracker:';

export function getDay(dateStr) {
  try {
    const raw = localStorage.getItem(PREFIX + dateStr);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setArea(dateStr, areaId, data) {
  const day = getDay(dateStr);
  day[areaId] = { ...day[areaId], ...data };
  localStorage.setItem(PREFIX + dateStr, JSON.stringify(day));
}

export function getWeekDates(weekStart) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return toDateStr(d);
  });
}

export function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

import { useState } from 'react';

const COLORS = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#c77dff', '#ff924c'];
const COUNT = 12;

export default function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: COUNT }, (_, i) => {
      const angle = (360 / COUNT) * i + (Math.random() - 0.5) * 25;
      const rad = (angle * Math.PI) / 180;
      const dist = 22 + Math.random() * 16;
      return {
        id: i,
        color: COLORS[i % COLORS.length],
        tx: Math.cos(rad) * dist,
        ty: Math.sin(rad) * dist,
        size: 3 + Math.random() * 3,
        delay: Math.random() * 80,
      };
    })
  );

  return (
    <span className="confetti-wrap" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="confetti-dot"
          style={{
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            width: p.size + 'px',
            height: p.size + 'px',
            background: p.color,
            animationDelay: p.delay + 'ms',
          }}
        />
      ))}
    </span>
  );
}

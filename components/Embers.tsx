"use client";

import { useEffect, useState, type CSSProperties } from "react";

interface Ember {
  id: number;
  style: CSSProperties;
}

function makeEmber(id: number): Ember {
  const size = 2 + Math.random() * 4;
  const left = Math.random() * 100;
  const dur = 7 + Math.random() * 9;
  const delay = -Math.random() * 16;
  const dx = `${(Math.random() * 60 - 30).toFixed(0)}px`;
  const bright = Math.random() > 0.5 ? "#ff9a3c" : "#ff4d15";
  return {
    id,
    style: {
      left: `${left}%`,
      width: size,
      height: size,
      background: bright,
      boxShadow: `0 0 ${size * 3}px ${size * 1.5}px ${bright}`,
      animationDuration: `${dur.toFixed(2)}s`,
      animationDelay: `${delay.toFixed(2)}s`,
      "--dx": dx,
    } as CSSProperties,
  };
}

export default function Embers({ count = 26 }: { count?: number }) {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    setEmbers(Array.from({ length: count }, (_, i) => makeEmber(i)));
  }, [count]);

  return (
    <div className="embers" aria-hidden="true">
      {embers.map((e) => (
        <div key={e.id} className="ember" style={e.style} />
      ))}
    </div>
  );
}

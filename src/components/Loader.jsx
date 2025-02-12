"use client";

import { PulseLoader } from "react-spinners";

export default function ComponentLevelLoader({ text, color, loading, size }) {
  return (
    <span className="flex gap-1 items-center" style={ {
        display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', justifySelf: 'center'
    }}>
      {text}
      <PulseLoader
        color={color}
        loading={loading}
        size={size || 10}
        data-testid="loader"
      />
    </span>
  );
}

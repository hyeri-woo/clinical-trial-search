import React, { useState } from 'react';
import { Sick } from '../types';

interface arrowKeyDownProps {
  suggestions: Sick[];
}

export default function useArrowKeyDown({ suggestions }: arrowKeyDownProps) {
  const [current, setCurrent] = useState<number>(0);
  const ArrowKeyDown = (e: React.KeyboardEvent) => {
    const length = suggestions.length < 10 ? suggestions.length : 10;
    if (e.key === 'ArrowUp' && current > 0) {
      setCurrent((prev) => prev - 1);
    }
    if (e.key === 'ArrowDown' && current < length - 1) {
      setCurrent((prev) => prev + 1);
    }
    const buttons = (e.target as HTMLElement).closest('ul')?.querySelectorAll('button');
    if (buttons) {
      buttons[current].focus();
    }
  };
  return ArrowKeyDown;
}

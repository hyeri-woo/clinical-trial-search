import React, { useState } from 'react';
import { Disease } from '../types';

interface arrowKeyDownProps {
  diseases: Disease[];
}

export default function useArrowKeyDown({ diseases }: arrowKeyDownProps) {
  const [current, setCurrent] = useState<number>(0);
  const ArrowKeyDown = (e: React.KeyboardEvent) => {
    const length = diseases.length < 10 ? diseases.length : 10;
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

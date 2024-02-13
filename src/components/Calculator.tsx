'use client';

import { useCalculator } from '@/hooks/useCalculator';
import CalculatorButton from './CalculatorButton';

export default function Calculator() {
  const { expression, isError, onSymbolClick } = useCalculator();

  const symbols = [
    ['AC', '⌫', '÷'],
    [7, 8, 9, '×'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '='],
  ];

  return (
    <section className='container max-w-xl min-h-[35rem] flex flex-col justify-between gap-4 px-4 py-8 bg-slate-800 rounded-2xl sm:gap-8 sm:px-8 sm:py-16 md:max-w-sm md:gap-4 md:px-4 md:py-8'>
      <input
        type='text'
        placeholder=''
        title='expression'
        name='expression'
        value={isError ? 'Error' : expression}
        readOnly
        className='w-full h-20 bg-white text-slate-900 px-2 py-4 font-semibold text-6xl whitespace-nowrap overflow-x-hidden text-right rounded-md sm:h-28 sm:px-8 sm:font-bold sm:text-7xl md:px-4 md:font-bold md:text-6xl md:h-20'
      />

      <section className='w-full flex flex-col gap-1 sm:gap-2'>
        {symbols.map((symbols, idx) => (
          <div key={idx} role='row' className='w-full flex gap-1 sm:gap-2'>
            {symbols.map((symbol) => (
              <CalculatorButton
                key={symbol}
                symbol={
                  typeof symbol === 'number' || symbol === '.' || symbol === '⌫'
                    ? 'number'
                    : symbol === '='
                    ? 'equal'
                    : symbol === 'AC'
                    ? 'clear'
                    : 'operator'
                }
                isDoubleWidth={symbol === 'AC' || symbol === 0 ? true : false}
                onClick={() => onSymbolClick(symbol)}
              >
                {symbol}
              </CalculatorButton>
            ))}
          </div>
        ))}
      </section>
    </section>
  );
}

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
    <section className='container flex flex-col gap-4 px-4 py-8 bg-slate-800 rounded-2xl '>
      <input
        type='text'
        placeholder=''
        title='expression'
        name='expression'
        value={isError ? 'Error' : expression}
        readOnly
        className='w-full h-12 bg-white text-slate-900 px-2 py-4 font-semibold text-2xl whitespace-nowrap overflow-x-hidden text-right rounded-md'
      />

      <section className='w-full flex flex-col gap-1'>
        {symbols.map((symbols, idx) => (
          <div key={idx} role='row' className='w-full flex gap-1'>
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

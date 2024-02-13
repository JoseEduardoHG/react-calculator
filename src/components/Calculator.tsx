'use client';

import * as math from 'mathjs';
import { useEffect, useState } from 'react';
import CalculatorButton from './CalculatorButton';

export default function Calculator() {
  const [leftOperand, setLeftOperand] = useState('');
  const [operator, setOperator] = useState('');
  const [rightOperand, setRightOperand] = useState('');
  const [expression, setExpression] = useState('');
  const [isError, setIsError] = useState(false);

  const symbols = [
    ['AC', '⌫', '÷'],
    [7, 8, 9, '×'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '='],
  ];

  useEffect(() => {
    setExpression(`${leftOperand}${operator}${rightOperand}`);
  }, [leftOperand, operator, rightOperand]);

  function clearScreen() {
    setLeftOperand('');
    setOperator('');
    setRightOperand('');
    setIsError(false);
  }

  function evaluate() {
    try {
      console.log(`Evaluating: ${expression}`);

      const finalExpression =
        expression || expression.replace('×', '*').replace('÷', '/');
      const result = math.evaluate(finalExpression);

      clearScreen();
      setLeftOperand(result);
    } catch (err) {
      if (err instanceof Error) {
        clearScreen();
        setIsError(true);

        console.log(`Error name: ${err.name}`, `Error message: ${err.message}`);
      }
    }
  }

  function handleClick(value: number | string) {
    if (isError) clearScreen();

    if (typeof value === 'number' && !operator)
      setLeftOperand((prev) => prev + value.toString());

    if (value === '.') {
      if (!operator && !leftOperand) return;

      if (!operator && !leftOperand.includes('.')) {
        setLeftOperand((prev) => prev + value);
        return;
      }

      if (operator && !rightOperand) return;

      if (operator && !rightOperand.includes('.')) {
        setRightOperand((prev) => prev + value);
        return;
      }

      return;
    }

    if (typeof value === 'number' && operator)
      setRightOperand((prev) => prev + value.toString());

    if (value === '=') {
      if (leftOperand && operator && rightOperand) evaluate();

      return;
    }

    if (value === 'AC') {
      clearScreen();
      return;
    }

    if (value === '⌫') {
      if (rightOperand) {
        setRightOperand((prev) => prev.slice(0, -1));
        return;
      }

      if (operator) {
        setOperator('');
        return;
      }

      if (leftOperand) {
        setLeftOperand((prev) => prev.slice(0, -1));
        return;
      }
    }

    if (typeof value === 'string' && leftOperand) setOperator(value);
  }

  return (
    <div>
      <input
        type='text'
        title='expression'
        name='expression'
        placeholder=''
        value={isError ? 'Error' : expression}
        readOnly
      />

      {symbols.map((symbols, idx) => (
        <div key={idx} role='row' className='flex gap-4'>
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
              width={symbol === 'AC' || symbol === 0 ? 2 : 1}
              onClick={() => handleClick(symbol)}
            >
              {symbol}
            </CalculatorButton>
          ))}
        </div>
      ))}
    </div>
  );
}

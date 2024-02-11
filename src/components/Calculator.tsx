'use client';

import * as math from 'mathjs';
import { useEffect, useState } from 'react';

export default function Calculator() {
  const [leftOperand, setLeftOperand] = useState('');
  const [operator, setOperator] = useState('');
  const [rightOperand, setRightOperand] = useState('');
  const [expression, setExpression] = useState('');

  const symbols = [
    ['C', 'AC', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '='],
  ];

  useEffect(() => {
    setExpression(`${leftOperand}${operator}${rightOperand}`);
  }, [leftOperand, operator, rightOperand]);

  function handleClick(value: number | string) {
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
      if (leftOperand && operator && rightOperand) {
        try {
          console.log(`Evaluating: ${expression}`);
          const result = math.evaluate(expression);
          setLeftOperand(result);
          setOperator('');
          setRightOperand('');
        } catch (err) {
          if (err instanceof Error) console.log(err.name, err.message);
        }
      }
      return;
    }

    if (value === 'AC') {
      setLeftOperand('');
      setOperator('');
      setRightOperand('');
      return;
    }

    if (value === 'C') {
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
      <input type='text' value={expression} readOnly />

      {symbols.map((symbols, idx) => (
        <div key={idx} role='row'>
          {symbols.map((symbol) => (
            <button key={symbol} onClick={() => handleClick(symbol)}>
              {symbol}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from 'react';

export function useCalculatorExpression() {
  const [leftOperand, setLeftOperand] = useState('');
  const [operator, setOperator] = useState('');
  const [rightOperand, setRightOperand] = useState('');
  const [expression, setExpression] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setExpression(`${leftOperand}${operator}${rightOperand}`);
  }, [leftOperand, operator, rightOperand]);

  return {
    leftOperand,
    setLeftOperand,
    operator,
    setOperator,
    rightOperand,
    setRightOperand,
    expression,
    isError,
    setIsError,
  };
}

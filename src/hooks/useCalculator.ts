import * as math from 'mathjs';
import { useCalculatorExpression } from './useCalculatorExpression';

export function useCalculator() {
  const {
    leftOperand,
    setLeftOperand,
    operator,
    setOperator,
    rightOperand,
    setRightOperand,
    expression,
    isError,
    setIsError,
  } = useCalculatorExpression();

  function clearScreen() {
    setLeftOperand('');
    setOperator('');
    setRightOperand('');
    setIsError(false);
  }

  function evaluate() {
    try {
      const finalExpression = expression.replace('×', '*').replace('÷', '/');

      console.log(`Evaluating: ${finalExpression}`);
      const result = math.evaluate(finalExpression).toString();

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

  function onSymbolClick(value: number | string) {
    if (isError) clearScreen();

    if (typeof value === 'number' && !operator)
      setLeftOperand((prev) => prev + value.toString());

    if (value === '.') {
      if (!operator && !leftOperand.includes('.')) {
        setLeftOperand((prev) => prev + value);
        return;
      }

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

  return { expression, isError, onSymbolClick };
}

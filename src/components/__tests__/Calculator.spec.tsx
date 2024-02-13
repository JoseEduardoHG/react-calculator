import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach } from 'node:test';
import { describe, expect, it } from 'vitest';
import Calculator from '../Calculator';

describe('Calculator', () => {
  afterEach(cleanup);

  it('should render', () => {
    render(<Calculator />);
  });

  it('should render numbers from 0-9', () => {
    render(<Calculator />);

    const numbers = Array.from({ length: 10 }, (_, i) => i);
    numbers.forEach((number) => {
      screen.getByText(number);
    });
  });

  it('should render 5 rows', () => {
    render(<Calculator />);
    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(5);
  });

  it('should render dot symbol', () => {
    render(<Calculator />);

    screen.getByText('.');
  });

  it('should render equal sign', () => {
    render(<Calculator />);

    screen.getByText('=');
  });

  it('should render operator symbols', () => {
    render(<Calculator />);

    const operators = ['+', '-', '×', '÷'];
    operators.forEach((operator) => {
      screen.getByText(operator);
    });
  });

  it('should render clear buttons', () => {
    render(<Calculator />);

    const clearButtons = ['AC', '⌫'];
    clearButtons.forEach((button) => {
      screen.getByText(button);
    });
  });

  it('should render an input', () => {
    render(<Calculator />);

    screen.getByRole('textbox');
  });

  it('should render an input with a number if a number is pressed', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1');
  });

  it('should render an input with a number follow by an operator after a number and operator are click', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1+');
  });

  it('should not render an operator if a number was not pressed before', () => {
    render(<Calculator />);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('');
  });

  it('should replace an existing operator if another operator was pressed', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const minus = screen.getByText<HTMLButtonElement>('-');
    fireEvent.click(minus);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1-');
  });

  it('should render a number an operator and another number if a number and operator are already set', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const two = screen.getByText<HTMLButtonElement>('2');
    fireEvent.click(two);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1+2');
  });

  it('should render a number an operator and another number correctly even if the numbers have more than 1 digit', () => {
    render(<Calculator />);

    const zero = screen.getByText<HTMLButtonElement>('0');
    const one = screen.getByText<HTMLButtonElement>('1');
    const two = screen.getByText<HTMLButtonElement>('2');
    const plus = screen.getByText<HTMLButtonElement>('+');

    fireEvent.click(one);
    fireEvent.click(zero);
    fireEvent.click(zero);
    fireEvent.click(plus);
    fireEvent.click(two);
    fireEvent.click(zero);
    fireEvent.click(zero);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('100+200');
  });

  it('should clear the input if the AC is pressed', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const two = screen.getByText<HTMLButtonElement>('2');
    fireEvent.click(two);

    const clearAll = screen.getByText<HTMLButtonElement>('AC');
    fireEvent.click(clearAll);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('');
  });

  it('should clear the last digit of the right operand if ⌫ is pressed with left operand and operator', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const two = screen.getByText<HTMLButtonElement>('2');
    fireEvent.click(two);

    const clearOne = screen.getByText<HTMLButtonElement>('⌫');
    fireEvent.click(clearOne);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1+');
  });

  it('should clear the operator if ⌫ is pressed without right operand', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const clearOne = screen.getByText<HTMLButtonElement>('⌫');
    fireEvent.click(clearOne);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1');
  });

  it('should clear the last digit of the left operand if ⌫ is pressed without operator and right operand', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const clearOne = screen.getByText<HTMLButtonElement>('⌫');
    fireEvent.click(clearOne);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('');
  });

  it('should evaluate the expression if left operand, operator and right operand are being set', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const two = screen.getByText<HTMLButtonElement>('2');
    fireEvent.click(two);

    const equal = screen.getByText<HTMLButtonElement>('=');
    fireEvent.click(equal);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('3');
  });

  it('should not evaluate the expression if left operand, operator and right operand are not being set', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const equal = screen.getByText<HTMLButtonElement>('=');
    fireEvent.click(equal);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1+');
  });

  it('should render a dot if dot is pressed and there is only a left operand value', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const dot = screen.getByText<HTMLButtonElement>('.');
    fireEvent.click(dot);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1.');
  });

  it('should render a dot if dot is pressed and there is a right operand value', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const two = screen.getByText<HTMLButtonElement>('2');
    fireEvent.click(two);

    const dot = screen.getByText<HTMLButtonElement>('.');
    fireEvent.click(dot);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1+2.');
  });

  it('should not render a dot if dot is pressed and there is an existing dot', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const two = screen.getByText<HTMLButtonElement>('2');
    fireEvent.click(two);

    const dot = screen.getByText<HTMLButtonElement>('.');
    fireEvent.click(dot);
    fireEvent.click(dot);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1+2.');
  });

  it('should not replace the operator if dot is pressed when no right operand is set', () => {
    render(<Calculator />);

    const one = screen.getByText<HTMLButtonElement>('1');
    fireEvent.click(one);

    const plus = screen.getByText<HTMLButtonElement>('+');
    fireEvent.click(plus);

    const dot = screen.getByText<HTMLButtonElement>('.');
    fireEvent.click(dot);

    const input = screen.getByRole<HTMLInputElement>('textbox');

    expect(input.value).toBe('1+');
  });
});

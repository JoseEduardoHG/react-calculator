import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import CalculatorButton from '../CalculatorButton';

describe('CalculatorButton', () => {
  it('should render', () => {
    render(<CalculatorButton />);
  });

  it('should render a text if a children is passed', () => {
    render(<CalculatorButton>Foo</CalculatorButton>);
    screen.getByRole('button', { name: 'Foo' });
  });

  it('should render a text if a prop called label is passed', () => {
    render(<CalculatorButton label='Foo' />);
    screen.getByRole('button', { name: 'Foo' });
  });
});

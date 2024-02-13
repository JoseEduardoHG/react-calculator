import classNames from 'classnames';

type SymbolType = 'number' | 'operator' | 'equal' | 'clear';
type Width = 1 | 2;

type CalculatorButtonProps = {
  children?: React.ReactNode;
  label?: string;
  width?: Width;
  symbol?: SymbolType;
  onClick?: () => void;
};

export default function CalculatorButton({
  children,
  label,
  onClick,
  width = 1,
  symbol = 'number',
}: CalculatorButtonProps) {
  return (
    <button
      className={classNames(
        'p-4 text-2xl font-bold text-white rounded-full shadow-md',
        {
          'bg-gray-200': symbol === 'number',
          'bg-yellow-400': symbol === 'operator',
          'bg-green-500': symbol === 'equal',
          'bg-red-500': symbol === 'clear',
          'grow-0': width === 1,
          grow: width === 2,
        },
      )}
      onClick={onClick}
    >
      {children ?? label ?? ''}
    </button>
  );
}

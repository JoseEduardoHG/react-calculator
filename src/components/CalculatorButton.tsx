import classNames from 'classnames';

type SymbolType = 'number' | 'operator' | 'equal' | 'clear';

type CalculatorButtonProps = {
  children?: React.ReactNode;
  label?: string;
  isDoubleWidth?: boolean;
  symbol?: SymbolType;
  onClick?: () => void;
};

export default function CalculatorButton({
  children,
  label,
  onClick,
  symbol = 'number',
  isDoubleWidth = false,
}: CalculatorButtonProps) {
  return (
    <button
      className={classNames({
        'basis-1/4 aspect-square shadow-md rounded-lg font-bold text-4xl text-white sm:text-7xl sm:rounded-2xl sm:font-bold sm:shadow-lg md:text-4xl md:rounded-lg md:shadow-md':
          true,
        'bg-slate-500': symbol === 'number',
        'bg-yellow-400': symbol === 'operator',
        'bg-red-500': symbol === 'clear',
        'bg-blue-500': symbol === 'equal',
        'basis-2/4 aspect-[2/1]': isDoubleWidth,
      })}
      onClick={onClick}
    >
      {children ?? label ?? ''}
    </button>
  );
}

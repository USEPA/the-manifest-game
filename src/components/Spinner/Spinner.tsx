import { ImSpinner8 } from 'react-icons/im';

interface SpinnerProps {
  testId?: string;
}

/**
 * Spinner - a loading spinner
 * @constructor
 */
export const Spinner = ({ testId }: SpinnerProps) => {
  return (
    <div className="flex h-screen items-center justify-center" data-testid={testId ?? 'spinner'}>
      <ImSpinner8 className="animate-spin font-bold text-gray-700" size={60} />
    </div>
  );
};

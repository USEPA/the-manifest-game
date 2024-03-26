import styles from 'components/Spinner/spinner.module.css';

interface SpinnerProps {
  testId?: string;
}

/**
 * Spinner - a loading spinner
 * https://loading.io/css/
 * @constructor
 */
export const Spinner = ({ testId }: SpinnerProps) => {
  return (
    <div className={styles.center} data-testid={testId ?? 'spinner'}>
      <div className={styles.spinnerRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

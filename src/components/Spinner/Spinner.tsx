import styles from 'components/Spinner/spinner.module.css';

/**
 * Spinner - a loading spinner
 * https://loading.io/css/
 * @constructor
 */
export const Spinner = () => {
  return (
    <div className={styles.center} data-testid="spinner">
      <div className={styles.spinnerRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

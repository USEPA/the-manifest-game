import styles from 'components/Error/errorMsg.module.css';

export const ErrorMsg = () => {
  return (
    <div className={styles.center}>
      <div className={styles.errorBox}>
        <h1>Something went wrong.</h1>
        <p>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          Tell us about it by{' '}
          <a href={'#'} className={styles.errorLink}>
            filing an ticket
          </a>
        </p>
      </div>
    </div>
  );
};

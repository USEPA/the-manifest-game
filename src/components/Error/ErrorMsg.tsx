import styles from 'components/Error/errorMsg.module.css';

export const ErrorMsg = () => {
  return (
    <div className={styles.center}>
      <div className={styles.errorBox}>
        <h1>Found a bug?</h1>
        <p>
          Tell us about it,{' '}
          <a href={import.meta.env.VITE_ISSUE_URL ?? '#'} className={styles.errorLink}>
            file a ticket
          </a>
        </p>
      </div>
    </div>
  );
};

import styles from './errorMsg.module.css';

/**
 * ErrorMsg displays a simple error message and a link to file a ticket.
 */
export const ErrorMsg = () => {
  return (
    <div className={styles.center}>
      <div className={styles.errorBox}>
        <h1>Something went wrong</h1>
        <p>
          <a href={import.meta.env.VITE_ISSUE_URL ?? '#'} className={styles.errorLink}>
            file a ticket
          </a>
        </p>
      </div>
    </div>
  );
};

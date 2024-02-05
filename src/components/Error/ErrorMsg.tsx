import styles from './errorMsg.module.css';

/**
 * ErrorMsg displays a simple error message and a link to file a ticket.
 */
export const ErrorMsg = () => {
  const issueURL = import.meta.env.VITE_ISSUE_URL;
  return (
    <div className={styles.center}>
      <div className={styles.errorBox}>
        <h1>Something went wrong</h1>
        {issueURL && (
          <p>
            <a href={issueURL} className={styles.errorLink}>
              file a ticket
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

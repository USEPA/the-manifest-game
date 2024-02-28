import styles from './errorMsg.module.css';

interface ErrorMsgProps {
  message?: string;
}

/**
 * ErrorMsg displays a simple error message and a link to file a ticket.
 */
export const ErrorMsg = ({ message }: ErrorMsgProps) => {
  const issueURL = import.meta.env.VITE_ISSUE_URL;
  return (
    <div className={styles.center}>
      <div className={styles.errorBox}>
        <h2>{message ?? 'An error occurred'}</h2>
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

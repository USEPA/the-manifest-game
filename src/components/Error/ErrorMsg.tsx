import styles from './error-msg.module.css';

export const ErrorMsg = () => {
  return (
    <div>
      <h1 className={styles.centerRed}>Something went wrong.</h1>
      <p>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        Tell us about it by <a href={'#'}>filing an ticket</a>
      </p>
    </div>
  );
};

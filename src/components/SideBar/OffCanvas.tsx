import styles from 'components/SideBar/offcanvas.module.css';
import React from 'react';

interface OffCanvasProps {
  title?: string;
  isOpen: boolean;
  handleClose: () => void;
}

/**
 * Sidebar for displaying content and help
 * @constructor
 */
export const OffCanvas = ({ title = 'Help', isOpen, handleClose }: OffCanvasProps) => {
  return (
    <>
      <div
        data-testid="offcanvas"
        id={'offcanvas'}
        className={`${styles.offcanvas} ${styles.right} ${isOpen ? styles.show : ''}`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby={styles.title}
        aria-modal="true"
        // onClick={(event) => event.stopPropagation()}
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button
            className={styles.close}
            onClick={handleClose}
            type="button"
            tabIndex={0}
            aria-label="Close"
          />
        </div>
        <div className={styles.content}>
          Some text as placeholder. In real life you can have the elements you have chosen. Like,
          text, images, lists, etc.
        </div>
      </div>
      {/* backdrop while open*/}
      <div className={`${styles.backdrop} ${isOpen ? styles.show : ''}`} />
    </>
  );
};

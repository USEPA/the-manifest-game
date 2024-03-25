import styles from 'components/SideBar/offcanvas.module.css';
import React, { useCallback, useEffect } from 'react';

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
  /** handle when user clicks outside the off canvas component*/
  const onClickOutside = useCallback(() => {
    if (isOpen) {
      if (handleClose) handleClose();
    }
  }, [isOpen, handleClose]);

  /** handle when user presses the escape key */
  const onEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        if (handleClose) handleClose();
      }
    },
    [isOpen, handleClose]
  );

  /** add event listeners for escape key keydown*/
  useEffect(() => {
    document.addEventListener('keydown', onEscKey, false);
    return () => document.removeEventListener('keydown', onEscKey);
  }, [onEscKey]);

  /** add event listeners for click outside */
  useEffect(() => {
    document.addEventListener('click', onClickOutside, false);
    return () => document.removeEventListener('click', onClickOutside);
  }, [onClickOutside]);

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
        aria-hidden={!isOpen}
        hidden={!isOpen}
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

import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import styles from './helpIcon.module.css';

interface HelpIconProps {
  onClick?: React.MouseEventHandler;
}

/**
 * icon to help users make decisions or direct them to more information
 * @constructor
 */
export const HelpIcon = ({ onClick }: HelpIconProps) => {
  return (
    <div className={styles.helpIcon}>
      <button aria-label="help" onClick={onClick}>
        <FaQuestionCircle size={20} />
      </button>
    </div>
  );
};

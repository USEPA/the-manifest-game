import styles from './dragHandle.module.css';

export const DragHandle = () => {
  return (
    <span className="node-drag-handle">
      <span className={styles.grip} />
    </span>
  );
};

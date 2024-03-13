import styles from 'components/Nodes/BaseNode/DragHandle/dragHandle.module.css';

export const DragHandle = () => {
  return (
    <span className="node-drag-handle">
      <span className={styles.grip} />
    </span>
  );
};

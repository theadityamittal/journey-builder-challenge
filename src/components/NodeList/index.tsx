// src/components/NodeList
import React from 'react';
import type { Node } from '../../api/types';
import styles from './NodeList.module.css'; // Uncomment if you have styles

interface NodeListProps {
  nodes: Node[];
  onSelectNode?: (nodeId: string) => void;
}

const NodeList: React.FC<NodeListProps> = ({ nodes, onSelectNode }) => (
  <ul className={styles.list}>
    {nodes.map(node => (
      <li
        key={node.id}
        className={styles.item}
        onClick={() => onSelectNode?.(node.id)}
      >
        <p className={styles.title}>{node.data.name}</p>
        <p className={styles.id}>ID: {node.id}</p>
      </li>
    ))}
  </ul>
);

export default NodeList;

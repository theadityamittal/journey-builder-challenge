// src/components/NodeList
import React from 'react';
import type { Node } from '../../api/types';

interface NodeListProps {
  nodes: Node[];
}

const NodeList: React.FC<NodeListProps> = ({ nodes }) => (
  <ul>
    {nodes.map((node) => (
      <li key={node.id} style={{ marginBottom: '0.5rem' }}>
        <strong>{node.data.name}</strong>{' '}
        <small>(ID: {node.id})</small>
        {node.data.prerequisites.length > 0 && (
          <div style={{ marginLeft: '1rem', fontStyle: 'italic' }}>
            Prerequisites: {node.data.prerequisites.join(', ')}
          </div>
        )}
      </li>
    ))}
  </ul>
);

export default NodeList;

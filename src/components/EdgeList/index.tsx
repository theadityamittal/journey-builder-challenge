// src/components/EdgeList.tsx
import React from 'react';
import type { Edge } from '../../api/types';

interface EdgeListProps {
  edges: Edge[];
}

const EdgeList: React.FC<EdgeListProps> = ({ edges }) => (
  <ul>
    {edges.map((edge, idx) => (
      <li key={idx}>
        {edge.source} → {edge.target}
      </li>
    ))}
  </ul>
);

export default EdgeList;

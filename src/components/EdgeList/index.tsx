// src/components/EdgeList.tsx
import React from 'react';
import type { Edge, Node } from '../../api/types';

interface EdgeListProps {
  edges: Edge[];
  nodes: Node[];
}

const EdgeList: React.FC<EdgeListProps> = ({ edges, nodes }) => {
  // Build a lookup from ID → name
  const idToName = Object.fromEntries(
    nodes.map(node => [node.id, node.data.name])
  ) as Record<string,string>;

  return (
    <ul>
      {edges.map((edge, idx) => {
        const sourceName = idToName[edge.source] ?? edge.source;
        const targetName = idToName[edge.target] ?? edge.target;
        return (
          <li key={idx}>
            {sourceName} → {targetName}
          </li>
        );
      })}
    </ul>
  );
};

export default EdgeList;

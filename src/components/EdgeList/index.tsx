// src/components/EdgeList.tsx
import React from 'react';
import type { Edge, Node } from '../../api/types';
import { Paper, Typography } from '@mui/material';

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
    <Paper elevation={2} sx={{ padding: 2, maxHeight: '400px', overflowY: 'auto' }}>
      {edges.map((edge, idx) => {
        const sourceName = idToName[edge.source] ?? edge.source;
        const targetName = idToName[edge.target] ?? edge.target;
        return (
          <Typography key={idx} variant="body1" gutterBottom>
            {sourceName} → {targetName}
          </Typography>
        );
      })}
    </Paper>
  );
};

export default EdgeList;

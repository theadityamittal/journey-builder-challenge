// src/components/NodeList
import React from 'react';
import type { Node } from '../../api/types';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

interface NodeListProps {
  nodes: Node[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

const NodeList: React.FC<NodeListProps> = ({ nodes, selectedNodeId, onSelectNode }) => {

  return (
    <Box
      sx={{
        width: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))',
        gap: 2
      }}
    >
    {nodes.map(node => (
      <Card key={node.id}>
        <CardActionArea
          onClick={() => onSelectNode(node.id)}
          data-active={selectedNodeId === node.id ? '' : undefined}
          sx={{
            height: '100%',
            '&[data-active]': {
              backgroundColor: "#e5e5e5",
              '&:hover': {
                backgroundColor: 'action.selectedHover',
              },
            },
          }}
        >
          <CardContent sx={{ height: '100%' }}>
            <Typography variant="h5" component="div">
              {node.data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {node.id}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
    </Box>
)};

export default NodeList;

import React, { useEffect, useState } from 'react';
import { fetchBlueprint } from './api/challengeApi';
import type { Blueprint } from './api/types';
import NodeList from './components/NodeList';
import EdgeList from './components/EdgeList';
import PrefillMapping from './components/PrefillMapping';
import type { Node, Form } from './api/types';
import './App.css';
import { Box, Divider, Typography } from '@mui/material';

function App() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const updateMapping = (
   nodeId: string,
   field: string,
   newSource: string | null   // null ⇒ clear
 ) => {
   if (!blueprint) return;

   // deep-clone the blueprint slice we’re touching
   const next = structuredClone(blueprint);

   const node = next.nodes.find(n => n.id === nodeId);
   if (!node) return;

   if (newSource) {
     node.data.input_mapping[field] = newSource;
   } else {
     delete node.data.input_mapping[field];
   }

   setBlueprint(next);
 };

  useEffect(() => {
    fetchBlueprint()
      .then(data => setBlueprint(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!blueprint) return <div>Loading blueprint…</div>;

  const selectedNode: Node | undefined = blueprint.nodes.find(n => n.id === selectedNodeId!);
  const selectedForm: Form | undefined = selectedNode && blueprint.forms.find(f => f.id === selectedNode.data.component_id);

  return (
    <div className="App">
      <Typography variant="h2" gutterBottom>
        Journey Builder Challenge
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
        <Box>
          <NodeList
            nodes={blueprint.nodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={id => setSelectedNodeId(id)}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Typography variant="h5" gutterBottom>
            Dependency Graph
          </Typography>
          <EdgeList 
            edges={blueprint.edges} 
            nodes={blueprint.nodes} 
          />
        </Box>
      </Box>
      
      {selectedNode && selectedForm && (
        <PrefillMapping
          node={selectedNode}
          form={selectedForm}
          allNodes={blueprint.nodes}
          allForms={blueprint.forms}
          updateMapping={updateMapping}
        />
      )}

    </div>
  );
}

export default App;

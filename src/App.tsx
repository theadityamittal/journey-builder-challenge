import React, { useEffect, useState } from 'react';
import { fetchBlueprint } from './api/challengeApi';
import type { Blueprint } from './api/types';
import NodeList from './components/NodeList';
import EdgeList from './components/EdgeList';
import PrefillMapping from './components/PrefillMapping';
import type { Node, Form } from './api/types';

function App() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

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
    <div style={{ padding: '1rem' }}>
      <h1>Journey Blueprint</h1>
      <NodeList 
        nodes={blueprint.nodes} 
        onSelectNode={id => setSelectedNodeId(id)}
      />
      <h2>Dependencies</h2>
      <EdgeList 
        edges={blueprint.edges} 
        nodes={blueprint.nodes} 
      />
      
      {selectedNode && selectedForm && (
        <PrefillMapping
          node={selectedNode}
          form={selectedForm}
          allNodes={blueprint.nodes}
          allForms={blueprint.forms}
        />
      )}

    </div>
  );
}

export default App;

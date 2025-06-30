import React, { useEffect, useState } from 'react';
import { fetchBlueprint } from './api/challengeApi';
import type { Blueprint } from './api/types';
import NodeList from './components/NodeList';


function App() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlueprint()
      .then(data => setBlueprint(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!blueprint) return <div>Loading blueprint…</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Journey Blueprint</h1>
      <NodeList nodes={blueprint.nodes} />
    </div>
  );
}

export default App;

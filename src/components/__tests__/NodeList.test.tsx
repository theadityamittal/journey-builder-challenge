import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NodeList from '../NodeList';
import type { Node } from '../../api/types';

const mockNodes: Node[] = [
  {
    id: 'n1',
    type: 'form',
    position: { x: 0, y: 0 },
    data: {
      id: 'bp_c1',
      component_key: 'k1',
      component_type: 'form',
      component_id: 'f1',
      name: 'Form A',
      prerequisites: [],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: { number: 0, unit: 'minutes' },
      approval_required: false,
      approval_roles: [],
    },
  },
];

test('renders form names', () => {
  render(
    <NodeList
      nodes={mockNodes}
      selectedNodeId={null}
      onSelectNode={() => {/* noop */}}
    />,
  );
  expect(screen.getByText('Form A')).toBeInTheDocument();
});

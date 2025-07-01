/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen } from '@testing-library/react';
import EdgeList from '../EdgeList';
import type { Edge, Node } from '../../api/types';

// 1) mock two nodes so we can map id → name
const nodes: Node[] = [
  {
    id: 'n1',
    type: 'form',
    position: { x: 0, y: 0 },
    data: {
      id: 'bp1',
      component_key: 'n1',
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
  {
    id: 'n2',
    type: 'form',
    position: { x: 0, y: 0 },
    data: {
      id: 'bp2',
      component_key: 'n2',
      component_type: 'form',
      component_id: 'f2',
      name: 'Form B',
      prerequisites: [],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: { number: 0, unit: 'minutes' },
      approval_required: false,
      approval_roles: [],
    },
  },
];

// 2) mock two edges between them
const edges: Edge[] = [
  { source: 'n1', target: 'n2' },
  { source: 'n2', target: 'n1' },
];

it('renders each edge as "Form A → Form B" etc.', () => {
  render(<EdgeList edges={edges} nodes={nodes} />);

  // Expect both relationships to appear
  expect(screen.getByText('Form A → Form B')).toBeInTheDocument();
  expect(screen.getByText('Form B → Form A')).toBeInTheDocument();
});

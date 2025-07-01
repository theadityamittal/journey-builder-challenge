// src/components/__tests__/MappingModal.test.tsx
/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MappingModal from '../MappingModal';
import type { Node } from '../../api/types';

it('shows its title & children when open, hides when closed', async () => {
  const onClose = jest.fn();

  const mockNode: Node = {
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
  }

  // Create mock props that match ModalProps interface
  const mockProps = {
    title: 'Test',
    isOpen: false,
    onClose,
    node: mockNode,
    directParentNodes: [],
    transitiveParentNodes: [],
    globalFields: [],
    formMap: new Map(),
    updateMapping: jest.fn(),
  };

  const { rerender } = render(<MappingModal {...mockProps} />);

  // closed → nothing in the document
  expect(screen.queryByText('Global Data')).toBeNull();

  // open it
  rerender(<MappingModal {...mockProps} isOpen={true} />);

  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.getByText('Direct Parent Fields')).toBeInTheDocument();
  expect(screen.getByText('Transitive Parent Fields')).toBeInTheDocument();
  expect(screen.getByText('Global Data')).toBeInTheDocument();

  // click backdrop to close
  await userEvent.keyboard('{Escape}');
  expect(onClose).toHaveBeenCalled();
});

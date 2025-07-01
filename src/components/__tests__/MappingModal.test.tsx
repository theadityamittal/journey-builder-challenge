// src/components/__tests__/MappingModal.test.tsx
/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MappingModal from '../MappingModal';
import type { Node } from '../../api/types';

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

it('shows its title & children when open, hides when closed', async () => {
  const onClose = jest.fn();

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

it('allows selecting items from accordions', async () => {
  const updateMapping = jest.fn();
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
  const mockProps = {
    title: 'Test',
    isOpen: true,
    onClose: jest.fn(),
    node: mockNode,
    directParentNodes: [],
    transitiveParentNodes: [],
    globalFields: ['appVersion', 'userRole'],
    formMap: new Map(),
    updateMapping,
  };

  render(<MappingModal {...mockProps} />);

  // Expand Global Data accordion
  await userEvent.click(screen.getByRole('button', { name: /global data/i }));
  
  // Click on an item
  await userEvent.click(screen.getByText('appVersion'));
  
  expect(updateMapping).toHaveBeenCalled();
});

it('allows selecting items from direct parent fields', async () => {
  const updateMapping = jest.fn();
  const onClose = jest.fn();
  
  const parentNode = {
    id: 'parent1',
    type: 'form' as const,
    position: { x: 0, y: 0 },
    data: {
      id: 'bp_parent',
      component_key: 'parent1',
      component_type: 'form' as const,
      component_id: 'parent_form',
      name: 'Parent Form',
      prerequisites: [],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: { number: 0, unit: 'minutes' },
      approval_required: false,
      approval_roles: [],
    },
  };

  const parentForm = {
    id: 'parent_form',
    field_schema: { properties: { name: { type: 'string' } } }
  };

  const formMap = new Map([['parent_form', parentForm]]);

  const mockProps = {
    title: 'Test',
    isOpen: true,
    onClose,
    activeField: 'email',
    node: mockNode,
    directParentNodes: [parentNode],
    transitiveParentNodes: [],
    globalFields: [],
    formMap,
    updateMapping,
  };

  render(<MappingModal {...mockProps} />);

  // Click on the parent field
  await userEvent.click(screen.getByText('Parent Form → name'));
  
  expect(updateMapping).toHaveBeenCalledWith(mockNode.id, 'email', 'parent1:name');
  expect(onClose).toHaveBeenCalled();
});

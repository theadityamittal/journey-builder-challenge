/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrefillMapping from '../PrefillMapping';
import type { Node, Form } from '../../api/types';

const form: Form = {
  id: 'f_test',
  name: 'Reusable Form',
  description: 'test',
  is_reusable: false,
  field_schema: {
    type: 'object',
    properties: {
      email: {
        avantos_type: 'short-text',
        title: 'Email',
        type: 'string',
      },
    },
    required: ['email'],
  },
  ui_schema: {},
  dynamic_field_config: {},
};

const node: Node = {
  id: 'node_1',
  type: 'form',
  position: { x: 0, y: 0 },
  data: {
    id: 'bp_c1',
    component_key: 'node_1',
    component_type: 'form',
    component_id: form.id,
    name: 'Form A',
    prerequisites: [],       // no parents
    permitted_roles: [],
    input_mapping: {},       // start unmapped
    sla_duration: { number: 0, unit: 'minutes' },
    approval_required: false,
    approval_roles: [],
  },
};

const updateSpy = jest.fn();

it('lets the user add a mapping to the "email" field', async () => {
  render(
    <PrefillMapping
      node={node}
      form={form}
      allNodes={[node]}
      allForms={[form]}
      updateMapping={updateSpy}
    />
  );

  // Open the Add modal
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  // Expand the "Direct Parent Fields" section so its <li> items show
  await userEvent.click(screen.getByRole('button', { name: /Direct Parent Fields/i }));

  // Expand the "Transitive Parent Fields" section so its <li> items show
  await userEvent.click(screen.getByRole('button', { name: /Transitive Parent Fields/i }));

  // Expand the "Global Data" section so its <li> items show
  await userEvent.click(screen.getByRole('button', { name: /Global Data/i }));

  // Click the "appVersion" list item
  await userEvent.click(screen.getByText('appVersion'));

  // Confirm updateMapping was called with the right args
  expect(updateSpy).toHaveBeenCalledWith(node.id, 'email', 'global:appVersion');
});

it('handles empty form fields', () => {
  const emptyForm = { ...form, field_schema: { properties: {} } };
  render(
    <PrefillMapping
      node={node}
      form={emptyForm}
      allNodes={[node]}
      allForms={[emptyForm]}
      updateMapping={jest.fn()}
    />
  );
  
  expect(screen.getByText('No fields available for mapping in this form.')).toBeInTheDocument();
});

it('handles missing mapping', () => {
  const nodeWithMapping = {
    ...node,
    data: { ...node.data, input_mapping: { email: 'global:test' } }
  };
  
  render(
    <PrefillMapping
      node={nodeWithMapping}
      form={form}
      allNodes={[nodeWithMapping]}
      allForms={[form]}
      updateMapping={jest.fn()}
    />
  );
});

it('handles clearing an existing mapping', async () => {
  const clearSpy = jest.fn();
  const nodeWithMapping = {
    ...node,
    data: { ...node.data, input_mapping: { email: 'global:test' } }
  };
  
  render(
    <PrefillMapping
      node={nodeWithMapping}
      form={form}
      allNodes={[nodeWithMapping]}
      allForms={[form]}
      updateMapping={clearSpy}
    />
  );

  await userEvent.click(screen.getByRole('button', { name: /clear/i }));
  expect(clearSpy).toHaveBeenCalledWith(nodeWithMapping.id, 'email', null);
});

it('handles editing an existing mapping', async () => {
  const nodeWithMapping = {
    ...node,
    data: { ...node.data, input_mapping: { email: 'global:test' } }
  };
  
  render(
    <PrefillMapping
      node={nodeWithMapping}
      form={form}
      allNodes={[nodeWithMapping]}
      allForms={[form]}
      updateMapping={jest.fn()}
    />
  );

  await userEvent.click(screen.getByRole('button', { name: /edit/i }));
  expect(screen.getByText(/Select source for/)).toBeInTheDocument();
});

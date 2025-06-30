// Top-level graph description
export interface Blueprint {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: Node[];
  edges: Edge[];
  forms: Form[];
  branches: unknown[]; // not used yet
  triggers: unknown[]; // not used yet
}

export interface Node {
  id: string;
  type: string;
  position: Position;
  data: NodeData;
}

export interface Position {
  x: number;
  y: number;
}

export interface NodeData {
  id: string;
  component_key: string;
  component_type: string;
  component_id: string;
  name: string;
  prerequisites: string[];
  permitted_roles: unknown[];
  input_mapping: Record<string, unknown>;
  sla_duration: { number: number; unit: string };
  approval_required: boolean;
  approval_roles: unknown[];
}

export interface Edge {
  source: string;
  target: string;
}

export interface Form {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  field_schema: Record<string, unknown>;
  ui_schema: Record<string, unknown>;
  dynamic_field_config: Record<string, unknown>;
}
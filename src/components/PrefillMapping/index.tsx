// src/components/PrefillMapping.tsx
import React, { useState } from 'react';
import type { Node, Form } from '../../api/types';
import styles from './PrefillMapping.module.css';
import Modal from '../Modal';

interface PrefillMappingProps {
  node: Node;
  form: Form;
  allNodes: Node[];
  allForms: Form[];
}

const globalFields = ['appVersion', 'timestamp', 'clientOrgName'];

const PrefillMapping: React.FC<PrefillMappingProps> = ({ node, form, allNodes, allForms }) => {
  // Extract all field names from the JSON Schema
  const [modalOpen, setModalOpen] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Build a map for quick lookup
  const nodeMap = new Map(allNodes.map(n => [n.id, n]));
  const formMap = new Map(allForms.map(f => [f.id, f]));

  // 1) Direct parents: IDs in node.data.prerequisites
  const directParentNodes = node.data.prerequisites
    .map(id => nodeMap.get(id))
    .filter((n): n is Node => Boolean(n));

  // 2) Transitive parents: recursive DFS
  const getAncestors = (id: string, seen = new Set<string>()): Set<string> => {
    const prereqs = nodeMap.get(id)?.data.prerequisites || [];
    for (const pid of prereqs) {
      if (!seen.has(pid)) {
        seen.add(pid);
        getAncestors(pid, seen);
      }
    }
    return seen;
  };
  const allAncestorIds = getAncestors(node.id);
  // remove direct ones and self
  directParentNodes.forEach(n => allAncestorIds.delete(n.id));
  allAncestorIds.delete(node.id);
  const transitiveParentNodes = [...allAncestorIds]
    .map(id => nodeMap.get(id))
    .filter((n): n is Node => Boolean(n));


  const fieldNames = Object.keys(
    (form.field_schema as any).properties || {}
  );

  // Existing mapping for this node (empty if none)
  const existingMap = node.data.input_mapping as Record<string, string>;

  return (
    <div className={styles.container}>
      <h2>Prefill Mapping for “{node.data.name}”</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Field</th>
            <th>Mapping</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fieldNames.map(field => {
            const mapped = existingMap[field];
            return (
              <tr key={field}>
                <td>{field}</td>
                <td>
                  {mapped
                    ? `→ ${mapped}`
                    : <span className={styles.none}>(no mapping)</span>}
                </td>
                <td>
                  {!mapped && (
                    <button
                      className={styles.add}
                      onClick={() => {
                        setActiveField(field);
                        setModalOpen(true);
                      }}
                    >
                      Add
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        title={activeField ? `Select source for “${activeField}”` : ''}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setActiveField(null);
        }}
      >
        {/* Modal content for adding/editing mappings */}
        <div>
          <h4>Direct Parent Fields</h4>
          <ul>
            {directParentNodes.flatMap(parent => {
              const pForm = formMap.get(parent.data.component_id)!;
              return Object.keys((pForm.field_schema as any).properties).map(f => (
                <li key={`${parent.id}-${f}`}>{parent.data.name} → {f}</li>
              ));
            })}
          </ul>

          <h4>Transitive Parent Fields</h4>
          <ul>
            {transitiveParentNodes.flatMap(parent => {
              const pForm = formMap.get(parent.data.component_id)!;
              return Object.keys((pForm.field_schema as any).properties).map(f => (
                <li key={`${parent.id}-${f}`}>{parent.data.name} → {f}</li>
              ));
            })}
          </ul>

          <h4>Global Data</h4>
          <ul>
            {globalFields.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>

      </Modal>
    </div>
  );
};

export default PrefillMapping;

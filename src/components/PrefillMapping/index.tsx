// src/components/PrefillMapping.tsx
import React, { useState } from 'react';
import type { Node, Form } from '../../api/types';
import styles from './PrefillMapping.module.css';
// import Modal from '../Modal';
import { Accordion, Box, Divider, Modal, Paper, Typography } from '@mui/material';
import MappingModal from '../MappingModal';

interface PrefillMappingProps {
  node: Node;
  form: Form;
  allNodes: Node[];
  allForms: Form[];
  updateMapping: (nodeId: string, field: string, source: string | null) => void;
}

const globalFields = ['appVersion', 'timestamp', 'clientOrgName'];

const PrefillMapping: React.FC<PrefillMappingProps> = ({ node, form, allNodes, allForms, updateMapping }) => {
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
    <Paper elevation={3} sx={{ margin: 2, padding: 2 , width: '60%'}}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="h2" className={styles.title}>
          Prefill Mapping for “{node.data.name}”
        </Typography>
        <Typography variant="body1" className={styles.description}>
          Prefill fields for this form
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: 2 }}>
        {fieldNames.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No fields available for mapping in this form.
          </Typography>
        ) : (fieldNames.map(field => {
          const mapped = existingMap[field];
          // If no mapping
          return (
            <Box 
              key={field} 
              className={styles.fieldRow}
            >
              <Box 
                className={styles.fieldName}
                sx={{color: mapped ? 'text.primary' : 'text.secondary'}}
              >
                <Typography variant="body1">
                  {mapped ? `${field} → ${mapped}` : field}
                </Typography>
              </Box>
              <Box className={styles.actions}>
                {mapped ? (
                  <>
                    <button
                      className={styles.clear}
                      onClick={() => updateMapping(node.id, field, null)}
                    >
                      Clear
                    </button>
                    <button
                      className={styles.edit}
                      onClick={() => {
                        setActiveField(field);
                        setModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </>
                ) : (
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
              </Box>
            </Box>
          );
        }))}
      </Box>
      <MappingModal
        title={activeField ? `Select source for “${activeField}”` : ''}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setActiveField(null);
        }}
        activeField={activeField}
        node={node}
        directParentNodes={directParentNodes}
        transitiveParentNodes={transitiveParentNodes}
        globalFields={globalFields}
        formMap={formMap}
        updateMapping={updateMapping}
      />
    </Paper>
  )
};

export default PrefillMapping;

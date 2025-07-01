// src/components/MappingModal.tsx
import React from 'react';
import styles from './MappingModal.module.css';
import { Accordion, AccordionSummary, Modal, Paper, Typography } from '@mui/material';
import type { Node } from '../../api/types';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  activeField?: string | null;
  node: Node
  directParentNodes: Node[];
  transitiveParentNodes: Node[];
  globalFields: string[];
  formMap: Map<string, any>;
  updateMapping: (nodeId: string, field: string, source: string | null) => void;
}

const MappingModal: React.FC<ModalProps> = ({ 
  title, 
  isOpen, 
  onClose, 
  activeField, 
  node, 
  directParentNodes, 
  transitiveParentNodes, 
  globalFields, 
  formMap, 
  updateMapping
}) => {
  const [expanded, setExpanded] = React.useState<string>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : '');
    };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper elevation={4} sx={{ padding: 3, width: '50%', margin: 'auto', marginTop: '10%' }}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary>
            <Typography>Direct Parent Fields</Typography>
          </AccordionSummary>
          <div>
            {directParentNodes.map(parent => {
              const pForm = formMap.get(parent.data.component_id)!;
              return (
                <ul key={parent.id}>
                  {Object.keys((pForm.field_schema as any).properties).map(f => (
                    <li
                      key={`${parent.id}-${f}`}
                      className={styles.pick}
                      onClick={() => {
                        updateMapping(node.id, activeField!, `${parent.id}:${f}`);
                        onClose();
                      }}
                    >
                      {parent.data.name} → {f}
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary>
            <Typography>Transitive Parent Fields</Typography>
          </AccordionSummary>
          <div>
            {transitiveParentNodes.map(parent => {
              const pForm = formMap.get(parent.data.component_id)!;
              return (
                <ul key={parent.id}>
                  {Object.keys((pForm.field_schema as any).properties).map(f => (
                    <li
                      key={`${parent.id}-${f}`}
                      className={styles.pick}
                      onClick={() => {
                        updateMapping(node.id, activeField!, `${parent.id}:${f}`);
                        onClose();
                      }}
                    >
                      {parent.data.name} → {f}
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary>
            <Typography>Global Data</Typography>
          </AccordionSummary>
          <div>
            <ul>
              {globalFields.map(f => (
                <li
                  key={f}
                  className={styles.pick}
                  onClick={() => {
                    updateMapping(node.id, activeField!, `global:${f}`);
                    onClose();
                  }}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Accordion>
      </Paper>
    </Modal>
  );
};

export default MappingModal;

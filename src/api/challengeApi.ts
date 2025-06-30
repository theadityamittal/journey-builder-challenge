// src/api/challengeApi.ts
import apiClient from './apiClient';

export interface Node {
  id: string;
  name: string;
  parents: string[];
  // …extend based on the actual shape you see
}

const challengeId = import.meta.env.VITE_CHALLENGE_ID as string;

export interface Blueprint {
  nodes: Node[];
  edges: { from: string; to: string }[];
}

export const fetchBlueprint = async (): Promise<Blueprint> => {
  const url = `/api/v1/${challengeId}/actions/blueprints/${challengeId}/graph`;
  const resp = await apiClient.get<Blueprint>(url);
  return resp.data;
};

// src/api/challengeApi.ts
import apiClient from './apiClient';
import type { Blueprint } from './types';

const challengeId = import.meta.env.VITE_CHALLENGE_ID as string;

export const fetchBlueprint = async (): Promise<Blueprint> => {
  const url = `/api/v1/${challengeId}/actions/blueprints/${challengeId}/graph`;
  const resp = await apiClient.get<Blueprint>(url);
  return resp.data;
};

// src/api/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://makefizz.buzz/api/challenges/cmbmgaa4n0001kd7yuf4ohhlw',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
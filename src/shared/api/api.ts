import axios from 'axios';

import { BASE_URL } from '@/shared/constants';

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

import axios from 'axios';
import { Job } from '../types';

const BASE_URL = 'https://testapi.getlokalapp.com/common/jobs';

export const fetchJobs = async (page: number): Promise<Job[]> => {
  try {
    const response = await axios.get<Job[]>(`${BASE_URL}?page=${page}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
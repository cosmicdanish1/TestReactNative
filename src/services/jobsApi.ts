import axios from 'axios';
import { Job, ApiResponse } from '../types';

const BASE_URL = 'https://testapi.getlokalapp.com/common/jobs';

export const fetchJobs = async (page: number): Promise<Job[]> => {
  try {
    console.log(`Fetching jobs for page ${page}`);
    const response = await axios.get<ApiResponse>(`${BASE_URL}?page=${page}`);
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    
    const jobs = response.data.results || [];
    console.log(`Received ${jobs.length} jobs`);
    return jobs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Response:', error.response?.data);
    } else {
      console.error('Error fetching jobs:', error);
    }
    return [];
  }
};
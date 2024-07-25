export interface Job {
  id?: string; 
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string;
  posted_at: string;
}

export interface ApiResponse {
  data: Job[];
  results: Job[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export type RootStackParamList = {
  JobsList: undefined;
  JobDetail: { job: Job };
};

export type RootTabParamList = {
  Jobs: undefined;
  Bookmarks: undefined;
};
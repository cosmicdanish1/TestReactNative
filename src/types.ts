export interface Job {
  id: string;
  title: string;
  location: string;
  salary: string;
  phone: string;
  description: string;
}

export type RootStackParamList = {
  JobsList: undefined;
  JobDetail: { job: Job };
};

export type RootTabParamList = {
  Jobs: undefined;
  Bookmarks: undefined;
};
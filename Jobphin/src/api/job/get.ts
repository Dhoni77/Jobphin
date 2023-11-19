import { IJob } from '@/models';
import { ApiService } from '@/api';

export const getJobs = async () => {
  const data = await ApiService.axios.instance
    .get<IJob[]>('/jobs')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
  return data;
};

import { IJob } from '@/models';
import { ApiService } from '@/api';

export const createJob = async (job: IJob) => {
  const data = await ApiService.axios.instance
    .post('/jobs', job)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
  return data;
};

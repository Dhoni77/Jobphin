import { IJob } from '@/models';
import { ApiService } from '@/api';

export const updateJob = async (job: IJob) => {
  const data = await ApiService.axios.instance
    .put(`/jobs/${job.id}`, job)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
  return data;
};

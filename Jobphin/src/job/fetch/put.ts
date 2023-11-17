import { IJob } from '../../models';
import { ApiService } from './axios';

export const updateJob = async (job: IJob) => {
  const data = await ApiService.axios.instance
    .put(`/jobs/${job.id}`, job)
    .then((response) => response.data)
    .catch((error) => console.log(error));
  return data;
};

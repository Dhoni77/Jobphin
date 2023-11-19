import { ApiService } from './axios';
import { getJobs } from './job/get';
import { createJob } from './job/post';
import { updateJob } from './job/put';
import { deleteJob } from './job/delete';

export const JOB_BASE_URL =
  'https://65570fd5bd4bcef8b611f8ac.mockapi.io/api/v1';

export { getJobs, createJob, updateJob, deleteJob, ApiService };

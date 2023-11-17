import { getJobs } from './get'
import { createJob } from './post'
import { updateJob } from './put'
import { deleteJob } from './delete'

export const JOB_BASE_URL =
  'https://65570fd5bd4bcef8b611f8ac.mockapi.io/api/v1';

export { getJobs, createJob, updateJob, deleteJob }
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IJob } from '@/models';

interface Payload<T> {
  job: T;
  loading?: boolean;
}

export const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [] as IJob[],
    loading: true,
  },
  reducers: {
    loadJobs: (state, action: PayloadAction<Payload<IJob[]>>) => {
      state.jobs = action.payload.job;
      state.loading = action.payload.loading ?? false;
    },
    addJob: (state, action: PayloadAction<Payload<IJob>>) => {
      state.jobs = state.jobs.concat(action.payload.job);
    },
    modifyJob: (state, action: PayloadAction<Payload<IJob>>) => {
      state.jobs = state.jobs
        .filter((job) => job.id !== action.payload.job.id)
        .concat(action.payload.job);
    },
    removeJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
  },
});

export const { addJob, loadJobs, modifyJob, removeJob } = jobSlice.actions;

export default jobSlice.reducer;

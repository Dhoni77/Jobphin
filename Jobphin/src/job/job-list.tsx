import { Apply, IJob } from '@/models';
import netflix from '@assets/netflix.png';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { JobEditContainer } from './edit-job';
import { getJobs } from '@/api';
import { deleteJob } from '@/api';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { loadJobs, removeJob } from '@/state/jobSlice';
import { Button } from '@/ui/Button/Button';

export function DisplayJobs() {
  const dispatch = useAppDispatch();
  const { jobs, loading } = useAppSelector((state) => state.jobs);
  useEffect(() => {
    getJobs()
      .then((data) => {
        dispatch(loadJobs({ job: data, loading: false }));
      })
      .catch(() => {
        dispatch(loadJobs({ job: [] as IJob[], loading: false }));
        toast('Loading jobs failed', {
          duration: 2000,
          icon: '❌',
          position: 'top-right',
        });
      });
  }, []);

  return loading ? (
    <div className='flex items-center justify-center'>
      <div
        className='mt-5 h-20 w-20 animate-spin rounded-full border-[3px] 
        border-current border-t-transparent text-blue-600 dark:text-blue-500'
        role='status'
        aria-label='loading'
      ></div>
    </div>
  ) : (
    <div className='flex flex-wrap bg-slate-200'>
      {jobs?.map((job, idx) => <JobCard job={job} key={idx} />)}
    </div>
  );
}

interface IJobCardProps {
  job: IJob;
}

export function JobCard(props: IJobCardProps) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { job } = props;

  const closeModal = () => setIsOpen(false);

  const editCard = () => {
    setIsOpen(true);
  };

  const deleteCard = (id: string) => {
    deleteJob(id)
      .then(() => {
        dispatch(removeJob(id));
      })
      .catch(() => {
        toast('Delete job failed', {
          duration: 2000,
          icon: '❌',
          position: 'top-right',
        });
      });
  };

  return (
    <div className='w-full px-[16px] pb-[24px] pt-[16px] md:w-1/2 lg:w-1/2 xl:w-1/2'>
      <div className='flex rounded-md border border-solid border-white bg-card-color shadow-white'>
        <div className='flex-none'>
          <img src={netflix} alt='' className='h-[50px] w-[50px]' />
        </div>
        <div className='flex-1 space-y-1'>
          <h3 className='mt-2 text-left text-lg text-job-dark'>{job.title}</h3>
          <p className='text-left text-sm text-job-dark'>{`${job.companyName} - ${job.industry}`}</p>
          <p className='pb-[24px] text-left text-sm text-slate-500'>{`${job.location} (${job.remoteType})`}</p>
          <p className='pb-[8px] text-left text-sm text-job-dark'>
            Part-Time (9.00 am - 5.00 pm IST)
          </p>
          <p className='pb-[8px] text-left text-sm text-job-dark'>{`Experience (${job.minExperience} - ${job.maxExperience} years)`}</p>
          <p className='pb-[8px] text-left text-sm text-job-dark'>{`INR (₹) ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()} / Month`}</p>
          <p className='pb-[24px] text-left text-sm text-job-dark'>{`${job.totalEmployee} employees`}</p>
          <div className='mt-auto flex justify-start pb-[16px]'>
            {job.apply === Apply.QuickApply ? (
              <Button className='rounded-md bg-blue-500'>
                {Apply.QuickApply}
              </Button>
            ) : (
              <Button className='rounded-md border-2 border-blue-300 font-medium text-cyan-500'>
                External Apply
              </Button>
            )}
          </div>
        </div>
        <div className='mt-2 flex-1'>
          <div className='flex items-center justify-end'>
            <div className='mr-2 flex justify-center gap-4'>
              <PencilSquareIcon
                onClick={() => editCard()}
                className='h-5 w-5 cursor-pointer text-slate-500'
              />
              <TrashIcon
                onClick={() => deleteCard(job.id)}
                className='h-5 w-5 cursor-pointer text-slate-500'
              />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <JobEditContainer isOpen={isOpen} closeModal={closeModal} job={job} />
      )}
    </div>
  );
}

import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Apply, IJob, IJobSchema } from '@/models';
import { FieldsetLegend, Input, Label } from '@/ui';
import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from '@/ui';
import { Fragment, useState } from 'react';
import { updateJob } from '../api';
import { modifyJob } from '@/state/jobSlice';
import { useAppDispatch } from '@/state/hooks';
import { Button } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMsg } from '@/ui';

interface Props {
  job: IJob;
  closeModal: () => void;
}

export function JobEditForm(props: Props) {
  const dispatch = useAppDispatch();
  const { job, closeModal } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJob>({
    defaultValues: {
      ...job,
    },
    resolver: zodResolver(IJobSchema),
  });

  const [loading, setLoading] = useState(false);

  const submitHandler: SubmitHandler<IJob> = (data, event) => {
    event?.preventDefault();
    setLoading(true);
    updateJob(data)
      .then((job: IJob) => {
        setLoading(false);
        dispatch(modifyJob({ job }));
        closeModal();
      })
      .catch(() => {
        setLoading(false);
        toast('Updating job failed', {
          duration: 2000,
          icon: '❌',
          position: 'top-right',
        });
      });
  };

  return (
    <div className='flex'>
      <form onSubmit={(e) => handleSubmit(submitHandler)(e)}>
        <FieldsetLegend className='flex flex-col space-y-2'>
          <div>
            <Label className='text-md mb-2 text-job-dark' required={true}>
              Job Title
            </Label>
            <Input
              className='w-full placeholder:text-job-placeholder'
              {...register('title')}
              placeholder='ex. UX UI Designer'
            ></Input>
            <ErrorMsg className='my-2' errors={errors} field='title' />
          </div>
          <div>
            <Label className='text-md mb-2 text-job-dark' required={true}>
              Company name
            </Label>
            <Input
              className='w-full placeholder:text-job-placeholder'
              {...register('companyName')}
              placeholder='ex. Google'
            ></Input>
            <ErrorMsg className='my-2' errors={errors} field='companyName' />
          </div>
          <div>
            <Label className='text-md mb-2 text-job-dark' required={true}>
              Industry
            </Label>
            <Input
              className='w-full placeholder:text-job-placeholder'
              {...register('industry')}
              placeholder='ex. Information Technology'
            ></Input>
            <ErrorMsg className='my-2' errors={errors} field='industry' />
          </div>
          <div className='flex space-x-5'>
            <div className='flex-1'>
              <Label className='text-md mb-2 text-job-dark'>Location</Label>
              <Input
                className='w-full placeholder:text-job-placeholder'
                {...register('location')}
                placeholder='ex. Chennai'
              />
            </div>
            <div className='flex-1'>
              <Label className='text-md mb-2 text-job-dark'>Remote type</Label>
              <Input
                className='w-full placeholder:text-job-placeholder'
                {...register('remoteType')}
                placeholder='ex. In-office'
              />
            </div>
          </div>

          <div>
            <Label className='text-md mb-2 text-job-dark'>Experience</Label>
            <div className='flex space-x-5'>
              <div className='flex-1'>
                <Input
                  className='placeholder:text-job-placeholder'
                  {...register('minExperience', {
                    min: 0,
                    valueAsNumber: true,
                  })}
                  placeholder='Minimum'
                  type='number'
                ></Input>
              </div>
              <div className='1 flex'>
                <Input
                  className='w-full placeholder:text-job-placeholder'
                  {...register('maxExperience', {
                    min: 0,
                    valueAsNumber: true,
                  })}
                  placeholder='Maximum'
                  type='number'
                ></Input>
              </div>
            </div>
          </div>

          <div>
            <Label className='text-md mb-2 text-job-dark'>Salary</Label>
            <div className='flex space-x-5'>
              <div className='flex-1'>
                <Input
                  className='w-full placeholder:text-job-placeholder'
                  {...register('minSalary', { min: 0, valueAsNumber: true })}
                  placeholder='Minimum'
                  type='number'
                ></Input>
              </div>
              <div className='flex-1'>
                <Input
                  className='w-full placeholder:text-job-placeholder'
                  {...register('maxSalary', { min: 0, valueAsNumber: true })}
                  placeholder='Maximum'
                  type='number'
                ></Input>
              </div>
            </div>
          </div>

          <div>
            <Label className='text-md mb-2 text-job-dark'>Total employee</Label>
            <Input
              className='w-full placeholder:text-job-placeholder'
              {...register('totalEmployee')}
              placeholder='ex. 100'
            ></Input>
          </div>

          <div>
            <div>
              <Label className='text-md mb-2 text-job-dark'>Apply Type</Label>
            </div>
            <div className='flex space-x-5'>
              <div className='flex items-center justify-center'>
                <Input
                  id={Apply.QuickApply}
                  value={Apply.QuickApply}
                  className='mr-2 h-4 w-4'
                  {...register('apply')}
                  type='radio'
                />
                <Label className='text-md text-job-dark' htmlFor={Apply.QuickApply}>
                  {Apply.QuickApply}
                </Label>
              </div>
              <div className='flex items-center justify-center'>
                <Input
                  id={Apply.ExternalApply}
                  value={Apply.ExternalApply}
                  className='mr-2 h-4 w-4'
                  {...register('apply')}
                  type='radio'
                />
                <Label className='text-md text-job-dark' htmlFor={Apply.ExternalApply}>
                  {Apply.ExternalApply}
                </Label>
              </div>
            </div>
          </div>

          <div className='flex justify-end'>
            <Button className='rounded-md bg-blue-500'>
              {loading ? 'Saving' : 'Save'}
            </Button>
          </div>
        </FieldsetLegend>
      </form>
    </div>
  );
}

interface JobEditContainerProps extends Props {
  isOpen: boolean;
}

export function JobEditContainer(props: JobEditContainerProps) {
  const { isOpen, job, closeModal } = props;
  return (
    <div className='flex'>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as={'div'} open={isOpen} onClose={closeModal}>
          <div className='fixed inset-2 flex items-center justify-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <DialogOverlay className='fixed inset-0' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='h-full w-full max-w-md transform overflow-y-auto rounded border-2 bg-white text-left align-middle shadow-xl transition-all [&::-webkit-scrollbar-button]:block [&::-webkit-scrollbar-button]:h-0 [&::-webkit-scrollbar-button]:bg-white [&::-webkit-scrollbar-thumb]:h-[50px] [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-[#999] [&::-webkit-scrollbar-track-piece]:rounded-none [&::-webkit-scrollbar-track-piece]:rounded-l [&::-webkit-scrollbar-track-piece]:bg-white [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar]:w-1.5'>
                <div className='w-full p-4'>
                  <div className='flex justify-between'>
                    <DialogTitle
                      as={'h3'}
                      className='pb-2 text-left text-lg font-medium leading-6 text-gray-900'
                    >
                      Edit Job
                    </DialogTitle>
                    <XCircleIcon
                      className='h-5 w-5 cursor-pointer text-slate-500 opacity-80'
                      onClick={() => closeModal()}
                    />
                  </div>
                  <DialogDescription as={'div'}>
                    <JobEditForm job={job} closeModal={closeModal} />
                  </DialogDescription>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

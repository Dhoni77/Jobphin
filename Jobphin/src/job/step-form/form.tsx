import { FormEvent, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Input, FieldsetLegend, Label } from '@/ui';
import {
  Apply,
  IJob,
  IJobDetailsEnd,
  IJobDetailsEndSchema,
  IJobDetailsStart,
  IJobDetailsStartSchema,
} from '@/models';
import { createJob } from '@/api';
import { id } from '@/lib';
import { addJob } from '@/state/jobSlice';
import { useAppDispatch } from '@/state/hooks';
import { Button } from '@/ui';
import { ErrorMsg } from '@/ui';

interface Props {
  noOfPages: number;
  closeModal: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

interface IFormProps<T extends FieldValues> {
  submitHandler: SubmitHandler<T>;
  loading?: boolean;
}

export const WithStep = ({
  step,
  current,
  children,
}: {
  step: number;
  current: number;
  children: JSX.Element;
}) => {
  return step === current ? children : null;
};

export function StepForm(props: Props) {
  const dispatch = useAppDispatch();
  const { noOfPages, closeModal, currentPage, setCurrentPage } = props;
  const formData = useRef<IJob | null>({} as IJob);
  const [loading, setLoading] = useState(false);

  const submitHandler = (data: IJob, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.current = { ...formData.current, ...data };
    if (currentPage === 1) {
      setCurrentPage(currentPage + 1);
    } else if (noOfPages === currentPage) {
      setLoading(true);
      createJob({ ...formData.current, id: id() } as IJob)
        .then((createdJob: IJob) => {
          dispatch(addJob({ job: createdJob }));
          setLoading(false);
          formData.current = null;
          closeModal();
        })
        .catch(() => {
          setLoading(false);
          toast('Adding job failed', {
            duration: 2000,
            icon: '❌',
            position: 'top-right',
          });
        });
    }
  };

  const jobDetailsStartProps = {
    submitHandler,
  };

  const jobDetailsEndProps = {
    submitHandler,
    loading,
  };

  return (
    <div>
      <WithStep step={1} current={currentPage}>
        <JobDetailsStart
          {...(jobDetailsStartProps as unknown as IFormProps<IJobDetailsStart>)}
        />
      </WithStep>
      <WithStep step={2} current={currentPage}>
        <JobDetailsEnd
          {...(jobDetailsEndProps as unknown as IFormProps<IJobDetailsEnd>)}
        />
      </WithStep>
    </div>
  );
}

export function JobDetailsStart(props: IFormProps<IJobDetailsStart>) {
  const { submitHandler } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobDetailsStart>({
    resolver: zodResolver(IJobDetailsStartSchema),
  });

  return (
    <div className='flex'>
      <form onSubmit={(e) => handleSubmit(submitHandler)(e)}>
        <FieldsetLegend className='flex flex-col space-y-[24px]'>
          <div>
            <Label
              className='mb-[4px] text-job-dark'
              required={true}
              htmlFor='title'
            >
              Job title
            </Label>
            <Input
              id='title'
              className='w-full placeholder:text-job-placeholder'
              {...register('title')}
              placeholder='ex. UX UI Designer'
            ></Input>
            <ErrorMsg className='my-2' errors={errors} field='title' />
          </div>
          <div>
            <Label
              className='mb-[4px] text-job-dark'
              required={true}
              htmlFor='companyName'
            >
              Company name
            </Label>
            <Input
              id='companyName'
              className='w-full placeholder:text-job-placeholder'
              {...register('companyName')}
              placeholder='ex. Google'
            ></Input>
            <ErrorMsg className='my-2' errors={errors} field='companyName' />
          </div>
          <div>
            <Label
              className='mb-[4px] text-job-dark'
              required={true}
              htmlFor='industry'
            >
              Industry
            </Label>
            <Input
              id='industry'
              className='w-full placeholder:text-job-placeholder'
              {...register('industry')}
              placeholder='ex. Information Technology'
            ></Input>
            <ErrorMsg className='my-2' errors={errors} field='industry' />
          </div>
          <div className='flex space-x-[24px]'>
            <div className='flex-1'>
              <Label className='mb-[4px] text-job-dark' htmlFor='location'>
                Location
              </Label>
              <Input
                id='location'
                className='w-full placeholder:text-job-placeholder'
                {...register('location')}
                placeholder='ex. Chennai'
              />
            </div>
            <div className='flex-1'>
              <Label className='mb-[4px] text-job-dark' htmlFor='remoteType'>
                Remote type
              </Label>
              <Input
                id='remoteType'
                className='w-full placeholder:text-job-placeholder'
                {...register('remoteType')}
                placeholder='ex. In-office'
              />
            </div>
          </div>
          <div className='h-[72px]'></div>
          <div className='flex justify-end'>
            <Button className='rounded-md bg-blue-500' type='submit'>
              Next
            </Button>
          </div>
        </FieldsetLegend>
      </form>
    </div>
  );
}

export function JobDetailsEnd(props: IFormProps<IJobDetailsEnd>) {
  const { submitHandler, loading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobDetailsEnd>({
    resolver: zodResolver(IJobDetailsEndSchema),
  });

  return (
    <div className='flex'>
      <form onSubmit={(e) => handleSubmit(submitHandler)(e)}>
        <FieldsetLegend className='flex flex-col space-y-[24px]'>
          <div>
            <Label className='mb-[4px] text-job-dark' htmlFor='experience'>
              Experience
            </Label>
            <div className='flex space-x-[24px]'>
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
              <div className='flex-1'>
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
            <Label className='mb-[4px] text-job-dark' htmlFor='salary'>
              Salary
            </Label>
            <div className='flex space-x-[24px]'>
              <div className='flex-1'>
                <Input
                  className='w-full placeholder:text-job-placeholder'
                  {...register('minSalary', { valueAsNumber: true })}
                  placeholder='Minimum'
                  type='number'
                ></Input>
              </div>
              <div className='flex-1'>
                <Input
                  className='w-full placeholder:text-job-placeholder'
                  {...register('maxSalary', { valueAsNumber: true })}
                  placeholder='Maximum'
                  type='number'
                ></Input>
              </div>
            </div>
          </div>
          <div>
            <Label className='mb-[4px] text-job-dark' htmlFor='totalEmployee'>
              Total employee
            </Label>
            <Input
              id='totalEmployee'
              className='w-full placeholder:text-job-placeholder'
              {...register('totalEmployee')}
              placeholder='ex. 100'
              type='text'
            ></Input>
          </div>
          <div>
            <div>
              <Label className='mb-[4px] text-job-dark' htmlFor='applyType'>
                Apply Type
              </Label>
            </div>
            <div className='flex space-x-[16px]'>
              <div className='flex items-center justify-center space-x-[4px]'>
                <Input
                  id='quick-apply'
                  value={Apply.QuickApply}
                  className='mr-2 h-4 w-4'
                  {...register('apply')}
                  type='radio'
                />
                <Label className='mb-[4px] text-job-dark' htmlFor='quick-apply'>
                  Quick Apply
                </Label>
              </div>
              <div className='flex items-center space-x-[4px]'>
                <Input
                  id='external-apply'
                  className='mr-2 h-4 w-4'
                  value={Apply.ExternalApply}
                  {...register('apply')}
                  type='radio'
                />
                <Label
                  className='mb-[4px] text-job-dark'
                  htmlFor='external-apply'
                >
                  {Apply.ExternalApply}
                </Label>
              </div>
            </div>
            <ErrorMsg className='my-2' errors={errors} field='apply' />
          </div>
          <div className='h-[72px] w-full'></div>
          <div className='flex justify-end'>
            <Button className='rounded-md bg-blue-500'>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </FieldsetLegend>
      </form>
    </div>
  );
}

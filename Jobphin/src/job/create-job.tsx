import React, { Fragment, useState } from 'react';
import { StepForm } from '@/step-form/form';
import {
  Dialog,
  DialogTitle,
  DialogOverlay,
  DialogDescription,
} from '@/ui/Dialog/Dialog';
import { Transition } from '@headlessui/react';
import { Button } from '@/ui/Button/Button';

export function CreateJobForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const closeModal = () => {
    setIsOpen(false);
    setCurrentPage(1);
  };

  const stepFormProps = {
    noOfPages: 2,
    currentPage,
    closeModal,
    setCurrentPage,
  };

  return (
    <div>
      <div>
        <Button
          type='button'
          className='rounded-sm bg-cyan-400 text-sm opacity-85 font-medium shadow-xl duration-300 hover:bg-opacity-50'
          onClick={() => setIsOpen(true)}
        >
          Create
        </Button>
      </div>
      <div className='flex items-center justify-center'>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as={'div'}
            open={isOpen}
            onClose={closeModal}
            className='h-screen'
          >
            <div className='fixed inset-10 flex h-fit items-center justify-center'>
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
                <div className='inline-block h-full w-full max-w-md transform overflow-hidden rounded border-2 bg-white text-left align-middle shadow-xl transition-all'>
                  <div className='p-[32px]'>
                    <div className='flex justify-between'>
                      <DialogTitle
                        as={'h3'}
                        className='pb-[24px] text-lg font-medium leading-6 text-job-dark'
                      >
                        Create a Job
                      </DialogTitle>
                      <span className='text-job-dark'>{`Step ${currentPage}`}</span>
                    </div>
                    <DialogDescription as={'div'}>
                      <StepForm {...stepFormProps} />
                    </DialogDescription>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

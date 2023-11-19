import { CreateJobForm } from './create-job';
import { DisplayJobs } from './job-list';

export function LandingPage() {
  return (
    <div>
      <nav className='flex items-center bg-cyan-500 p-2'>
        <div className='block w-full flex-grow lg:flex lg:w-auto lg:items-center'>
          <div>
            <CreateJobForm />
          </div>
        </div>
      </nav>
      <DisplayJobs />
    </div>
  );
}

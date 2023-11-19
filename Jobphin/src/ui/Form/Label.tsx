import classNames from '@/lib/classNames';
import { FieldErrors, FieldValues } from 'react-hook-form';

type LabelProps = JSX.IntrinsicElements['label'] & { required?: boolean };

export function Label(props: LabelProps) {
  const { className, required, ...restProps } = props;
  return (
    <label
      className={classNames('block text-sm font-medium', className)}
      {...restProps}
    >
      {props.children}
      {required && <span className='text-red-500'>*</span>}
    </label>
  );
}

export function ErrorMsg<T extends FieldValues>(props: {
  field: string;
  errors: FieldErrors<T>;
  className?: string;
}) {
  const { className, field, errors } = props;
  const errorMessage = errors[field]?.message;

  return errorMessage ? (
    <p className={classNames('text-sm text-job-error', className)}>
      {errorMessage as string}
    </p>
  ) : null;
}

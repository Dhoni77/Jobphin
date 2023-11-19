import { ReactNode, forwardRef } from 'react';
import classNames from '@/lib/classNames';
import { Label } from './Label';

type InputProps = Omit<JSX.IntrinsicElements['input'], 'name'> & {
  name: string;
};
type InputFieldProps = {
  label?: ReactNode;
} & React.ComponentProps<typeof Input> & {
    labelProps?: React.ComponentProps<typeof Label>;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return (
      <input
        {...props}
        ref={ref}
        className={classNames(
          'block rounded-sm border px-3 py-2 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm',
          props.className,
        )}
      />
    );
  },
);

export const EmailInput = forwardRef<HTMLInputElement, InputFieldProps>(
  function EmailInput(props, ref) {
    return (
      <Input
        ref={ref}
        type='email'
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect='off'
        inputMode='email'
        {...props}
      />
    );
  },
);

export function FieldsetLegend(props: JSX.IntrinsicElements['legend']) {
  return (
    <legend
      {...props}
      className={classNames('text-sm font-medium', props.className)}
    >
      {props.children}
    </legend>
  );
}

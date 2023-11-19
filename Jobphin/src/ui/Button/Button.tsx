import { classNames } from '@/lib';
import { forwardRef } from 'react';

export type ButtonProps = JSX.IntrinsicElements['button'];

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props: ButtonProps, forwardedRef) {
    const { children, className, ...rest } = props;
    return (
      <button
        className={classNames(
          'rounded px-3 py-2 text-white md:rounded-md',
          className,
        )}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

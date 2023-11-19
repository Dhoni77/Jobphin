import { Dialog as HeadlessDialog } from '@headlessui/react';
import { ElementType, ReactNode, forwardRef } from 'react';
import classNames from '@/lib/classNames';

export interface IDialogProps {
  className?: string;
  children?: ReactNode;
  as?: ElementType;
}

export interface IDialogFunctionProps extends IDialogProps {
  onClose: () => void;
  open: boolean;
}

export const Dialog = forwardRef<HTMLDivElement, IDialogFunctionProps>(
  function Dialog(props, ref) {
    const { open, onClose, children } = props;

    return (
      <HeadlessDialog ref={ref} open={open} onClose={onClose}>
        <HeadlessDialog.Panel>{children}</HeadlessDialog.Panel>
      </HeadlessDialog>
    );
  },
);

export function DialogTitle(props: IDialogProps) {
  const { as, className, children } = props;
  return (
    <HeadlessDialog.Title className={classNames(className)} as={as}>
      {children}
    </HeadlessDialog.Title>
  );
}

export function DialogDescription(props: IDialogProps) {
  const { as, className, children } = props;
  return (
    <HeadlessDialog.Description className={classNames(className)} as={as}>
      {children}
    </HeadlessDialog.Description>
  );
}

export const DialogOverlay = forwardRef<HTMLDivElement, IDialogProps>(
  function DialogOverlay(props, ref) {
    const { as, className, children } = props;
    return (
      <HeadlessDialog.Overlay
        ref={ref}
        className={classNames(className)}
        as={as}
      >
        {children}
      </HeadlessDialog.Overlay>
    );
  },
);

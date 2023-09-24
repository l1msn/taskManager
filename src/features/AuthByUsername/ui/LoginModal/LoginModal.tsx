import React, { JSX, Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import LoginFormLazy from '../LoginForm/LoginForm.lazy';
import Loader from '@/shared/ui/Loader';

interface ILoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<ILoginModalProps> = ({
    className,
    isOpen,
    onClose,
}: ILoginModalProps): JSX.Element => {
    const content = (
        <Suspense fallback={<Loader />}>
            <LoginFormLazy onSuccess={onClose} />
        </Suspense>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} lazy>
            {content}
        </Modal>
    );
};

export default LoginModal;

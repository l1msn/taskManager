import React, { JSX, useEffect, useState } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import AppRouter from '@/app/providers/Router';
import Navbar from '@/widgets/Navbar';
import { VStack } from '@/shared/ui/Stack';
import Preloader from '@/widgets/Preloader';
import useAppDispatch from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {initAuthData, UserSelectors} from "@/entities/User";

interface IAppProps {
    className?: string;
}

const App: React.FC<IAppProps> = ({ className }: IAppProps): JSX.Element => {
    const [loading, setIsLoading] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    const init = useSelector(UserSelectors.getUserInit);

    useEffect(() => {
        if (!init) {
            dispatch(initAuthData());
        }
    }, [dispatch, init]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

    }, [loading]);

    if (loading) {
        return (
            <div className={classNames('app', {}, [className])}>
                <div className="preloader">
                    <Preloader loading={loading} />
                </div>
            </div>
        );
    }

    return (
        <div className={classNames('app', {}, [className])}>
                <div className="content-page">
                    <VStack max align={'center'}>
                        <Navbar />
                        {init && <AppRouter />}
                    </VStack>
                </div>
        </div>
    );
};

export default App;

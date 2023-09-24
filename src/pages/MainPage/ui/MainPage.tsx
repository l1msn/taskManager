import React, {JSX, useCallback, useState} from 'react';
import Page from '@/widgets/Page';
import VoxelDog from "@/features/3DModel";
import {HStack, VStack} from "@/shared/ui/Stack";
import cls from './MainPage.module.scss'
import TypeAnimationText from "@/shared/ui/AnimationText";
import {Card} from "@/shared/ui/Card";
import {LoginModal} from "@/features/AuthByUsername";
import Button from "@/shared/ui/Button";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {userActions, UserSelectors} from "@/entities/User";
import useAppDispatch from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import Loader from "@/shared/ui/Loader";

const MainPage: React.FC = (): JSX.Element => {
    const {t} = useTranslation('main');

    const dispatch = useAppDispatch();

    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

    const userAuthData = useSelector(UserSelectors.getUserAuthData);

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prevState) => !prevState);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <Page data-testid={'MainPage'}>
            <VStack max className={cls.model} justify={'center'} align={'center'}>
                <Card className={cls.greeting} padding={'16'} max>
                <TypeAnimationText
                    speed={30}
                    style={{
                        fontSize: '27px',
                    }}
                    text={{
                        ru: [userAuthData ? `Привествую ${userAuthData.username}` : `Привествую`],
                        en: [userAuthData ? `Greetings ${userAuthData.username}` : `Greetings`],
                    }}
                />
                </Card>
                <VoxelDog/>
                <HStack gap={'32'}>
                    {userAuthData ? (
                        <>
                            <Button
                                variant={'accept'}
                                className={cls.logout}
                                onClick={onLogout}
                                size={'l'}
                            >
                                {t('Logout')}
                            </Button>
                            <Button
                                variant={'accept'}
                                className={cls.tasksBtn}
                                size={'l'}
                            >
                                {t('Go to tasks')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant={'accept'}
                                className={cls.login}
                                onClick={onToggleModal}
                                size={'l'}
                            >
                                {t('Enter')}
                            </Button>
                            {isAuthModal && (
                                <LoginModal
                                    isOpen={isAuthModal}
                                    onClose={onToggleModal}
                                ></LoginModal>
                            )}
                        </>
                    )}

                </HStack>
            </VStack>
        </Page>
    );
};

export default MainPage;

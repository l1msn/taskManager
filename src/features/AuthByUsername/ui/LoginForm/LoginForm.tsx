import React, { JSX, memo, useCallback } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import loginByUsername from '../../services/loginByUsername/loginByUsername';
import LoginSelectors from '../../model/selectors/LoginSelectors';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import useAppDispatch from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import useCallbackButton from '@/shared/lib/hooks/useCallbackButton/useCallbackButton';
import { Text } from '@/shared/ui/Text';
import Button from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useUpdate } from '@/shared/lib/render/forceUpdate/forceUpdate';
import Loader from "@/shared/ui/Loader";

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

interface ILoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = memo(
    ({ className, onSuccess }: ILoginFormProps): JSX.Element => {
        const { t } = useTranslation('auth');
        const dispatch = useAppDispatch();

        const username = useSelector(LoginSelectors.getLoginUsername);
        const password = useSelector(LoginSelectors.getLoginPassword);
        const isLoading = useSelector(LoginSelectors.getLoginIsLoading);
        const error = useSelector(LoginSelectors.getLoginError);

        const forceUpdate = useUpdate();

        const onChangeUsername = useCallback(
            (value: string) => {
                dispatch(loginActions.setUsername(value));
            },
            [dispatch],
        );

        const onChangePassword = useCallback(
            (value: string) => {
                dispatch(loginActions.setPassword(value));
            },
            [dispatch],
        );

        const onLoginClick = useCallback(async () => {
            const result = await dispatch(
                loginByUsername({ username: username, password: password }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
                forceUpdate();
            }
        }, [dispatch, username, password, onSuccess, forceUpdate]);

        const onLoginClickWithEnterConfirm = useCallbackButton(
            onLoginClick,
            'Enter',
        );

        return (
            <DynamicModuleLoader removeAfterAmount reducers={initialReducers}>
                <div
                    className={classNames(cls.LoginFormRedesigned, {}, [className])}
                >
                    <Text title={t('Auth')} />
                    {error && (
                        <Text
                            text={t('Invalid username or password')}
                            variant={'error'}
                        />
                    )}
                    <Input
                        onChange={onChangeUsername}
                        value={username}
                        autofocus
                        placeholder={t('Username - Write: "Alex"')}
                        type="text"
                        className={cls.input}
                    />
                    <Input
                        type="password"
                        onChange={onChangePassword}
                        value={password}
                        placeholder={t('Password - Write: "password"')}
                        className={cls.input}
                    />
                    <Button
                        disabled={isLoading}
                        onKeyDown={(keyboardEvent) => onLoginClickWithEnterConfirm}
                        onClick={onLoginClick}
                        variant={'outline'}
                        className={cls.loginBtn}
                        type={'submit'}
                    >
                        {t('Login')}
                    </Button>
                </div>
            </DynamicModuleLoader>
        );
    },
);

export default LoginForm;

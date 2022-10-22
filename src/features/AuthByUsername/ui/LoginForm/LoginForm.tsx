import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import React, { useState } from 'react';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}
export const LoginForm = (props: LoginFormProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onChangeLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    };

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                // onChange={}
                autofocus
                type="text"
                className={classNames(cls.input)}
                placeholder={t('Введите логин')}
            />
            <Input
                // onChange={}
                type="text"
                className={classNames(cls.input)}
                placeholder={t('Введите пароль')}
            />
            <Button
                type="button"
                theme={ThemeButton.PRIMARY}
                className={classNames(cls.loginButton)}
            >
                {t('Войти')}
            </Button>
        </div>
    );
};

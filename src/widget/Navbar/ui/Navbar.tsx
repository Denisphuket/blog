import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widget/ThemeSwitcher';
import { SidebarSwitcher } from 'widget/SidebarSwitcher';
import { LanguageSwitcher } from 'widget/LanguageSwitcher';
import { Modal } from 'shared/ui/Modal/Modal';
import React, { useCallback, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}
export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation('navbar');

    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

    const toggleAuthModal = useCallback(() => {
        setIsAuthModal(!isAuthModal);
    }, [isAuthModal]);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.dFlex}>
                <SidebarSwitcher />
            </div>
            <div className={cls.dFlex}>
                <ThemeSwitcher />
                <LanguageSwitcher />
                <Button
                    className={classNames(cls.loginButton)}
                    theme={ThemeButton.CLEAR_INVERTED}
                    onClick={toggleAuthModal}
                >
                    {t('Войти')}
                </Button>
                <Modal isOpen={isAuthModal} onClose={toggleAuthModal}>
                    {t('Войти')}
                </Modal>
            </div>

        </div>
    );
};

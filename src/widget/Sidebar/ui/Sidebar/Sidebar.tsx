import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useSidebar } from 'app/providers/SidebarProvider';
import { useTranslation } from 'react-i18next';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}
export const Sidebar = ({ className }: SidebarProps) => {
    const { t } = useTranslation();
    const { sidebar } = useSidebar();

    return (
        <div className={classNames(cls.Sidebar, {}, [className, cls[sidebar]])}>

            <div className={cls.menu}>
                <div>{t('Меню')}</div>
                <div>
                    <AppLink
                        theme={AppLinkTheme.SECONDARY}
                        to="/"
                        className={cls.mainLink}
                    >
                        {t('Главная')}
                    </AppLink>
                </div>
                <div>
                    <AppLink
                        theme={AppLinkTheme.SECONDARY}
                        to="/about"
                    >
                        {t('О сайте')}
                    </AppLink>
                </div>
            </div>

        </div>
    );
};

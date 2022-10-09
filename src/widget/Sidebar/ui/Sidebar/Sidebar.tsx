import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useSidebar } from 'app/providers/SidebarProvider';
import { useTranslation } from 'react-i18next';
import HomeIcon from 'shared/assets/icon/menuIcon/home.svg';
import PageIcon from 'shared/assets/icon/menuIcon/page.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const { t } = useTranslation();
    const { sidebar } = useSidebar();

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, {}, [className, cls[sidebar]])}
        >

            <div className={cls.menu}>
                <div>{t('Меню')}</div>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to="/"
                    className={cls.item}
                >
                    <HomeIcon className={cls.icon} />
                    <span
                        className={cls.link}
                    >
                        {t('Главная')}
                    </span>
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to="/about"
                    className={cls.item}
                >
                    <PageIcon className={cls.icon} />
                    <span
                        className={cls.link}
                    >
                        {t('О сайте')}
                    </span>

                </AppLink>
            </div>

        </div>
    );
};

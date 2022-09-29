import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widget/ThemeSwitcher';
import { SidebarSwitcher } from 'widget/SidebarSwitcher';
import { LanguageSwitcher } from 'widget/LanguageSwitcher';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}
export const Navbar = ({ className }: NavbarProps) => (
    <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={cls.dFlex}>
            <SidebarSwitcher />
        </div>
        <div className={cls.dFlex}>
            <ThemeSwitcher />
            <LanguageSwitcher />
        </div>

    </div>
);

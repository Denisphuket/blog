import { classNames } from 'shared/lib/classNames/classNames';
import MenuIcon from 'shared/assets/icon/menu-icon.svg';
import { Button } from 'shared/ui/Button/Button';
import { useSidebar } from 'app/providers/SidebarProvider';
import cls from './SidebarSwitcher.module.scss';

interface SidebarSwitcherProps {
    className?: string;
}
export const SidebarSwitcher = ({ className }:SidebarSwitcherProps) => {
    const { sidebar, toggleSidebar } = useSidebar();

    return (
        <Button
            data-testid="sidebar-toggle"
            onClick={toggleSidebar}
            className={classNames(cls.SidebarSwitcher, {}, [className, cls[sidebar]])}
        >
            <MenuIcon className={cls.icon} />
        </Button>
    );
};

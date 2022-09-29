import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import DarkIcon from 'shared/assets/icon/dark-icon.svg';
import LightIcon from 'shared/assets/icon/light-icon.svg';
import { Button } from 'shared/ui/Button/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}
export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.LIGHT
                ? <DarkIcon stroke="#e0ebff" className={cls.icon} />
                : <LightIcon className={cls.icon} />}
        </Button>
    );
};

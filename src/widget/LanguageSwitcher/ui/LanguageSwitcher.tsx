import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import RuIcon from 'shared/assets/icon/ru.svg';
import EnIcon from 'shared/assets/icon/en.svg';
import { useTranslation } from 'react-i18next';
import cls from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
    className?: string;
}
export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
    const { i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            onClick={toggle}
            className={classNames(cls.LanguageSwitcher, {}, [className])}
        >
            {
                i18n.language === 'ru'
                    ? <EnIcon className={cls.icon} />
                    : <RuIcon className={cls.icon} />
            }
        </Button>
    );
};

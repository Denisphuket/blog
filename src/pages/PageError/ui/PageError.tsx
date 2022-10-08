import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}
export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reload = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <div
                className={classNames(cls.text, {}, [className])}
            >
                {t('Произошла ошибка')}
            </div>

            <Button
                theme={ThemeButton.PRIMARY}
                type="button"
                onClick={reload}
                className={classNames(cls.button, {}, [className])}
            >
                {t('Перезагрузить страницу')}
            </Button>

        </div>
    );
};

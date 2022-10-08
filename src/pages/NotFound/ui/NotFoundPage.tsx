import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';

interface notFoundPageProps {
    className?: string;
}
export const NotFoundPage = ({ className }: notFoundPageProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.notFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </div>
    );
};

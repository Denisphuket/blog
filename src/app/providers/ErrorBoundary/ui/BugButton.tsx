import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { useEffect, useState } from 'react';

export const BugButton = () => {
    const { t } = useTranslation();

    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    const toggle = () => setError(true);
    return (
        <Button
            type="button"
            onClick={toggle}
        >
            {t('BugButton')}
        </Button>
    );
};

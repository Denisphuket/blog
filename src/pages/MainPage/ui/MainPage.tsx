import React from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';
import { Counter } from 'entities/Counter';

function MainPage() {
    const { t } = useTranslation('MainPage');

    return (
        <div>
            <BugButton />
            {t('Главная')}
            <Counter />
        </div>
    );
}

export default MainPage;

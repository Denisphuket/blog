import { useTranslation } from 'react-i18next';

function AboutPage() {
    const { t } = useTranslation('aboutPage');

    return (
        <div>
            {t('О сайте')}
        </div>
    );
}

export default AboutPage;

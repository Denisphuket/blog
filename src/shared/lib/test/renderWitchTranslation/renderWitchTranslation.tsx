import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import testConfig from '../../../config/i18n/testConfig';

export function renderWitchTranslation(component: ReactNode) {
    return render(
        <I18nextProvider i18n={testConfig}>
            {component}
        </I18nextProvider>,
    );
}

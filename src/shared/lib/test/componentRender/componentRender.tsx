import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import testConfig from '../../../config/i18n/testConfig';

interface ComponentRenderOptions{
	rout?: string;
}
export function ComponentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
    const {
        rout = '/',
    } = options;
    return render(
        <MemoryRouter initialEntries={[rout]}>
            <I18nextProvider i18n={testConfig}>
                {component}
            </I18nextProvider>
        </MemoryRouter>,
    );
}

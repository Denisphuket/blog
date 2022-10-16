import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import testConfig from '../../../config/i18n/testConfig';

interface ComponentRenderOptions{
	rout?: string;
    initialState?: DeepPartial<StateSchema>;
}
export function ComponentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
    const {
        rout = '/',
        initialState,
    } = options;
    return render(
        <StoreProvider initialState={initialState}>
            <MemoryRouter initialEntries={[rout]}>
                <I18nextProvider i18n={testConfig}>
                    {component}
                </I18nextProvider>
            </MemoryRouter>
        </StoreProvider>,
    );
}

import { fireEvent, screen } from '@testing-library/react';
import {
    renderWitchTranslation,
} from 'shared/lib/test/renderWitchTranslation/renderWitchTranslation';
import { BrowserRouter } from 'react-router-dom';
import { SidebarSwitcher } from 'widget/SidebarSwitcher';
import { SidebarProvider } from 'app/providers/SidebarProvider';
import { Sidebar } from './Sidebar';

describe('Sidebar.test', () => {
    test('get sidebar', () => {
        renderWitchTranslation(
            <BrowserRouter>
                <Sidebar />
            </BrowserRouter>,
        );
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('sidebar toggle', () => {
        renderWitchTranslation(
            <BrowserRouter>
                <SidebarProvider>
                    <SidebarSwitcher />
                    <Sidebar />
                </SidebarProvider>
            </BrowserRouter>,
        );
        expect(screen.getByTestId('sidebar-toggle')).toBeInTheDocument();
        const toggleButton = screen.getByTestId('sidebar-toggle');
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('sidebar')).toHaveClass('minimal');
    });
});

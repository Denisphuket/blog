import { fireEvent, screen } from '@testing-library/react';
import { SidebarSwitcher } from 'widget/SidebarSwitcher';
import { SidebarProvider } from 'app/providers/SidebarProvider';
import { ComponentRender } from 'shared/lib/test/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar.test', () => {
    test('get sidebar', () => {
        ComponentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('sidebar toggle', () => {
        ComponentRender(
            <SidebarProvider>
                <SidebarSwitcher />
                <Sidebar />
            </SidebarProvider>,
        );
        expect(screen.getByTestId('sidebar-toggle')).toBeInTheDocument();
        const toggleButton = screen.getByTestId('sidebar-toggle');
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('sidebar')).toHaveClass('minimal');
    });
});

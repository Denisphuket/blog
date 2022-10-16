import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { SidebarProvider } from 'app/providers/SidebarProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import App from './app/App';
import 'app/styles/index.scss';
import './shared/config/i18n/i18n';
import { StoreProvider } from './app/providers/StoreProvider';

render(
    <StoreProvider>
        <BrowserRouter>
            <ErrorBoundary>
                <ThemeProvider>
                    <SidebarProvider>
                        <App />
                    </SidebarProvider>
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StoreProvider>,
    document.getElementById('root'),
);

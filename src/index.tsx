import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { SidebarProvider } from 'app/providers/SidebarProvider';
import App from './app/App';
import './shared/config/i18n/i18n';

render(
    <BrowserRouter>
        <ThemeProvider>
            <SidebarProvider>
                <App />
            </SidebarProvider>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);

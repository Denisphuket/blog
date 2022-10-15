import React, { Suspense, useState } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widget/Navbar';
import { Sidebar } from 'widget/Sidebar';
import { useSidebar } from 'app/providers/SidebarProvider';

function App() {
    const { theme } = useTheme();
    const { sidebar } = useSidebar();

    return (
        <div className={classNames('app', {}, [theme, sidebar])}>
            <Suspense fallback="">
                <Navbar />

                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;

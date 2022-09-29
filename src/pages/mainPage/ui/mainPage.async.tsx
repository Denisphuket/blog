import { lazy } from 'react';

// export const MainPageAsync = lazy(() => import('./mainPage'));
export const MainPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./mainPage')), 1500);
}));

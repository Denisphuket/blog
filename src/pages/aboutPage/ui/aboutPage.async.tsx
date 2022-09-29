import { lazy } from 'react';

// export const AboutPageAsync = lazy(() => import('./aboutPage'));
export const AboutPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./aboutPage')), 1500);
}));

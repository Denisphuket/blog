import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFound';
import { PaymentPage } from 'pages/PaymentPage';
import { PaymentAuthorise } from 'pages/PaymentAuthorise';
import { PageCheckPayment } from 'pages/PageChekPayment';

export enum AppRoutes {
    MAIN = 'main',
    PAYMENT_PAGE = 'payment_page',
    PAYMENT_AUTHORISE = 'payment_authorise',
    CHECK_PAYMENT = 'check_payment',
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CHECK_PAYMENT]: '/check_payment/',
    [AppRoutes.PAYMENT_PAGE]: '/payment_page/:id',
    [AppRoutes.PAYMENT_AUTHORISE]: 'authorise/:id',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.PAYMENT_PAGE]: {
        path: RoutePath.payment_page,
        element: <PaymentPage />,
    },
    [AppRoutes.PAYMENT_AUTHORISE]: {
        path: RoutePath.payment_authorise,
        element: <PaymentAuthorise />,
    },
    [AppRoutes.CHECK_PAYMENT]: {
        path: RoutePath.check_payment,
        element: <PageCheckPayment />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};

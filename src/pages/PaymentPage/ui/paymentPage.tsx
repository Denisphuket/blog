import React, { memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { CardWidget } from 'widget/CardWidget';
import { useSelector } from 'react-redux';
import {
    getError,
    getIsLoading,
    getOrderDetailByNumberState,
    getOrderReducer,
    orderDetailByNumber,
} from 'features/GetOrderDetailByNumber';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from 'shared/ui/Loader/Loader';
import { useLocation } from 'react-router-dom';
import { cardReducer } from 'entities/Card';
import { sendCardToServerReducer } from 'features/sendCardToServer';
import cls from './paymentPage.module.scss';

const initialReducers: ReducerList = {
    order: getOrderReducer,
    card: cardReducer,
    paymentGateway: sendCardToServerReducer,
};

interface paymentPageProps {
    className?: string;
}
export const paymentPage = memo((props: paymentPageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [isError, setIsError] = useState('');

    const orderDetail = useSelector(getOrderDetailByNumberState);
    const isLoading = useSelector(getIsLoading);
    const error = useSelector(getError);

    const location = useLocation();

    useEffect(() => {
        setIsError(error);
    }, [error]);

    useEffect(() => {
        dispatch(orderDetailByNumber({
            uuid: location.pathname.replace('/payment_page/', ''),
        }));
    }, [dispatch, location.pathname]);

    if (isLoading) {
        return (
            <div className={classNames(cls.paymentPage, {}, [className])}>
                <Loader />
            </div>
        );
    }

    return (
        <DynamicModuleLoader
            removeAfterUnmount={false}
            reducers={initialReducers}
        >
            <div className={classNames(cls.paymentPage, {}, [className])}>
                {!isError.length
                    ? !orderDetail.items?.length && (
                        <div
                            className={classNames(cls.pageLoader)}
                        >
                            <Loader />
                        </div>

                    )

                    : (
                        <div
                            className={classNames(cls.pageLoader)}
                        >
                            {t('Заказ на оплату не найден')}
                        </div>
                    )}

                {
                    orderDetail.items?.length && (
                        <div className={classNames(cls.paymentPage, {}, [className])}>
                            <CardWidget orderDetail={orderDetail} />
                        </div>
                    )
                }
            </div>
        </DynamicModuleLoader>

    );
});
export default paymentPage;

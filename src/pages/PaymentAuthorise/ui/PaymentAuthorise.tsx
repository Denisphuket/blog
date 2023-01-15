import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    getError, getIsLoading, GetPaymentLink, sendCardToServerReducer,
} from 'features/sendCardToServer';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Loader } from 'shared/ui/Loader/Loader';
import FailIcon from 'shared/assets/icon/paymentIcon/fail.svg';
import cls from './PaymentAuthorise.module.scss';

const initialReducers: ReducerList = {
    paymentGateway: sendCardToServerReducer,
};

interface PaymentAuthoriseProps {
    className?: string;
}
export const PaymentAuthorise = memo((props: PaymentAuthoriseProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();
    const paymentUrl = useSelector(GetPaymentLink);
    const isError = useSelector(getError);
    const isLoading = useSelector(getIsLoading);

    if (isLoading) {
        return (
            <DynamicModuleLoader
                removeAfterUnmount
                reducers={initialReducers}
            >
                <div className={classNames(cls.PaymentAuthorise, {}, [className])}>
                    <div className={classNames(cls.loader)}>
                        <Loader />
                    </div>
                </div>
            </DynamicModuleLoader>
        );
    }

    if (!isLoading && paymentUrl) {
        window.location.href = paymentUrl;
        return (
            <div className={classNames(cls.PaymentAuthorise, {}, [className])}>
                <div className={classNames(cls.loader)}>
                    <Loader />
                </div>
            </div>
        );
    } if (isLoading && !paymentUrl) {
        return (
            <DynamicModuleLoader
                removeAfterUnmount
                reducers={initialReducers}
            >
                <div className={classNames(cls.PaymentAuthorise, {}, [className])}>
                    <div>{t('ОШИБКА НАЧНИТЕ С НАЧАЛА')}</div>
                </div>
            </DynamicModuleLoader>
        );
    }

    if (isError) {
        return (
            <DynamicModuleLoader
                removeAfterUnmount
                reducers={initialReducers}
            >
                <div className={classNames(cls.PaymentAuthorise, {}, [className])}>
                    <div
                        className={classNames(cls.card)}
                    >
                        <div
                            className={classNames(cls.statusCard)}
                        >
                            <FailIcon
                                className={classNames(cls.iconStatus)}
                            />
                            <div>{t('Произошла Ошибка')}</div>
                            <div>{isError}</div>
                        </div>
                    </div>
                </div>
            </DynamicModuleLoader>
        );
    }

    return (
        <div className={classNames(cls.PaymentAuthorise, {}, [className])}>
            <Loader />
        </div>
    );
});
export default PaymentAuthorise;

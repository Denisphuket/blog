import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    checkPaymentByNumber,
    checkPaymentByNumberState,
    checkPaymentReducer,
    getIsLoading,
    getError,
} from 'features/CheckPayment';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from 'shared/ui/Loader/Loader';
import SuccessIcon from 'shared/assets/icon/paymentIcon/success.svg';
import FailIcon from 'shared/assets/icon/paymentIcon/fail.svg';
import WaitingIcon from 'shared/assets/icon/paymentIcon/waiting.svg';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { Button } from 'reactstrap';
import cls from './PageCheckPayment.module.scss';

const initialReducers: ReducerList = {
    checkPayment: checkPaymentReducer,
};
interface PageCheckPaymentProps {
    className?: string;
}
export const PageCheckPayment = memo((props: PageCheckPaymentProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const searchParam = window.location.search;
    const params = new URLSearchParams(searchParam);
    const paymentNumber = params.get('number');

    const payment = useSelector(checkPaymentByNumberState);
    const isLoading = useSelector(getIsLoading);
    const isError = useSelector(getError);

    useEffect(() => {
        dispatch(checkPaymentByNumber({ number: paymentNumber }));
    }, [dispatch, paymentNumber]);

    const submit = useCallback(() => {
        if (payment.paymentStatus !== 'REJECTED') {
            window.location.href = payment.successUrl;
        } else {
            window.location.href = payment.failUrl;
        }
    }, [payment]);

    if (isError) {
        return (
            <DynamicModuleLoader
                removeAfterUnmount
                reducers={initialReducers}
            >
                <div className={classNames(cls.PageCheckPayment, {}, [className])}>
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
                        <div
                            className={classNames(cls.line)}
                        />

                        <div
                            className={classNames(cls.paymentDetail)}
                        >
                            <div>
                                {t('Код платежа')}
                            </div>
                            <div
                                className={classNames(cls.paymentDetailRight)}
                            >
                                <div
                                    className={classNames(cls.paymentDetailRightPadding)}
                                >
                                    {paymentNumber}
                                </div>
                                <div
                                    onClick={() => {
                                        navigator.clipboard.writeText(paymentNumber);
                                    }}
                                    className={classNames(cls.paymentDetailRightPadding)}
                                >
                                    <ContentCopyRoundedIcon />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader
            removeAfterUnmount={false}
            reducers={initialReducers}
        >
            <div className={classNames(cls.PageCheckPayment, {}, [className])}>
                {
                    isLoading || !payment.paymentStatus
                        ? (
                            <div className={classNames(cls.loader)}>
                                <Loader />
                            </div>
                        )
                        : (
                            <div
                                className={classNames(cls.card)}
                            >
                                <div>
                                    {
                                        payment.paymentStatus === 'REJECTED' && (
                                            <div
                                                className={classNames(cls.statusCard)}
                                            >
                                                <FailIcon
                                                    className={classNames(cls.iconStatus)}
                                                />
                                                <div
                                                    className={classNames(cls.textStatus)}
                                                >
                                                    {t('Ошибка! Платеж не прошел')}
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        payment.paymentStatus === 'FINISHED' && (
                                            <div
                                                className={classNames(cls.statusCard)}
                                            >
                                                <SuccessIcon
                                                    className={classNames(cls.iconStatus)}
                                                />
                                                <div
                                                    className={classNames(cls.textStatus)}
                                                >
                                                    {t('Готово! Вы заплатили')}
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        payment.paymentStatus === 'CHECKING3DS' && (
                                            <div
                                                className={classNames(cls.statusCard)}
                                            >
                                                <WaitingIcon
                                                    className={classNames(cls.iconStatus)}
                                                />
                                                <div
                                                    className={classNames(cls.textStatus)}
                                                >
                                                    {t('Ждем! Подтвердите платеж')}
                                                </div>
                                            </div>

                                        )
                                    }

                                </div>
                                <div
                                    className={classNames(cls.paymentDetail)}
                                >
                                    <div>
                                        {t('Сумма')}
                                    </div>
                                    <div
                                        className={classNames(cls.paymentDetailRight)}
                                    >
                                        {
                                            payment.amount.toString().slice(0, -2)
                                        }
                                        <div
                                            className={classNames(cls.paymentDetailRightPadding)}
                                        >
                                            {t('руб.')}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={classNames(cls.line)}
                                />

                                <div
                                    className={classNames(cls.paymentDetail)}
                                >
                                    <div>
                                        {t('Способ оплаты')}
                                    </div>
                                    <div
                                        className={classNames(cls.paymentDetailRight)}
                                    >
                                        <div
                                            className={classNames(cls.paymentDetailRightPadding)}
                                        >
                                            {t('Банковская карта')}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={classNames(cls.line)}
                                />

                                <div
                                    className={classNames(cls.paymentDetail)}
                                >
                                    <div>
                                        {t('Код платежа')}
                                    </div>
                                    <div
                                        className={classNames(cls.paymentDetailRight)}
                                    >
                                        <div
                                            className={classNames(cls.paymentDetailRightPadding)}
                                        >
                                            {paymentNumber}
                                        </div>
                                        <div
                                            onClick={() => {
                                                navigator.clipboard.writeText(paymentNumber);
                                            }}
                                            className={classNames(cls.paymentDetailRightPadding)}
                                        >
                                            <ContentCopyRoundedIcon />
                                        </div>

                                    </div>
                                </div>

                                <Button
                                    color="primary"
                                    className={classNames(cls.buttonBackToSite)}
                                    onClick={submit}
                                >
                                    {t('Вернуться на сайт')}
                                </Button>

                            </div>
                        )

                }
            </div>
        </DynamicModuleLoader>
    );
});
export default PageCheckPayment;
